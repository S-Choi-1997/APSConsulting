/**
 * 메인 JavaScript - 통합 및 최적화
 */

(function($) {
    'use strict';

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
        // 모바일 메뉴 토글
        $('.mobile-menu-btn').on('click', function() {
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

        // 스크롤 시 헤더 배경
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('#header').addClass('scrolled');
            } else {
                $('#header').removeClass('scrolled');
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
                },
                pagination: {
                    el: '#main-visual .swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '" aria-label="Go to slide ' + (index + 1) + '\"></span>';
                    }
                },
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
        function loadServiceTerms() {
            const $termsBox = $('#serviceTerms');

            if (!$termsBox.length) return;

            fetch('서비스 기본약관.txt')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('약관 파일을 불러오지 못했습니다.');
                    }
                    return response.text();
                })
                .then(function(text) {
                    const content = text.trim();
                    $termsBox.text(content || '약관 파일 내용이 비어 있습니다.');
                })
                .catch(function() {
                    $termsBox.text('약관을 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.');
                });
        }

        const $submitBtn = $('#contactForm .submit-btn');
        function toggleSubmitState() {
            const ready = $('#agreeAll').is(':checked');
            $submitBtn.prop('disabled', !ready);
            $submitBtn.toggleClass('disabled', !ready);
        }

        loadNationalityOptions();
        loadServiceTerms();
        $('#agreeAll').on('change', toggleSubmitState);
        toggleSubmitState();

        // 상담 폼 제출
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: $('#name').val().trim(),
                phone: $('#phone').val().trim(),
                email: $('#email').val().trim(),
                category: $('#category').val(),
                nationality: $('#nationality').val(),
                company: $('#company').val().trim(),
                message: $('#message').val().trim(),
                attachments: $('#attachments')[0] ? Array.from($('#attachments')[0].files).map(function(file) { return file.name; }) : [],
                agreeAll: $('#agreeAll').is(':checked')
            };

            // 유효성 검사
            if (!formData.name || !formData.phone || !formData.category || !formData.nationality || !formData.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            if (formData.email && !isValidEmail(formData.email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }

            const maxFileSize = 20 * 1024 * 1024; // 20MB
            const maxFileCount = 5;
            const attachmentsInput = $('#attachments')[0];
            if (attachmentsInput && attachmentsInput.files.length) {
                if (attachmentsInput.files.length > maxFileCount) {
                    alert('첨부파일은 최대 5개까지 업로드 가능합니다.');
                    return;
                }

                const invalidFile = Array.from(attachmentsInput.files).find(function(file) {
                    return file.size > maxFileSize;
                });

                if (invalidFile) {
                    alert('첨부파일은 파일당 20MB 이하만 업로드 가능합니다. 용량을 줄여 다시 시도해주세요.');
                    return;
                }
            }

            if (!formData.agreeAll) {
                alert('서비스 기본약관 및 개인정보 처리에 동의해주세요.');
                return;
            }

            // 실제 서버로 전송하는 코드 (예시)
            /*
            $.ajax({
                url: '/api/contact',
                method: 'POST',
                data: formData,
                success: function(response) {
                    alert('상담 신청이 완료되었습니다.');
                    $('#contactForm')[0].reset();
                },
                error: function(error) {
                    alert('오류가 발생했습니다. 다시 시도해주세요.');
                }
            });
            */

            // 임시: 콘솔 출력
            console.log('Form submitted:', formData);
            alert('상담 신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
            this.reset();
            toggleSubmitState();
        });
    }

    // ============================================
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

        // 업무분야 카드 호버 효과
        $('.service-card').on('mouseenter', function() {
            $(this).addClass('active');
        }).on('mouseleave', function() {
            $(this).removeClass('active');
        });

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


