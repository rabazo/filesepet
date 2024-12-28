// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    // Normal metin içeriklerini değiştir
    document.querySelectorAll('[data-tr]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Form placeholder'larını değiştir
    document.querySelectorAll('[data-tr-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute(`data-${lang}-placeholder`);
    });

    // Dil butonlarının aktif durumunu güncelle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Dil tercihini localStorage'a kaydet
    localStorage.setItem('language', lang);
}

// Tema değiştirme fonksiyonu
function toggleTheme(e) {
    const html = document.documentElement;
    const isChecked = e.target.checked;

    html.setAttribute('data-theme', isChecked ? 'dark' : 'light');
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
}

// Slider fonksiyonları
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Nokta göstergelerini oluştur
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isTransitioning && currentSlide !== index) {
                goToSlide(index);
                resetInterval();
            }
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Slaytı değiştir
    function goToSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }

    // Sonraki slayta geç
    function nextSlide() {
        if (!isTransitioning) {
            goToSlide(currentSlide + 1);
        }
    }

    // Önceki slayta geç
    function prevSlide() {
        if (!isTransitioning) {
            goToSlide(currentSlide - 1);
        }
    }

    // Interval'i sıfırla
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Otomatik geçiş başlat
    function startSlideShow() {
        slideInterval = setInterval(() => {
            if (!isTransitioning && document.hasFocus()) {
                nextSlide();
            }
        }, 6000);
    }

    // Otomatik geçişi durdur
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Klavye kontrollerini ekle
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // Touch olayları
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopSlideShow();
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        const touchDiff = touchStartX - touchEndX;
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetInterval();
    });

    // Mouse hover durumunda otomatik geçişi durdur
    slider.addEventListener('mouseenter', stopSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);

    // Sayfa görünür değilken slaytı durdur
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideShow();
        } else {
            startSlideShow();
        }
    });

    // Otomatik geçişi başlat
    startSlideShow();
}

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Dil butonlarına tıklama olayı ekle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Kaydedilmiş dil tercihini kontrol et ve uygula
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }

    // Tema tercihini kontrol et ve uygula
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Tema değiştirme butonuna change olayı ekle
    themeToggle.addEventListener('change', toggleTheme);

    // Smooth scroll için tüm iç bağlantıları seç
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form gönderimi
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };

            // Form verilerini konsola yazdır (gerçek uygulamada burada API çağrısı yapılacak)
            console.log('Form verileri:', formData);
            
            // Kullanıcıya başarılı mesajı göster
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            
            // Formu temizle
            this.reset();
        });
    }

    // Scroll olayını dinle ve header'ı güncelle
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Aşağı scroll
            header.style.transform = 'translateY(-100%)';
        } else {
            // Yukarı scroll
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Slider'ı başlat
    initSlider();
}); 