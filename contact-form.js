(function(root, factory) {
    'use strict';
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    } else {
        const form = root.document.getElementById('contactForm');
        if (form) api.bind(form, {
            fetch: root.fetch.bind(root),
            getToken: () => api.getToken(root.grecaptcha)
        });
    }
})(typeof window !== 'undefined' ? window : globalThis, function() {
    'use strict';

    // Confirmed in APSConsulting@publish:main.js; not the administrator API.
    const ENDPOINT = 'https://aps-check-759991718457.us-central1.run.app/contact';
    const SITE_KEY = '6LeE3x4sAAAAAAvqktA6CeAWI-YQ1Mw6l_iHd8ks';
    const CATEGORIES = Object.freeze({
        '인허가': { code: 'corporate', label: '인허가 행정' },
        '기업인증': { code: 'corporate', label: '기업인증 및 컨설팅' },
        '부동산': { code: 'etc', label: '부동산인허가 및 토지보상' },
        '민원': { code: 'civil', label: '민원행정 및 행정심판' },
        '기타': { code: 'etc', label: '기타' }
    });

    function buildPayload(values) {
        const trim = value => typeof value === 'string' ? value.trim() : '';
        const category = Object.hasOwn(CATEGORIES, values.category) ? CATEGORIES[values.category] : null;
        const name = trim(values.name);
        const phone = trim(values.phone);
        const email = trim(values.email);
        const message = trim(values.message);
        const nationality = trim(values.nationality).toUpperCase();
        if (!name || name.length > 100) throw new Error('이름을 100자 이내로 입력해주세요.');
        if (!/^[0-9\s-]{7,20}$/.test(phone)) throw new Error('연락처를 확인해주세요.');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('이메일을 확인해주세요.');
        if (!category || typeof category.code !== 'string') throw new Error('상담 분야를 선택해주세요.');
        if (!['KOR', 'OTHER'].includes(nationality)) throw new Error('국적을 선택해주세요.');
        if (message.length < 10 || message.length > 1950) throw new Error('상담내용을 10~1950자로 입력해주세요.');
        if (values.consentPrivacy !== true) throw new Error('개인정보 수집 및 이용에 동의해주세요.');
        return {
            name, phone, email: email || null,
            category: category.code, nationality,
            // Preserve the service detail when multiple services share a backend category.
            message: '[상담 분야: ' + category.label + ']\n' + message,
            attachments: []
        };
    }

    function getToken(grecaptcha) {
        return new Promise((resolve, reject) => {
            if (!grecaptcha || !grecaptcha.enterprise) {
                reject(new Error('보안 확인을 준비 중입니다. 잠시 후 다시 시도해주세요.'));
                return;
            }
            grecaptcha.enterprise.ready(() => {
                Promise.resolve().then(() => grecaptcha.enterprise.execute(SITE_KEY, { action: 'contact' }))
                    .then(resolve, reject);
            });
        });
    }

    async function send(values, dependencies) {
        const payload = buildPayload(values);
        const token = await dependencies.getToken();
        if (dependencies.signal && dependencies.signal.aborted) throw new Error('접수 확인 시간이 초과되었습니다.');
        if (typeof token !== 'string' || !token) throw new Error('보안 확인에 실패했습니다.');
        const response = await dependencies.fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: dependencies.signal,
            body: JSON.stringify({ ...payload, recaptchaToken: token })
        });
        if (!response.ok) throw new Error('서버가 접수를 확인하지 못했습니다.');
        const result = await response.json();
        if (!result || result.status !== 'ok') throw new Error('서버가 접수를 확인하지 못했습니다.');
        return result;
    }

    function bind(form, dependencies) {
        const button = form.querySelector('[type="submit"]');
        const status = form.querySelector('[role="status"]');
        let submitting = false;
        button.disabled = false;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (submitting) return;
            if (!form.reportValidity()) return;
            const fields = form.elements;
            const values = {};
            for (const key of ['name', 'phone', 'email', 'category', 'nationality', 'message']) {
                values[key] = fields.namedItem(key).value;
            }
            values.consentPrivacy = fields.namedItem('consentPrivacy').checked;
            try {
                buildPayload(values);
            } catch (error) {
                status.textContent = error.message;
                return;
            }
            submitting = true;
            button.disabled = true;
            form.setAttribute('aria-busy', 'true');
            status.textContent = '상담 신청을 전송하고 있습니다.';
            let timer;
            const controller = new AbortController();
            try {
                // Covers stalled reCAPTCHA, network requests and response parsing.
                const timeout = new Promise((_, reject) => {
                    timer = setTimeout(() => {
                        controller.abort();
                        reject(new Error('접수 확인 시간이 초과되었습니다.'));
                    }, 20000);
                });
                await Promise.race([send(values, { ...dependencies, signal: controller.signal }), timeout]);
                const unchanged = Object.keys(values).every(key => key === 'consentPrivacy'
                    ? fields.namedItem(key).checked === values[key]
                    : fields.namedItem(key).value === values[key]);
                if (unchanged) form.reset();
                status.textContent = '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.' +
                    (unchanged ? '' : ' 전송 중 변경하신 입력 내용은 유지됩니다.');
            } catch (error) {
                // Never log personal information or reset on an unconfirmed result.
                status.textContent = '접수 완료를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도해주세요.';
            } finally {
                clearTimeout(timer);
                submitting = false;
                button.disabled = false;
                form.setAttribute('aria-busy', 'false');
            }
        });
    }

    return { buildPayload, getToken, send, bind };
});
