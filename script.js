// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Hero Animation
window.addEventListener('DOMContentLoaded', function() {
    var heroLogo = document.querySelector('.hero-logo-fade');
    var heroText = document.querySelector('.hero-text-fade');
    var heroTitle = document.querySelector('.hero-title-fade');
    var heroButtons = document.querySelectorAll('.hero-btn-fade');
    
    if(heroLogo) {
        setTimeout(function() {
            heroLogo.style.transition = 'opacity 1.5s cubic-bezier(.4,0,.2,1), transform 1.5s cubic-bezier(.4,0,.2,1)';
            heroLogo.style.opacity = 1;
            heroLogo.style.transform = 'translateY(0)';
            // Fade in hero title after logo
            if(heroTitle) {
                setTimeout(function() {
                    heroTitle.classList.add('visible');
                }, 500);
            }
        }, 200);
    } else if(heroTitle) {
        // Fallback if no logo
        setTimeout(function() {
            heroTitle.classList.add('visible');
        }, 400);
    }
    
    if(heroText) {
        setTimeout(function() {
            heroText.style.transition = 'opacity 1.5s cubic-bezier(.4,0,.2,1), transform 1.5s cubic-bezier(.4,0,.2,1)';
            heroText.style.opacity = 1;
            heroText.style.transform = 'translateX(0)';
        }, 800);
    }
    
    heroButtons.forEach(function(button, index) {
        setTimeout(function() {
            button.classList.add('visible');
        }, 1200 + (index * 200));
    });

    // Fade in Booksy widget button when it appears
    function fadeInBooksyWidgetBtn() {
        var booksyBtn = document.querySelector('.booksy-widget__button, .booksy-widget-button, button[data-booksy-widget]');
        if (booksyBtn && !booksyBtn.classList.contains('visible')) {
            setTimeout(function() {
                booksyBtn.classList.add('visible');
            }, 1400);
        } else if (!booksyBtn) {
            // Try again in a bit if not yet rendered
            setTimeout(fadeInBooksyWidgetBtn, 200);
        }
    }
    fadeInBooksyWidgetBtn();

    // Booksy navbar placeholder triggers Booksy widget button in hero
    var navBookBtn = document.getElementById('nav-book-placeholder');
    if (navBookBtn) {
        navBookBtn.addEventListener('click', function() {
            var booksyBtn = document.querySelector('.booksy-widget__button, .booksy-widget-button, button[data-booksy-widget]');
            if (booksyBtn) {
                booksyBtn.click();
            } else {
                alert('The booking button is not loaded yet. Please try again in a moment.');
            }
        });
    }

    // Hero Book Now button triggers Booksy widget
    var heroBookBtn = document.getElementById('hero-book-now');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', function() {
            var booksyBtn = document.querySelector('.booksy-widget__button, .booksy-widget-button, button[data-booksy-widget]');
            if (booksyBtn) {
                booksyBtn.click();
            } else {
                alert('The booking button is not loaded yet. Please try again in a moment.');
            }
        });
    }
});

// Gallery Modal Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const galleryClose = document.querySelector('.gallery-close');

if (galleryItems.length > 0 && galleryModal) {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // In a real implementation, you would set the actual image source
            modalImage.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%23333" width="800" height="600"/><text x="400" y="300" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle">Gallery Image ${index + 1}</text></svg>`;
            galleryModal.style.display = 'block';
        });
    });

    if (galleryClose) {
        galleryClose.addEventListener('click', () => {
            galleryModal.style.display = 'none';
        });
    }

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '' || href == null) {
            // Do nothing for href="#" or empty
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = '#000';
        }
    }
});

// Animation on scroll (simple fade-in effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .team-card, .barber-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product image zoom modal functionality
window.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('product-modal');
    var modalImg = document.querySelector('.product-modal-img');
    var modalCaption = document.querySelector('.product-modal-caption');
    var modalClose = document.querySelector('.product-modal-close');
    var productImages = document.querySelectorAll('.product-image-zoom');

    productImages.forEach(function(imgDiv) {
        imgDiv.addEventListener('click', function() {
            var img = imgDiv.querySelector('img');
            var product = imgDiv.getAttribute('data-product');
            modal.classList.add('open');
            modalImg.src = img.src;
            modalCaption.textContent = img.alt;
        });
    });
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('open');
        });
    }
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
});

// Masonry gallery fade-in on scroll (tiled, staggered, reversible)
window.addEventListener('DOMContentLoaded', function() {
    var galleryImgs = document.querySelectorAll('.gallery-masonry-grid .gallery-img');
    if (galleryImgs.length) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var img = entry.target;
                if (entry.isIntersecting) {
                    // Staggered fade-in
                    setTimeout(function() {
                        img.classList.add('visible');
                    }, img.dataset.stagger || 0);
                } else {
                    img.classList.remove('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        // Assign stagger delays for tiled effect
        galleryImgs.forEach(function(img, i) {
            // 3 columns tiled pattern (adjust if needed)
            var col = i % 3;
            var row = Math.floor(i / 3);
            img.dataset.stagger = (col * 120 + row * 80).toString();
            observer.observe(img);
        });
    }
}); 