/**
 * 메인 JavaScript - 통합 및 최적화
 */

(function($) {
    'use strict';

    // ============================================
    // 글로벌 설정 (API 주소, reCAPTCHA Site Key)
    // ============================================
    const API_BASE = 'https://aps-check-759991718457.us-central1.run.app';
    const RECAPTCHA_SITE_KEY = '6LeE3x4sAAAAAAvqktA6CeAWI-YQ1Mw6l_iHd8ks';
    const RECAPTCHA_ACTION = 'contact';
    const MAX_ATTACHMENTS = 5;

    // ============================================
    // 1. 문서 준비
    // ============================================
    $(document).ready(function() {
        // 헤더/푸터 로드 후 초기화
        loadHeaderFooter(function() {
            initHeader();
            initSliders();
            initAnimations();
            initForms();
            initScrollEffects();
            initI18n();
        });
    });

    // ============================================
    // 1-1. 헤더/푸터 로드
    // ============================================
    function loadHeaderFooter(callback) {
        var headerLoaded = false;
        var footerLoaded = false;

        // 헤더 로드
        $('#header-placeholder').load('header.html', function(response, status) {
            if (status === "error") {
                console.warn('헤더 파일을 찾을 수 없습니다. 기본 헤더를 사용합니다.');
            }
            headerLoaded = true;
            if (headerLoaded && footerLoaded) {
                callback();
            }
        });

        // 푸터 로드
        $('#footer-placeholder').load('footer.html', function(response, status) {
            if (status === "error") {
                console.warn('푸터 파일을 찾을 수 없습니다. 기본 푸터를 사용합니다.');
            }
            footerLoaded = true;
            if (headerLoaded && footerLoaded) {
                callback();
            }
        });
    }

    // ============================================
    // 2. 헤더 (모바일 메뉴)
    // ============================================
    function initHeader() {
        // 반응형 로고 변경
        function updateLogo() {
            var $logoImg = $('.logo img');
            // 모든 화면 크기에서 동일한 로고 사용
            $logoImg.attr('src', './images/logo.png');
        }

        // 초기 로고 설정
        updateLogo();

        // 화면 크기 변경 시 로고 업데이트 (필요시를 위해 유지)
        $(window).on('resize', updateLogo);

        // 모바일 메뉴 토글
        $('.mobile-menu-btn').on('click', function(e) {
            e.stopPropagation();
            $(this).toggleClass('active');
            $('.mobile-menu').toggleClass('active');
            $('body').toggleClass('menu-open');
        });

        // 모바일 메뉴 링크 클릭 시 닫기
        $('.mobile-menu a').on('click', function() {
            $('.mobile-menu-btn').removeClass('active');
            $('.mobile-menu').removeClass('active');
            $('body').removeClass('menu-open');
        });

        // 모바일 메뉴 외부 클릭 시 닫기
        $('.mobile-menu').on('click', function(e) {
            if (e.target === this) {
                $('.mobile-menu-btn').removeClass('active');
                $('.mobile-menu').removeClass('active');
                $('body').removeClass('menu-open');
            }
        });

        // 스크롤 시 헤더 배경 (하이스테리시스 적용)
        var isScrolled = false;
        var ticking = false;

        $(window).on('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var scrollTop = $(window).scrollTop();

                    // 하이스테리시스: 내려갈 때 120px, 올라갈 때 80px
                    if (!isScrolled && scrollTop > 120) {
                        $('#header').addClass('scrolled');
                        isScrolled = true;
                    } else if (isScrolled && scrollTop < 80) {
                        $('#header').removeClass('scrolled');
                        isScrolled = false;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // ============================================
    // 3. 슬라이더 초기화
    // ============================================
    function initSliders() {
        // 메인 비주얼 슬라이더
        if ($('#main-visual').length) {
            new Swiper('#main-visual .visual-slider', {
                loop: true,
                effect: 'fade',
                speed: 800,
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    waitForTransition: true
                },
                pagination: {
                    el: '#main-visual .swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '" aria-label="Go to slide ' + (index + 1) + '\"></span>';
                    }
                },
                watchSlidesProgress: true,
                on: {
                    slideChangeTransitionStart: function() {
                        // 전환 시작 시 다음 슬라이드 애니메이션 리셋
                        var activeSlide = this.slides[this.activeIndex];
                        if (activeSlide) {
                            var bgInner = activeSlide.querySelector('.slide-bg-inner');
                            if (bgInner) {
                                bgInner.style.animation = 'none';
                                bgInner.offsetHeight; // 리플로우 강제
                                bgInner.style.animation = '';
                            }
                        }
                    }
                }
            });
        }

        // 팀 소개 슬라이더 (PC만)
        if ($('.team-slider').length && $(window).width() > 768) {
            new Swiper('.team-slider', {
                loop: true,
                speed: 600,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.team-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.team-slider .slider-next',
                    prevEl: '.team-slider .slider-prev',
                },
            });
        }
    }

    // ============================================
    // 4. 스크롤 애니메이션 (AOS)
    // ============================================
    function initAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100,
            });
        }
    }

    // ============================================
    // 5. 폼 처리
    // ============================================
    function initForms() {
        // 전화번호 자동 포맷팅
        $('input[type="tel"]').on('input', function() {
            let value = $(this).val().replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // 하이픈 자동 삽입
            if (value.length > 6) {
                value = value.substring(0, 3) + '-' + 
                        value.substring(3, 7) + '-' + 
                        value.substring(7);
            } else if (value.length > 3) {
                value = value.substring(0, 3) + '-' + 
                        value.substring(3);
            }
            
            $(this).val(value);
        });

        if (!$('#contactForm').length) {
            return;
        }

        // 국적 리스트 로드
        function loadNationalityOptions() {
            const $select = $('#nationality');
            if (!$select.length) return;

            fetch('country.json')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('국가 목록을 불러올 수 없습니다.');
                    }
                    return response.json();
                })
                .then(function(list) {
                    if (!Array.isArray(list)) return;

                    // 기존 placeholder 외 옵션 제거 후 재구성
                    const $placeholder = $select.find('option[value=""]').first();
                    $select.empty().append($placeholder);

                    // 최상단 대한민국 고정
                    $select.append(new Option('대한민국 / Republic of Korea', 'KOR'));

                    const clean = function(str) {
                        return (str || '').replace(/\s*\(en\)\s*$/i, '').trim();
                    };

                    list
                        .map(function(country) {
                            const code = country['alpha-2'] || country['alpha-3'] || country.name;
                            const nativeName = clean(country.nativeName || country.name);
                            const englishName = clean(country.name);
                            const label = nativeName === englishName
                                ? englishName
                                : nativeName + ' / ' + englishName;
                            return { code, label, englishName };
                        })
                        .filter(function(item) {
                            return item.code && item.code.toUpperCase() !== 'KOR';
                        })
                        .sort(function(a, b) {
                            return a.englishName.localeCompare(b.englishName);
                        })
                        .forEach(function(item) {
                            $select.append(new Option(item.label, item.code));
                        });

                    // 기타 옵션 유지
                    $select.append(new Option('기타 / Other', 'OTHER'));
                })
                .catch(function() {
                    console.warn('국가 목록을 불러오지 못했습니다. 기본 옵션을 사용합니다.');
                });
        }

        // 약관 파일 불러오기
        function loadServiceTerms(lang) {
            const $termsBox = $('#serviceTerms');
            const $termsDownload = $('.terms-download');

            if (!$termsBox.length) return;

            // 언어별 약관 파일 이름 설정
            let termsFileName;
            if (lang === 'en') {
                termsFileName = 'terms/terms_en.txt';
            } else if (lang === 'zh') {
                termsFileName = 'terms/terms_zh.txt';
            } else {
                termsFileName = 'terms/terms_ko.txt';
            }

            // 다운로드 링크 업데이트
            if ($termsDownload.length) {
                $termsDownload.attr('href', termsFileName);
            }

            // 로딩 메시지
            const loadingMessages = {
                ko: '약관을 불러오는 중입니다...',
                en: 'Loading terms...',
                zh: '正在加载条款...'
            };
            const emptyMessages = {
                ko: '약관 파일 내용이 비어 있습니다.',
                en: 'Terms file is empty.',
                zh: '条款文件为空。'
            };
            const errorMessages = {
                ko: '약관을 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.',
                en: 'Failed to load terms. Please refresh and try again.',
                zh: '无法加载条款。请刷新后重试。'
            };

            $termsBox.text(loadingMessages[lang] || loadingMessages.ko);

            // 약관 파일 불러오기
            fetch(termsFileName)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('약관 파일을 불러오지 못했습니다.');
                    }
                    return response.text();
                })
                .then(function(text) {
                    const content = text.trim();
                    $termsBox.text(content || emptyMessages[lang] || emptyMessages.ko);
                })
                .catch(function() {
                    $termsBox.text(errorMessages[lang] || errorMessages.ko);
                });
        }

        // 전역에서 접근 가능하도록 설정
        window.loadServiceTerms = loadServiceTerms;

        // 동의 모달 관련 함수
        function openConsentModal(type, lang) {
            const $modal = $('#consentModal');
            const $title = $('#consentModalTitle');
            const $content = $('#consentModalContent');

            const titles = {
                terms: {
                    ko: '서비스 기본약관',
                    en: 'Terms of Service',
                    zh: '服务基本条款'
                },
                privacy: {
                    ko: '개인정보 필수 항목 수집 및 이용',
                    en: 'Personal Information Collection and Use',
                    zh: '个人信息收集和使用'
                },
                transfer: {
                    ko: '개인정보의 국외 이전',
                    en: 'International Transfer of Personal Information',
                    zh: '个人信息的跨境传输'
                }
            };

            const files = {
                terms: {
                    ko: 'terms/terms_ko.txt',
                    en: 'terms/terms_en.txt',
                    zh: 'terms/terms_zh.txt'
                },
                privacy: {
                    ko: 'terms/privacy_ko.txt',
                    en: 'terms/privacy_en.txt',
                    zh: 'terms/privacy_zh.txt'
                },
                transfer: {
                    ko: 'terms/transfer_ko.txt',
                    en: 'terms/transfer_en.txt',
                    zh: 'terms/transfer_zh.txt'
                }
            };

            $title.text(titles[type][lang] || titles[type].ko);
            $content.text('내용을 불러오는 중입니다...');

            const fileName = files[type][lang] || files[type].ko;

            // 배경 스크롤 막기 (overflow만 사용)
            $('body').css('overflow', 'hidden');

            // 모달 열기
            $modal.addClass('active');

            fetch(fileName)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('파일을 불러올 수 없습니다.');
                    }
                    return response.text();
                })
                .then(function(text) {
                    // requestAnimationFrame으로 렌더링 최적화
                    requestAnimationFrame(function() {
                        $content.text(text.trim() || '내용이 비어 있습니다.');
                    });
                })
                .catch(function() {
                    $content.text('파일을 불러오지 못했습니다.');
                });
        }

        function closeConsentModal() {
            const $modal = $('#consentModal');
            $modal.removeClass('active');

            // overflow만 복원 (스크롤 위치 유지됨)
            $('body').css('overflow', '');
        }

        // 모달 overlay 터치 막기 (iOS Safari 대응)
        $('.consent-modal-overlay').on('touchmove', function(e) {
            e.preventDefault();
        });

        // 모달 내부 스크롤 제한 (배경 스크롤 방지)
        $('.consent-modal-body').on('wheel touchmove', function(e) {
            const $this = $(this);
            const scrollTop = $this.scrollTop();
            const scrollHeight = $this[0].scrollHeight;
            const height = $this.outerHeight();
            const delta = e.originalEvent.deltaY || -e.originalEvent.detail;

            // 위로 스크롤 시도 && 이미 최상단
            if (delta < 0 && scrollTop <= 0) {
                e.preventDefault();
            }
            // 아래로 스크롤 시도 && 이미 최하단
            else if (delta > 0 && scrollTop + height >= scrollHeight) {
                e.preventDefault();
            }
        });

        // 모달 닫기 이벤트
        $('#closeConsentModal, #consentModalBtnClose').on('click', closeConsentModal);
        $('.consent-modal-overlay').on('click', closeConsentModal);

        // 전문 보기 버튼 클릭 이벤트
        $('.consent-view-btn').on('click', function() {
            const type = $(this).data('modal');
            const lang = $('html').attr('lang') || 'ko';
            openConsentModal(type, lang);
        });

        // 모두 동의 버튼
        $('#agreeAllBtn').on('click', function() {
            const $checkboxes = $('#agreeTerms, #agreePrivacy, #agreeTransfer');
            const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;

            if (allChecked) {
                $checkboxes.prop('checked', false);
                $(this).removeClass('active');
            } else {
                $checkboxes.prop('checked', true);
                $(this).addClass('active');
            }

            // 제출 버튼 상태 업데이트
            toggleSubmitState();
        });

        // 개별 체크박스 변경 시 모두 동의 버튼 상태 업데이트
        $('#agreeTerms, #agreePrivacy, #agreeTransfer').on('change', function() {
            const $checkboxes = $('#agreeTerms, #agreePrivacy, #agreeTransfer');
            const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;
            $('#agreeAllBtn').toggleClass('active', allChecked);
        });

        const $submitBtn = $('#contactForm .submit-btn');
        function toggleSubmitState() {
            // 기존 agreeAll 체크 대신 3개 모두 체크되었는지 확인
            const allConsentsChecked = $('#agreeTerms').is(':checked') &&
                                      $('#agreePrivacy').is(':checked') &&
                                      $('#agreeTransfer').is(':checked');
            $submitBtn.prop('disabled', !allConsentsChecked);
            $submitBtn.toggleClass('disabled', !allConsentsChecked);
        }

        // 체크박스 변경 시 제출 버튼 상태 업데이트
        $('#agreeTerms, #agreePrivacy, #agreeTransfer').on('change', toggleSubmitState);

        function setSubmitting(isSubmitting) {
            if (!$submitBtn.length) return;
            if (isSubmitting) {
                $submitBtn.data('original-text', $submitBtn.text());
                $submitBtn.prop('disabled', true).addClass('disabled').text('제출 중...');
            } else {
                const original = $submitBtn.data('original-text');
                if (original) {
                    $submitBtn.text(original);
                }
                toggleSubmitState();
            }
        }

        function normalizeCategory(value) {
            const v = (value || '').toString().trim().toLowerCase();
            if (!v) return '';
            const map = {
                'visa': 'visa',
                'stay': 'stay',
                'naturalization': 'naturalization',
                'other': 'other',
                'nonprofit': 'nonprofit',
                'corporate': 'corporate',
                'civil': 'civil',
                'etc': 'etc'
            };
            return map[v] || 'other';
        }

        function executeRecaptcha() {
            console.log('=== executeRecaptcha 시작 (Enterprise) ===');
            console.log('grecaptcha:', typeof grecaptcha);
            console.log('grecaptcha.enterprise:', typeof grecaptcha?.enterprise);
            console.log('RECAPTCHA_SITE_KEY:', RECAPTCHA_SITE_KEY);

            if (typeof grecaptcha === 'undefined' || typeof grecaptcha.enterprise === 'undefined' || !RECAPTCHA_SITE_KEY) {
                console.error('reCAPTCHA Enterprise 로드 실패');
                return Promise.reject(new Error('reCAPTCHA 준비 중입니다. 잠시 후 다시 시도해 주세요.'));
            }
            return new Promise(function(resolve, reject) {
                grecaptcha.enterprise.ready(function() {
                    console.log('grecaptcha.enterprise.ready 호출됨');
                    grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
                        .then(function(token) {
                            console.log('Token 생성 성공 (Enterprise):', token ? token.substring(0, 50) + '...' : 'EMPTY');
                            console.log('Token length:', token ? token.length : 0);
                            resolve(token);
                        })
                        .catch(function(err) {
                            console.error('grecaptcha.enterprise.execute 실패:', err);
                            reject(new Error('reCAPTCHA 실행에 실패했습니다.'));
                        });
                });
            });
        }

        async function uploadAttachments(files) {
            if (!files || !files.length) return [];

            const meta = files.map(function(file) {
                return {
                    name: file.name,
                    type: file.type || 'application/octet-stream'
                };
            });

            const request = await fetch(API_BASE.replace(/\/$/, '') + '/uploadRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ files: meta })
            });

            const data = await request.json().catch(function() { return {}; });
            if (!request.ok || !data.urls || !Array.isArray(data.urls)) {
                throw new Error(data.message || '첨부 업로드 요청이 실패했습니다.');
            }

            if (data.urls.length !== meta.length) {
                throw new Error('업로드 URL 개수가 올바르지 않습니다.');
            }

            for (let i = 0; i < data.urls.length; i++) {
                const urlInfo = data.urls[i];
                const uploadRes = await fetch(urlInfo.uploadUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': meta[i].type || 'application/octet-stream'
                    },
                    body: files[i]
                });

                if (!uploadRes.ok) {
                    throw new Error('파일 업로드 중 오류가 발생했습니다.');
                }
            }

            return data.urls.map(function(u, idx) {
                return {
                    name: files[idx].name,
                    path: u.filename,
                    url: u.uploadUrl
                };
            });
        }

        loadNationalityOptions();
        loadServiceTerms(currentLanguage || 'ko'); // 초기 로드
        toggleSubmitState();

        // 에러 메시지 표시 함수
        function showFieldError(fieldId, message) {
            const $field = $('#' + fieldId);
            const $formGroup = $field.closest('.form-group, .form-row, .form-textarea');

            // 기존 에러 메시지 제거
            $formGroup.find('.field-error').remove();
            $field.removeClass('error');

            if (message) {
                // 에러 스타일 추가
                $field.addClass('error');

                // 에러 메시지 추가
                const $error = $('<div class="field-error"></div>').text(message);
                $formGroup.append($error);

                // 필드로 스크롤
                $field[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                $field.focus();
            }
        }

        function clearAllErrors() {
            $('.field-error').remove();
            $('input, select, textarea').removeClass('error');
        }

        // 성공 모달 함수
        function showSuccessModal() {
            const $modal = $('#successModal');
            $('body').css('overflow', 'hidden');
            $modal.addClass('active');

            // 2초 후 자동 닫기
            setTimeout(function() {
                closeSuccessModal();
            }, 2000);
        }

        function closeSuccessModal() {
            const $modal = $('#successModal');
            $modal.removeClass('active');
            $('body').css('overflow', '');
        }

        // 상담 폼 제출
        $('#contactForm').on('submit', async function(e) {
            e.preventDefault();
            clearAllErrors();

            const formData = {
                name: $('#name').val().trim(),
                phone: $('#phone').val().trim(),
                email: $('#email').val().trim(),
                category: $('#category').val(),
                nationality: $('#nationality').val(),
                company: $('#company').val().trim(),
                message: $('#message').val().trim(),
                attachments: $('#attachments')[0] ? Array.from($('#attachments')[0].files).map(function(file) { return file.name; }) : [],
                agreeTerms: $('#agreeTerms').is(':checked'),
                agreePrivacy: $('#agreePrivacy').is(':checked'),
                agreeTransfer: $('#agreeTransfer').is(':checked')
            };

            const safeCategory = normalizeCategory(formData.category);
            const nationality = (formData.nationality || '').trim().toUpperCase();
            const attachmentsInput = $('#attachments')[0];
            const files = attachmentsInput && attachmentsInput.files ? Array.from(attachmentsInput.files).slice(0, MAX_ATTACHMENTS) : [];

            // 유효성 검사
            if (!formData.name) {
                showFieldError('name', '이름을 입력해주세요.');
                return;
            }

            if (!formData.phone) {
                showFieldError('phone', '연락처를 입력해주세요.');
                return;
            }

            if (!safeCategory) {
                showFieldError('category', '상담 분야를 선택해주세요.');
                return;
            }

            if (!nationality) {
                showFieldError('nationality', '국적을 선택해주세요.');
                return;
            }

            if (!formData.message) {
                showFieldError('message', '문의내용을 입력해주세요.');
                return;
            }

            if (formData.message.length < 10) {
                showFieldError('message', '문의내용은 최소 10자 이상 입력해주세요.');
                return;
            }

            if (formData.message.length > 2000) {
                showFieldError('message', '문의내용은 최대 2000자까지 입력 가능합니다.');
                return;
            }

            if (formData.email && !isValidEmail(formData.email)) {
                showFieldError('email', '올바른 이메일 주소를 입력해주세요.');
                return;
            }

            const maxFileSize = 20 * 1024 * 1024; // 20MB
            const maxFileCount = 5;
            if (files.length) {
                if (files.length > maxFileCount) {
                    alert('첨부파일은 최대 5개까지 업로드 가능합니다.');
                    return;
                }

                const invalidFile = files.find(function(file) {
                    return file.size > maxFileSize;
                });

                if (invalidFile) {
                    alert('첨부파일은 파일당 20MB 이하만 업로드 가능합니다. 용량을 줄여 다시 시도해주세요.');
                    return;
                }
            }

            if (!formData.agreeTerms || !formData.agreePrivacy || !formData.agreeTransfer) {
                alert('서비스 기본약관, 개인정보 수집·이용, 개인정보 국외 이전에 모두 동의해주세요.');
                return;
            }

            // ========================================
            // 즉시 성공 모달 표시 + 폼 리셋
            // ========================================
            showSuccessModal();
            $('#contactForm')[0].reset();
            toggleSubmitState();

            // ========================================
            // 백그라운드로 비동기 전송 (사용자는 이미 성공 메시지 봄)
            // ========================================
            const payload = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                category: safeCategory,
                nationality: nationality,
                company: formData.company,
                message: formData.message
            };

            (async function() {
                try {
                    const recaptchaToken = await executeRecaptcha();
                    const attachments = await uploadAttachments(files);

                    const response = await fetch(API_BASE.replace(/\/$/, '') + '/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...payload,
                            attachments: attachments,
                            recaptchaToken: recaptchaToken
                        })
                    });

                    const result = await response.json().catch(function() { return {}; });
                    if (!response.ok || result.status !== 'ok') {
                        throw new Error(result.message || '문의 접수에 실패했습니다.');
                    }

                    console.log('상담 신청이 성공적으로 전송되었습니다.');
                } catch (err) {
                    console.error('백그라운드 전송 실패 (사용자는 이미 성공 메시지를 봤으므로 무시):', err);
                }
            })();
        });
    }

    // 6. 스크롤 효과
    // ============================================
    function initScrollEffects() {
        // 맨 위로 버튼
        $('.to-top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        });

        // 부드러운 스크롤 (앵커 링크)
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });

        // 업무분야 카드 호버 효과 (모바일 제외)
        if ($(window).width() > 768) {
            $('.service-card').on('mouseenter', function() {
                $(this).addClass('active');
            }).on('mouseleave', function() {
                $(this).removeClass('active');
            });
        }

        // 모바일에서 카드 클릭/터치 효과만 차단 (스크롤은 허용)
        if ($(window).width() <= 768) {
            var cardSelectors = '.service-card, .service-detail-card, .contact-method-card, .vision-card, .case-item, .case-card, .feature-item, .why-card, .team-card';

            // 클릭만 차단 (터치 이동은 허용)
            $(cardSelectors).on('click', function(e) {
                e.preventDefault();
                return false;
            });
        }

        // 모바일 전화 버튼 표시/숨김
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                $('.mobile-call-btn').fadeIn();
            } else {
                $('.mobile-call-btn').fadeOut();
            }
        });
    }

    // ============================================
    // 7. 숫자 카운터 애니메이션 (성공사례 등)
    // ============================================
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $(element).text(Math.floor(current).toLocaleString());
        }, 20);
    }

    // 뷰포트에 들어왔을 때 카운터 시작
    function initCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            
            if (!$this.hasClass('counted')) {
                const elementTop = $this.offset().top;
                const windowBottom = $(window).scrollTop() + $(window).height();
                
                if (windowBottom > elementTop) {
                    $this.addClass('counted');
                    animateCounter($this, target);
                }
            }
        });
    }

    $(window).on('scroll', initCounters);
    initCounters(); // 초기 실행

    // ============================================
    // 8. 이미지 레이지 로딩
    // ============================================
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    initLazyLoad();

    // ============================================
    // 9. 윈도우 리사이즈 핸들링
    // ============================================
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // 리사이즈 시 필요한 작업
            if ($(window).width() > 1024) {
                $('.mobile-menu').removeClass('active');
                $('.mobile-menu-btn').removeClass('active');
                $('body').removeClass('menu-open');
            }
        }, 250);
    });

    // ============================================
    // 9. 다국어 지원 (i18n)
    // ============================================
    let currentLanguage = 'ko';
    let translations = {};

    function initI18n() {
        // 저장된 언어 불러오기
        const savedLang = localStorage.getItem('language') || 'ko';
        loadLanguage(savedLang);

        // PC 언어 선택 버튼 이벤트
        $('#langBtn').on('click', function(e) {
            e.stopPropagation();
            $('#langDropdown').toggleClass('active');
        });

        // 드롭다운 외부 클릭 시 닫기
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.language-selector').length) {
                $('#langDropdown').removeClass('active');
            }
        });

        // 언어 선택
        $('.lang-dropdown button, .mobile-lang-option').on('click', function() {
            const lang = $(this).data('lang');
            loadLanguage(lang);
            $('#langDropdown').removeClass('active');
            $('#mobileLangOptions').removeClass('active');
        });

        // 모바일 언어 드롭다운 토글
        $('#mobileLangBtn').on('click', function(e) {
            e.stopPropagation();
            $('#mobileLangOptions').toggleClass('active');
        });

        // 모바일 언어 드롭다운 외부 클릭 시 닫기
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.mobile-lang-dropdown').length) {
                $('#mobileLangOptions').removeClass('active');
            }
        });
    }

    function loadLanguage(lang) {
        $.getJSON(`./i18n/${lang}.json`)
            .done(function(data) {
                translations = data;
                currentLanguage = lang;
                applyTranslations();
                updateLanguageUI(lang);
                localStorage.setItem('language', lang);

                // 약관 파일도 언어에 맞게 업데이트
                if (typeof window.loadServiceTerms === 'function') {
                    window.loadServiceTerms(lang);
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error(`언어 파일 로드 실패: ${lang}.json`, textStatus, errorThrown);
            });
    }

    function applyTranslations() {
        // 중첩된 객체에서 값을 가져오는 헬퍼 함수
        function getNestedValue(obj, path) {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        }

        // 일반 텍스트 번역 (data-i18n)
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            const value = getNestedValue(translations, key);

            if (value) {
                // HTML 태그가 포함된 경우 html() 사용
                if (value.includes('<')) {
                    $(this).html(value);
                } else {
                    $(this).text(value);
                }
            }
        });

        // HTML 포함 번역 (data-i18n-html)
        $('[data-i18n-html]').each(function() {
            const key = $(this).data('i18n-html');
            const value = getNestedValue(translations, key);
            if (value) {
                $(this).html(value);
            }
        });

        // placeholder 속성 번역 (data-i18n-attr="placeholder")
        $('[data-i18n-attr="placeholder"]').each(function() {
            const key = $(this).data('i18n-placeholder');
            const value = getNestedValue(translations, key);
            if (value) {
                $(this).attr('placeholder', value);
            }
        });
    }

    function updateLanguageUI(lang) {
        // 현재 언어 표시
        $('#currentLang').text(lang.toUpperCase());

        // HTML lang 속성 업데이트 (모달 등에서 현재 언어 감지용)
        $('html').attr('lang', lang);

        // body에 언어 클래스 추가 (CSS에서 언어별 스타일 적용 가능)
        $('body').removeClass('lang-ko lang-en lang-zh').addClass(`lang-${lang}`);

        // 모바일 언어 드롭다운 텍스트 업데이트
        const langNames = { ko: '한국어', en: 'English', zh: '中文' };
        $('#mobileLangText').text(langNames[lang] || '한국어');

        // 모바일 옵션 활성화 상태
        $('.mobile-lang-option').removeClass('active');
        $(`.mobile-lang-option[data-lang="${lang}"]`).addClass('active');

        // 드롭다운 버튼 활성화 상태
        $('.lang-dropdown button').removeClass('active');
        $(`.lang-dropdown button[data-lang="${lang}"]`).addClass('active');
    }

    // ============================================
    // 10. 유틸리티 함수
    // ============================================
    
    // 전화번호 포맷
    window.formatPhone = function(phone) {
        return phone.replace(/[^0-9]/g, '')
                   .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    };

    // 이메일 유효성 검사
    window.isValidEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // 쿠키 설정
    window.setCookie = function(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    };

    // 쿠키 가져오기
    window.getCookie = function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

})(jQuery);


