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
    var heroTitles = document.querySelectorAll('.hero-title-fade');
    var heroButtons = document.querySelectorAll('.hero-btn-fade');
    
    if(heroLogo) {
        setTimeout(function() {
            heroLogo.style.transition = 'opacity 1.5s cubic-bezier(.4,0,.2,1)';
            heroLogo.style.opacity = 1;
        }, 200);
    }
    
    if(heroText) {
        setTimeout(function() {
            heroText.style.transition = 'opacity 1.5s cubic-bezier(.4,0,.2,1), transform 1.5s cubic-bezier(.4,0,.2,1)';
            heroText.style.opacity = 1;
            heroText.style.transform = 'translateX(0)';
        }, 800);
    }
    
    heroTitles.forEach(function(title, index) {
        setTimeout(function() {
            title.classList.add('visible');
        }, 600 + (index * 200));
    });

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

    function triggerBooksyWidget() {
        var booksyBtn = document.querySelector('.booksy-widget__button, .booksy-widget-button, button[data-booksy-widget]');
        if (booksyBtn) {
            booksyBtn.click();
        } else {
            alert('The booking button is not loaded yet. Please try again in a moment.');
        }
    }
    ['nav-book-placeholder','hero-book-now','services-book-now','gallery-book-now','barbers-book-now','services-book-btn'].forEach(function(id){
        var el = document.getElementById(id);
        if(el){
            el.addEventListener('click', triggerBooksyWidget);
        }
    });

    // Hero header/subheader scroll transition
    var hero = document.querySelector('.hero');
    var logoHeader = document.querySelector('.hero-logo-header');
    var subheadline = document.querySelector('.hero-subheadline');
    function handleHeroScroll() {
        if (!hero || !logoHeader || !subheadline) return;
        var rect = hero.getBoundingClientRect();
        var trigger = window.innerHeight * 0.6;
        if (rect.bottom < trigger) {
            logoHeader.classList.add('scrolled');
            subheadline.classList.add('scrolled');
        } else {
            logoHeader.classList.remove('scrolled');
            subheadline.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeroScroll);
    handleHeroScroll();

    var heroSubheadline = document.querySelector('.hero-subheadline');
    if(heroSubheadline) {
        setTimeout(function() {
            heroSubheadline.classList.add('visible');
        }, 400);
    }

    // Back to Top Button
    var backToTopBtn = document.getElementById('backToTopBtn');
    function handleBackToTopVisibility() {
        if (!backToTopBtn || !hero) return;
        var heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleBackToTopVisibility);
    handleBackToTopVisibility();
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


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
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
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

// Combined Rating Animation
function animateCombinedRating() {
    const ratingTarget = 4.95;
    const reviewTarget = 360;
    const ratingElem = document.getElementById('combined-rating-value');
    const countElem = document.getElementById('combined-rating-count');
    const stars = document.querySelectorAll('#combined-rating-stars .star');
    // Animation timing (slowed down for smoothness)
    const starDelay = 260;
    const starAnimTime = 900;
    const totalStarTime = (stars.length - 1) * starDelay + starAnimTime;
    const ratingAnimTime = totalStarTime + 300;
    // --- Custom rating count up logic ---
    let rating = 0;
    let reviews = 0;
    let ratingProgress = 0;
    let reviewProgress = 0;
    // Step 1: Count up in whole numbers to 4
    let currentInt = 0;
    const intStepTime = Math.floor(ratingAnimTime * 0.45 / 4); // 45% of time for 1-4
    function countToFour() {
        if (currentInt < 4) {
            currentInt++;
            ratingElem.textContent = currentInt;
            setTimeout(countToFour, intStepTime);
        } else {
            // Step 2: Pause, then animate to 4.9
            setTimeout(() => {
                let decimal = 4.0;
                const to49Steps = 8;
                const to49StepTime = Math.floor(ratingAnimTime * 0.25 / to49Steps); // 25% of time for 4.0 to 4.9
                function countTo49() {
                    if (decimal < 4.9) {
                        decimal += 0.1;
                        if (decimal > 4.9) decimal = 4.9;
                        ratingElem.textContent = decimal.toFixed(1);
                        setTimeout(countTo49, to49StepTime);
                    } else {
                        // Step 3: Pause, then animate to 4.95
                        setTimeout(() => {
                            let last = 4.90;
                            const to495Steps = 5;
                            const to495StepTime = Math.floor(ratingAnimTime * 0.3 / to495Steps); // 30% of time for 4.90 to 4.95
                            function countTo495() {
                                if (last < 4.95) {
                                    last += 0.01;
                                    if (last > 4.95) last = 4.95;
                                    ratingElem.textContent = last.toFixed(2);
                                    setTimeout(countTo495, to495StepTime);
                                } else {
                                    ratingElem.textContent = '4.95';
                                }
                            }
                            countTo495();
                        }, 180);
                    }
                }
                countTo49();
            }, 180);
        }
    }
    countToFour();
    // Animate review count up as before
    let reviewsStep = Math.ceil(reviewTarget / (ratingAnimTime / 18));
    let reviewsCount = 0;
    let reviewInterval = setInterval(() => {
        reviewsCount += reviewsStep;
        if (reviewsCount >= reviewTarget) {
            reviewsCount = reviewTarget;
            clearInterval(reviewInterval);
        }
        countElem.textContent = reviewsCount;
    }, 18);
    // Animate stars with pass-and-settle effect, smooth stagger, and glow as they settle
    stars.forEach((star, i) => {
        setTimeout(() => {
            star.classList.add('settle');
            setTimeout(() => {
                star.classList.add('lit'); // turn on the star at 300ms (earlier in the animation)
            }, 300);
            setTimeout(() => star.classList.remove('settle'), starAnimTime);
        }, 400 + i * starDelay);
    });
}

// Trigger animation when section enters viewport
function setupCombinedRatingAnimation() {
    const section = document.getElementById('reviews');
    let animated = false;
    if (!section) return;
    const observer = new window.IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated) {
                animateCombinedRating();
                animated = true;
            }
        });
    }, { threshold: 0.4 });
    observer.observe(section);
}

window.addEventListener('DOMContentLoaded', function() {
    setupCombinedRatingAnimation();
});

// --------------------- Analytics Injection ---------------------
function injectSeoAnalytics() {
    if (window.ENABLE_ANALYTICS !== 'true') return;

    if (window.GA_MEASUREMENT_ID) {
        var gaTag = document.createElement('script');
        gaTag.async = true;
        gaTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_MEASUREMENT_ID;
        document.head.appendChild(gaTag);

        var inline = document.createElement('script');
        inline.text =
            "window.dataLayer = window.dataLayer || [];" +
            "\nfunction gtag(){dataLayer.push(arguments);}" +
            "\ngtag('js', new Date());" +
            "\ngtag('config', '" + window.GA_MEASUREMENT_ID + "');";
        document.head.appendChild(inline);
    }

    if (window.GSC_VERIFICATION) {
        var gscMeta = document.createElement('meta');
        gscMeta.name = 'google-site-verification';
        gscMeta.content = window.GSC_VERIFICATION;
        document.head.appendChild(gscMeta);
    }
}

// --------------------- FAQ Analytics Hooks ---------------------
function trackAnalyticsEvent(name, meta) {
    if (!window.analyticsEvents) {
        window.analyticsEvents = [];
    }
    window.analyticsEvents.push({ name: name, meta: meta || {}, ts: Date.now() });
}

function setupFaqInstrumentation() {
    document.querySelectorAll('[data-analytics="faq-question"]').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = q.closest('[data-analytics="faq-item"]') || q;
            var opened = item.classList.toggle('open');
            trackAnalyticsEvent(opened ? 'faq-open' : 'faq-close', { id: item.id });
        });
    });
}

window.addEventListener('DOMContentLoaded', injectSeoAnalytics);
window.addEventListener('DOMContentLoaded', setupFaqInstrumentation);

// Gallery Video Functionality
window.addEventListener('DOMContentLoaded', function() {
    const galleryVideos = document.querySelectorAll('.gallery-video');
    
    galleryVideos.forEach(function(videoContainer) {
        const video = videoContainer.querySelector('video');
        const overlay = videoContainer.querySelector('.video-overlay');
        
        if (video && overlay) {
            // Click to play/pause video
            videoContainer.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (video.paused) {
                    // Pause all other videos first
                    galleryVideos.forEach(function(otherContainer) {
                        const otherVideo = otherContainer.querySelector('video');
                        if (otherVideo && !otherVideo.paused) {
                            otherVideo.pause();
                            otherContainer.querySelector('.video-overlay').style.opacity = '1';
                        }
                    });
                    
                    // Play this video
                    video.play();
                    overlay.style.opacity = '0';
                } else {
                    video.pause();
                    overlay.style.opacity = '1';
                }
            });
            
            // Reset overlay when video ends
            video.addEventListener('ended', function() {
                overlay.style.opacity = '1';
            });
            
            // Handle video loading
            video.addEventListener('loadstart', function() {
                overlay.style.opacity = '1';
            });
        }
    });
});

// Auto-play videos when they scroll into view
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.5
});

videos.forEach(video => videoObserver.observe(video));

// Gallery Modal Functionality
let currentImageIndex = 0;
let galleryItems = [];

document.addEventListener('DOMContentLoaded', function() {
    // Collect all gallery items (both images and videos)
    const galleryElements = document.querySelectorAll('.gallery-img');
    galleryItems = Array.from(galleryElements).map(element => {
        if (element.classList.contains('gallery-video')) {
            const video = element.querySelector('video source');
            return {
                type: 'video',
                src: video.src,
                element: element
            };
        } else {
            const img = element.querySelector('img');
            return {
                type: 'image',
                src: img.src,
                alt: img.alt,
                element: element
            };
        }
    });
    
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalCounter = document.getElementById('modalCounter');
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.element.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openModal();
        });
    });
    
    function openModal() {
        modal.classList.add('show');
        updateModalContent();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeModal() {
        modal.classList.remove('show');
        // Pause video if it's playing
        modalVideo.pause();
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function preloadAdjacentItems() {
        // Preload next and previous items for smooth transitions
        const nextIndex = (currentImageIndex + 1) % galleryItems.length;
        const prevIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        
        // Create image objects to preload images (videos will load on demand)
        if (galleryItems[nextIndex] && galleryItems[nextIndex].type === 'image') {
            const nextImg = new Image();
            nextImg.src = galleryItems[nextIndex].src;
        }
        if (galleryItems[prevIndex] && galleryItems[prevIndex].type === 'image') {
            const prevImg = new Image();
            prevImg.src = galleryItems[prevIndex].src;
        }
    }
    
    function updateModalContent() {
        const currentItem = galleryItems[currentImageIndex];
        
        if (currentItem.type === 'image') {
            // Show image, hide video
            modalImage.src = currentItem.src;
            modalImage.alt = currentItem.alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            // Pause video if it was playing
            modalVideo.pause();
        } else if (currentItem.type === 'video') {
            // Show video, hide image
            modalVideo.querySelector('source').src = currentItem.src;
            modalVideo.load(); // Reload video with new source
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
        }
        
        modalCounter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
        preloadAdjacentItems();
    }
    
    function nextImage() {
        // Get current media element
        const currentMedia = modalImage.style.display !== 'none' ? modalImage : modalVideo;
        
        // Add transition class for slide effect
        currentMedia.classList.add('transitioning', 'slide-next');
        modalCounter.style.opacity = '0.5';
        
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            updateModalContent();
            
            // Get new media element and remove transition classes
            const newMedia = modalImage.style.display !== 'none' ? modalImage : modalVideo;
            newMedia.classList.remove('transitioning', 'slide-next');
            modalCounter.style.opacity = '1';
        }, 200); // Half of the CSS transition duration
    }
    
    function prevImage() {
        // Get current media element
        const currentMedia = modalImage.style.display !== 'none' ? modalImage : modalVideo;
        
        // Add transition class for slide effect
        currentMedia.classList.add('transitioning', 'slide-prev');
        modalCounter.style.opacity = '0.5';
        
        setTimeout(() => {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalContent();
            
            // Get new media element and remove transition classes
            const newMedia = modalImage.style.display !== 'none' ? modalImage : modalVideo;
            newMedia.classList.remove('transitioning', 'slide-prev');
            modalCounter.style.opacity = '1';
        }, 200); // Half of the CSS transition duration
    }
    
    // Event listeners
    modalClose.addEventListener('click', closeModal);
    modalNext.addEventListener('click', nextImage);
    modalPrev.addEventListener('click', prevImage);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
});
