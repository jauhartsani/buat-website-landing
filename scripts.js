// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initFormValidation();
    initSmoothScrolling();
    initAnimations();
    initLazyLoading();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Form validation functionality
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    const formFields = {
        nama: {
            element: document.getElementById('nama'),
            error: document.getElementById('nama-error'),
            validate: validateName
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('email-error'),
            validate: validateEmail
        },
        telp: {
            element: document.getElementById('telp'),
            error: document.getElementById('telp-error'),
            validate: validatePhone
        },
        pesan: {
            element: document.getElementById('pesan'),
            error: document.getElementById('pesan-error'),
            validate: validateMessage
        }
    };

    // Add real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field.element) {
            // Validate on blur
            field.element.addEventListener('blur', function () {
                validateField(fieldName, formFields);
            });

            // Clear error on input
            field.element.addEventListener('input', function () {
                clearError(field.error);
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName, formFields)) {
                isValid = false;
            }
        });

        if (isValid) {
            handleFormSubmission(contactForm);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Individual field validation functions
function validateField(fieldName, formFields) {
    const field = formFields[fieldName];
    if (!field || !field.element) return true;

    const value = field.element.value.trim();
    const validation = field.validate(value);

    if (!validation.isValid) {
        showError(field.error, validation.message);
        return false;
    } else {
        clearError(field.error);
        return true;
    }
}

function validateName(value) {
    if (!value) {
        return { isValid: false, message: 'Nama lengkap wajib diisi' };
    }
    if (value.length < 2) {
        return { isValid: false, message: 'Nama minimal 2 karakter' };
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        return { isValid: false, message: 'Nama hanya boleh berisi huruf dan spasi' };
    }
    return { isValid: true, message: '' };
}

function validateEmail(value) {
    if (!value) {
        return { isValid: false, message: 'Email wajib diisi' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Format email tidak valid' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(value) {
    if (!value) {
        return { isValid: false, message: 'Nomor telepon wajib diisi' };
    }
    // Remove all non-numeric characters for validation
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length < 10 || numericValue.length > 15) {
        return { isValid: false, message: 'Nomor telepon harus 10-15 digit' };
    }
    // Check if it's a valid Indonesian phone number format
    if (!/^(\+62|62|0)[\d\-\s]{8,13}$/.test(value)) {
        return { isValid: false, message: 'Format nomor telepon tidak valid (contoh: 08123456789)' };
    }
    return { isValid: true, message: '' };
}

function validateMessage(value) {
    if (!value) {
        return { isValid: false, message: 'Deskripsi kebutuhan wajib diisi' };
    }
    if (value.length < 10) {
        return { isValid: false, message: 'Deskripsi minimal 10 karakter' };
    }
    if (value.length > 1000) {
        return { isValid: false, message: 'Deskripsi maksimal 1000 karakter' };
    }
    return { isValid: true, message: '' };
}

function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.parentElement.querySelector('input, textarea, select').style.borderColor = '#e53e3e';
    }
}

function clearError(errorElement) {
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        errorElement.parentElement.querySelector('input, textarea, select').style.borderColor = '#e1e8ed';
    }
}
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual implementation)
    setTimeout(function () {
        // Get form data
        const formData = new FormData(form);
        const data = {
            nama: formData.get('nama'),
            email: formData.get('email'),
            telp: formData.get('telp'),
            layanan: formData.get('layanan') || 'Tidak dipilih',
            pesan: formData.get('pesan')
        };

        // Here you would typically send the data to your server
        console.log('Form Data:', data);

        const whatsappMessage = createWhatsAppMessage(data);
        
        // Coba buka WhatsApp dengan multiple fallback methods
        openWhatsApp(whatsappMessage);

        // Reset form dan restore button
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showSuccessMessage();
        
    }, 2000);
}

function openWhatsApp(message) {
    const phoneNumber = '6285868646342';
    const encodedMessage = encodeURIComponent(message);
    
    // Deteksi device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    // Method 1: Coba dengan whatsapp:// scheme terlebih dahulu (iOS native)
    if (isIOS) {
        const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        
        // Coba buka app WhatsApp terlebih dahulu
        const startTime = Date.now();
        const timeout = setTimeout(() => {
            // Jika app tidak terbuka dalam 2 detik, buka web version
            window.open(webUrl, '_blank');
        }, 2000);
        
        // Event listener untuk mendeteksi jika user kembali ke browser
        const handleVisibilityChange = () => {
            if (Date.now() - startTime > 1000) {
                clearTimeout(timeout);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Coba buka app
        window.location.href = whatsappAppUrl;
        
    } else if (isAndroid) {
        // Android: coba intent terlebih dahulu, fallback ke web
        const intentUrl = `intent://send?phone=${phoneNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
        const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        
        try {
            window.location.href = intentUrl;
            
            // Fallback ke web jika app tidak tersedia
            setTimeout(() => {
                window.open(webUrl, '_blank');
            }, 1000);
        } catch (e) {
            window.open(webUrl, '_blank');
        }
        
    } else {
        // Desktop atau browser lain: langsung ke web WhatsApp
        const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(webUrl, '_blank');
    }
}

// Alternative method: menggunakan user interaction yang lebih eksplisit
function openWhatsAppAlternative(message) {
    const phoneNumber = '6285868646342';
    const encodedMessage = encodeURIComponent(message);
    
    // Buat link yang bisa diklik user
    const linkContainer = document.createElement('div');
    linkContainer.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; max-width: 300px;">
                <h3>Pilih cara mengirim pesan:</h3>
                <a href="whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}" 
                   style="display: block; background: #25D366; color: white; padding: 12px; margin: 10px 0; text-decoration: none; border-radius: 5px;">
                   📱 Buka WhatsApp App
                </a>
                <a href="https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}" 
                   target="_blank"
                   style="display: block; background: #128C7E; color: white; padding: 12px; margin: 10px 0; text-decoration: none; border-radius: 5px;">
                   🌐 Buka WhatsApp Web
                </a>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #ccc; border: none; padding: 8px 16px; border-radius: 5px; margin-top: 10px;">
                   Tutup
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(linkContainer);
}

// Method dengan deteksi yang lebih akurat
function openWhatsAppImproved(message) {
    const phoneNumber = '6285868646342';
    const encodedMessage = encodeURIComponent(message);
    
    // Cek apakah WhatsApp tersedia
    function checkWhatsAppAvailable() {
        return new Promise((resolve) => {
            const link = document.createElement('a');
            link.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
            
            const startTime = Date.now();
            
            // Handler untuk blur event (user meninggalkan browser)
            const handleBlur = () => {
                if (Date.now() - startTime < 1000) {
                    resolve(true); // App terbuka
                }
            };
            
            window.addEventListener('blur', handleBlur, { once: true });
            
            // Handler untuk focus kembali (user kembali ke browser tanpa buka app)
            const handleFocus = () => {
                setTimeout(() => {
                    resolve(false); // App tidak terbuka
                }, 100);
            };
            
            window.addEventListener('focus', handleFocus, { once: true });
            
            // Timeout fallback
            setTimeout(() => {
                resolve(false);
            }, 2000);
            
            // Coba buka app
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Untuk iOS dan mobile, coba app dulu
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        checkWhatsAppAvailable().then(appOpened => {
            if (!appOpened) {
                // Fallback ke web version
                window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
            }
        });
    } else {
        // Desktop: langsung ke web WhatsApp
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
    }
}


function createWhatsAppMessage(data) {
    return `Halo! Saya ingin konsultasi untuk pembuatan website/aplikasi.

*Detail Informasi:*
Nama: ${data.nama}
Email: ${data.email}
Telepon: ${data.telp}
Layanan: ${data.layanan}

*Kebutuhan:*
${data.pesan}

Mohon informasi lebih lanjut mengenai pricing dan timeline pengerjaan. Terima kasih!`;
}

function showSuccessMessage() {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Pesan berhasil dikirim!';

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .portfolio-item, .process-step, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced lazy loading for images
function initLazyLoading() {
    // For browsers that don't support native lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            // Add loading placeholder
            img.addEventListener('load', function () {
                this.style.filter = 'none';
                this.style.transition = 'filter 0.3s ease';
            });
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('telp');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            // Add country code if not present
            if (value.startsWith('8')) {
                value = '0' + value;
            }

            // Format phone number with spaces
            if (value.length > 4) {
                value = value.substring(0, 4) + '-' + value.substring(4);
            }
            if (value.length > 9) {
                value = value.substring(0, 9) + '-' + value.substring(9);
            }

            e.target.value = value;
        });
    }
});

// WhatsApp floating button (optional enhancement)
function addFloatingWhatsApp() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'https://wa.me/6285868646342';
    floatingBtn.target = '_blank';
    floatingBtn.className = 'floating-whatsapp';
    floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    floatingBtn.title = 'Chat via WhatsApp';

    floatingBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25d366, #1da851);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        text-decoration: none;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;

    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        
        .floating-whatsapp:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
        }
    `;
    document.head.appendChild(style);

    floatingBtn.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
    });

    floatingBtn.addEventListener('mouseleave', function () {
        this.style.animation = 'pulse 2s infinite';
    });

    document.body.appendChild(floatingBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', debounce(function () {
        if (window.scrollY > 300) {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.visibility = 'visible';
        } else {
            floatingBtn.style.opacity = '0';
            floatingBtn.style.visibility = 'hidden';
        }
    }, 100));

    // Initially hidden
    floatingBtn.style.opacity = '0';
    floatingBtn.style.visibility = 'hidden';
    floatingBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease';
}

// Call floating WhatsApp after DOM loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(addFloatingWhatsApp, 1000); // Add after 1 second delay
});

// Enhanced scroll-to-top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.title = 'Kembali ke atas';

    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 110px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(30, 60, 114, 0.4)';
    });

    scrollBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(30, 60, 114, 0.3)';
    });

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll
    window.addEventListener('scroll', debounce(function () {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', function () {
    addScrollToTop();
});

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        '/assets/hero-image.jpg',
        '/assets/portfolio1.jpg',
        '/assets/portfolio2.jpg',
        '/assets/portfolio3.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// SEO Enhancement: Dynamic meta description based on scroll
function updateMetaDescription() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                let description = '';

                switch (entry.target.id) {
                    case 'hero':
                        description = 'Jasa pembuatan website murah dan profesional. Web developer murah dengan layanan jasa buat aplikasi terpercaya. Mulai dari 500rb!';
                        break;
                    case 'keunggulan':
                        description = 'Keunggulan jasa pembuatan website murah: harga terjangkau, pengerjaan cepat, responsive design, SEO friendly, dan support 24/7.';
                        break;
                    case 'portofolio':
                        description = 'Lihat portofolio website dan aplikasi yang telah kami buat. Jasa buat aplikasi dan website dengan hasil yang memuaskan.';
                        break;
                    case 'testimoni':
                        description = 'Testimoni klien tentang layanan jasa pembuatan website murah dan web developer profesional kami.';
                        break;
                    case 'kontak':
                        description = 'Hubungi kami untuk konsultasi gratis pembuatan website dan aplikasi. Pricing detail via contact - mulai dari 500rb!';
                        break;
                }

                if (description) {
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc) {
                        metaDesc.setAttribute('content', description);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// Cookie consent (GDPR compliance)
function initCookieConsent() {
    // Check if consent already given
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        return;
    }

    const cookieNotice = document.createElement('div');
    cookieNotice.className = 'cookie-notice';
    cookieNotice.innerHTML = `
        <div class="cookie-content">
            <p><strong>🍪 Pemberitahuan Cookie</strong></p>
            <p>Website ini menggunakan cookie untuk meningkatkan pengalaman pengguna Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie.</p>
            <div class="cookie-actions">
                <button id="acceptCookies" class="btn btn-primary">Terima</button>
                <button id="declineCookies" class="btn-text">Tolak</button>
            </div>
        </div>
    `;

    cookieNotice.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 1rem;
        z-index: 10000;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .cookie-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        .btn-text {
            background: none;
            border: none;
            color: #ffffff;
            text-decoration: underline;
            cursor: pointer;
            font-size: 0.9rem;
        }
        .btn-text:hover {
            color: white;
        }
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                text-align: center;
            }
            .cookie-actions {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(cookieNotice);

    // Show notice
    setTimeout(() => {
        cookieNotice.style.transform = 'translateY(0)';
    }, 1000);

    // Handle accept
    document.getElementById('acceptCookies').addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieNotice.style.transform = 'translateY(100%)';
        setTimeout(() => {
            document.body.removeChild(cookieNotice);
        }, 300);
    });

    // Handle decline
    document.getElementById('declineCookies').addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'declined');
        cookieNotice.style.transform = 'translateY(100%)';
        setTimeout(() => {
            document.body.removeChild(cookieNotice);
        }, 300);
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Small delay to ensure all elements are loaded
    setTimeout(() => {
        preloadCriticalResources();
        updateMetaDescription();
        initCookieConsent();
    }, 500);
});

// Error handling for failed resource loading
window.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG') {
        // Replace failed images with placeholder
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjYuNTY5IDE4Ni41NjkgMTgwIDE3MCAxODBDMTUzLjQzMSAxODAgMTQwIDE2Ni41NjkgMTQwIDE1MEMxNDAgMTMzLjQzMSAxNTMuNDMxIDEyMCAxNzAgMTIwQzE4Ni41NjkgMTIwIDIwMCAxMzMuNDMxIDIwMCAxNTBaIiBmaWxsPSIjZDFkNWRiIi8+CjxwYXRoIGQ9Ik0yNDAgMTgwSDEzMEwyMDAgMTEwTDI2MCAyMDBMMjQwIDE4MFoiIGZpbGw9IiNkMWQ1ZGIiLz4KPC9zdmc+';
        e.target.alt = 'Gambar tidak tersedia';
    }
}, true);

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function () {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;

        // Log performance data (in production, send to analytics)
        console.log('Page Load Time:', loadTime + 'ms');

        // Optimize based on load time
        if (loadTime > 3000) {
            // Page is loading slowly, implement optimizations
            console.warn('Page loading slowly. Consider optimizations.');
        }
    });

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would typically use a library like web-vitals
        // For now, we'll use basic performance API
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Performance metric:', entry.name, entry.value);
            }
        });

        observer.observe({ entryTypes: ['measure', 'paint', 'largest-contentful-paint'] });
    }
}

// Initialize performance monitoring
if (window.performance) {
    initPerformanceMonitoring();
}

// Final initialization call
console.log('🚀 Buat Website - Landing page loaded successfully!');