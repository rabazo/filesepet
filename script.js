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
}); 