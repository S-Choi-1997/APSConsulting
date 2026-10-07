const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { buildPayload, send, bind, getToken } = require('../contact-form.js');

const valid = {
    name: '테스트', phone: '010-1234-5678', email: 'test@example.com',
    category: '기업인증', nationality: 'KOR', message: '회귀 테스트용 상담 내용입니다.',
    consentPrivacy: true
};

function fixture() {
    const fields = Object.fromEntries(Object.entries(valid).map(([key, value]) =>
        [key, { value, checked: value === true }]));
    const button = { disabled: true };
    const status = { textContent: '' };
    const attributes = {};
    let handler;
    let resets = 0;
    const form = {
        elements: { namedItem: key => fields[key] },
        reportValidity: () => true,
        querySelector: selector => selector === '[type="submit"]' ? button : status,
        setAttribute: (key, value) => { attributes[key] = value; },
        addEventListener: (type, callback) => { assert.equal(type, 'submit'); handler = callback; },
        reset: () => { resets++; for (const field of Object.values(fields)) { field.value = ''; field.checked = false; } }
    };
    return { form, fields, button, status, attributes, resets: () => resets,
        submit: () => handler({ preventDefault() {} }) };
}

test('all visible categories map to accepted codes without losing the service label', () => {
    const html = fs.readFileSync(path.join(__dirname, '../contact.html'), 'utf8');
    const select = html.match(/<select id="category"[\s\S]*?<\/select>/)[0];
    const options = [...select.matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)];
    assert.equal(options.length, 5);
    const expected = { '인허가': 'corporate', '기업인증': 'corporate', '부동산': 'etc', '민원': 'civil', '기타': 'etc' };
    for (const [, value, label] of options) {
        const payload = buildPayload({ ...valid, category: value, message: '가'.repeat(1950) });
        assert.equal(payload.category, expected[value]);
        assert.ok(payload.message.startsWith('[상담 분야: ' + label + ']\n'));
        assert.ok(payload.message.length <= 2000);
    }
    for (const category of ['', 'invalid', '__proto__', 'constructor']) {
        assert.throws(() => buildPayload({ ...valid, category }), /상담 분야/);
    }
});

test('server validation boundaries, optional email, nationality and consent', () => {
    assert.equal(buildPayload({ ...valid, email: '', nationality: 'OTHER' }).email, null);
    for (const change of [
        { name: ' ' }, { name: '가'.repeat(101) }, { phone: 'abc' },
        { email: 'invalid' }, { nationality: '' }, { nationality: 'ZZZ' },
        { message: '짧음' }, { message: '가'.repeat(1951) }, { consentPrivacy: false }
    ]) assert.throws(() => buildPayload({ ...valid, ...change }));
});

test('POST uses the public creation endpoint and the verified body contract', async () => {
    let request;
    await send(valid, {
        getToken: async () => 'fresh-token',
        fetch: async (url, options) => {
            request = { url, options };
            return { ok: true, json: async () => ({ status: 'ok' }) };
        }
    });
    assert.equal(request.url, 'https://aps-check-759991718457.us-central1.run.app/contact');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(request.options.body), {
        ...buildPayload(valid), recaptchaToken: 'fresh-token'
    });
});

test('form resets only after the server confirms success; repeated submit is blocked', async () => {
    const f = fixture();
    let resolve;
    let calls = 0;
    bind(f.form, {
        getToken: async () => 'token',
        fetch: async () => { calls++; return new Promise(r => { resolve = r; }); }
    });
    const pending = f.submit();
    await new Promise(r => setImmediate(r));
    assert.equal(f.button.disabled, true);
    assert.equal(f.resets(), 0);
    await f.submit();
    assert.equal(calls, 1);
    resolve({ ok: true, json: async () => ({ status: 'ok' }) });
    await pending;
    assert.equal(f.resets(), 1);
    assert.match(f.status.textContent, /신청이 완료/);
    assert.equal(f.button.disabled, false);
    assert.equal(f.attributes['aria-busy'], 'false');
});

for (const [name, fetch, getTokenOverride] of [
    ['HTTP 400', async () => ({ ok: false })],
    ['HTTP 403', async () => ({ ok: false })],
    ['HTTP 429', async () => ({ ok: false })],
    ['HTTP 500', async () => ({ ok: false })],
    ['network failure', async () => { throw new Error('network'); }],
    ['200 with error body', async () => ({ ok: true, json: async () => ({ status: 'error' }) })],
    ['200 without acknowledgment', async () => ({ ok: true, json: async () => ({}) })],
    ['200 null body', async () => ({ ok: true, json: async () => null })],
    ['invalid JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError('JSON'); } })],
    ['reCAPTCHA failure', async () => { throw new Error('must not send'); }, async () => { throw new Error('captcha'); }]
]) {
    test(name + ' preserves all fields and consent, and allows retry', async () => {
        const f = fixture();
        bind(f.form, { fetch, getToken: getTokenOverride || (async () => 'token') });
        await f.submit();
        assert.equal(f.resets(), 0);
        for (const [key, value] of Object.entries(valid)) assert.equal(f.fields[key].value, value);
        assert.equal(f.fields.consentPrivacy.checked, true);
        assert.match(f.status.textContent, /입력 내용은 유지/);
        assert.doesNotMatch(f.status.textContent, /신청이 완료/);
        assert.equal(f.button.disabled, false);
    });
}

test('fresh Enterprise token uses the server site key and contact action', async () => {
    assert.equal(await getToken({ enterprise: {
        ready: callback => callback(),
        execute: async (key, options) => {
            assert.equal(key, '6LeE3x4sAAAAAAvqktA6CeAWI-YQ1Mw6l_iHd8ks');
            assert.deepEqual(options, { action: 'contact' });
            return 'token';
        }
    } }), 'token');
    await assert.rejects(getToken(undefined));
    let calls = 0;
    await assert.rejects(send(valid, { getToken: async () => '', fetch: async () => calls++ }));
    assert.equal(calls, 0);
});

test('edits made while sending survive a successful response', async () => {
    const f = fixture();
    let resolve;
    bind(f.form, {
        getToken: async () => 'token',
        fetch: () => new Promise(r => { resolve = r; })
    });
    const pending = f.submit();
    await new Promise(r => setImmediate(r));
    f.fields.message.value = '전송 중 새로 작성한 상담 내용입니다.';
    resolve({ ok: true, json: async () => ({ status: 'ok' }) });
    await pending;
    assert.equal(f.resets(), 0);
    assert.equal(f.fields.message.value, '전송 중 새로 작성한 상담 내용입니다.');
    assert.match(f.status.textContent, /신청이 완료/);
    assert.match(f.status.textContent, /변경하신 입력 내용은 유지/);
});

test('invalid client data is explained without starting a request', async () => {
    const f = fixture();
    let calls = 0;
    f.fields.name.value = ' ';
    bind(f.form, {
        getToken: async () => { calls++; return 'token'; },
        fetch: async () => { calls++; }
    });
    await f.submit();
    assert.equal(calls, 0);
    assert.match(f.status.textContent, /이름/);
    assert.equal(f.resets(), 0);
    assert.equal(f.button.disabled, false);
});

test('retry obtains a fresh token and clears input only on the confirmed retry', async () => {
    const f = fixture();
    let attempts = 0;
    const tokens = [];
    bind(f.form, {
        getToken: async () => 'token-' + (++attempts),
        fetch: async (_url, options) => {
            tokens.push(JSON.parse(options.body).recaptchaToken);
            return attempts === 1 ? { ok: false } : { ok: true, json: async () => ({ status: 'ok' }) };
        }
    });
    await f.submit();
    assert.equal(f.resets(), 0);
    await f.submit();
    assert.deepEqual(tokens, ['token-1', 'token-2']);
    assert.equal(f.resets(), 1);
});

test('timeout preserves input and a late captcha result cannot start a request', async () => {
    const code = fs.readFileSync(path.join(__dirname, '../contact-form.js'), 'utf8');
    let onTimeout;
    const context = { module: { exports: {} }, AbortController,
        setTimeout: callback => { onTimeout = callback; return 1; }, clearTimeout() {} };
    vm.runInNewContext(code, context);
    const f = fixture();
    let releaseToken;
    let calls = 0;
    context.module.exports.bind(f.form, {
        getToken: () => new Promise(r => { releaseToken = r; }),
        fetch: async () => { calls++; }
    });
    const pending = f.submit();
    onTimeout();
    await pending;
    releaseToken('late-token');
    await new Promise(r => setImmediate(r));
    assert.equal(calls, 0);
    assert.equal(f.resets(), 0);
    assert.equal(f.fields.message.value, valid.message);
    assert.equal(f.button.disabled, false);
});

test('page binds the production handler; main.js cannot claim success or log inquiry data', () => {
    const code = fs.readFileSync(path.join(__dirname, '../contact-form.js'), 'utf8');
    const f = fixture();
    vm.runInNewContext(code, { window: { document: { getElementById: () => f.form }, fetch() {} } });
    assert.equal(f.button.disabled, false);
    const html = fs.readFileSync(path.join(__dirname, '../contact.html'), 'utf8');
    assert.match(html, /src=".\/contact-form.js"/);
    assert.match(html, /name="consentPrivacy" required/);
    const main = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8');
    assert.doesNotMatch(main, /Form submitted|this\.reset\(|상담 신청이 완료|\/api\/contact/);
});
