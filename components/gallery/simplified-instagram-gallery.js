// Enhanced Instagram Gallery - Free Scraper Only
// Simplified version using only the free Instagram scraper with fallbacks

(function() {
    // Get configuration with fallback defaults
    const getConfig = () => {
        if (window.LEVELZ_GALLERY_CONFIG) {
            return window.LEVELZ_GALLERY_CONFIG;
        }
        
        // Fallback configuration
        return {
            scraper: { enabled: true, username: 'levelzbarberstudio', maxPhotos: 12, refreshInterval: 1800000 },
            manual: { enabled: false, posts: [] },
            fallback: { 
                enabled: true, 
                images: [
                    'images/image1.jpg', 'images/levelz-cover1.jpeg', 'images/Levelz Cover.jpeg',
                    'images/alex-faceshot.jpeg', 'images/anthony-faceshot.jpeg', 'images/Julian-faceshot.jpeg',
                    'images/jhon-mugshot.jpeg', 'images/Levelz-curl-cream.jpg', 'images/Levelzproducts.jpg',
                    'images/Levelz-hair-pomade.jpg', 'images/Levelz-volume-powder.jpg', 'images/Levelz-products cluster.jpg'
                ]
            },
            settings: { animationDelay: 100, clickToInstagram: true, showAttribution: true }
        };
    };

    class SimplifiedInstagramGallery {
        constructor() {
            this.config = getConfig();
            this.galleryContainer = document.querySelector('.gallery-masonry-grid');
            this.instagramScraper = null;
            this.loadingIndicator = null;
            this.isLoading = false;
            this.lastUpdate = null;
            this.init();
        }

        init() {
            if (!this.galleryContainer) {
                console.error('Gallery container not found');
                return;
            }
            
            this.createLoadingIndicator();
            this.initializeGallery();
        }

        // Initialize gallery with priority system
        async initializeGallery() {
            const config = this.config;
            
            // Priority order: Free Scraper > Manual URLs > Demo Images
            if (config.scraper.enabled) {
                try {
                    console.log('🚀 Initializing free Instagram scraper...');
                    this.instagramScraper = new window.InstagramFeedScraper(config.scraper.username);
                    await this.loadScrapedPhotos();
                    this.setupScraperRefresh();
                } catch (error) {
                    console.error('Instagram scraper failed:', error);
                    this.fallbackToNext();
                }
            } else if (config.manual.enabled && config.manual.posts.length > 0) {
                console.log('📋 Using manual Instagram URLs...');
                this.loadManualInstagramPhotos();
            } else if (config.fallback.enabled) {
                console.log('🖼️ Using demo images...');
                this.loadDemoImages();
            } else {
                console.warn('No gallery configuration enabled');
                this.showError('Gallery not configured');
            }
        }

        // Load photos from Instagram scraper
        async loadScrapedPhotos() {
            try {
                this.showLoading('Loading latest Instagram photos...');
                const photos = await this.instagramScraper.getInstagramPhotos(this.config.scraper.maxPhotos);
                
                if (photos && photos.length > 0) {
                    this.displayPhotos(photos, 'scraped');
                    this.lastUpdate = new Date();
                    console.log(`✅ Loaded ${photos.length} photos from Instagram scraper`);
                } else {
                    console.log('⚠️ Instagram scraper returned no photos, falling back to next option');
                    this.hideLoading();
                    this.fallbackToNext();
                    return;
                }
                
            } catch (error) {
                console.error('Failed to load scraped Instagram photos:', error);
                console.log('🔄 Falling back to next gallery option...');
                this.hideLoading();
                this.fallbackToNext();
                return;
            } finally {
                this.hideLoading();
            }
        }

        // Load photos from manual Instagram URLs
        async loadManualInstagramPhotos() {
            try {
                this.showLoading('Loading Instagram photos...');
                const posts = this.config.manual.posts.filter(url => url && !url.includes('EXAMPLE'));
                
                if (posts.length === 0) {
                    throw new Error('No valid Instagram URLs configured');
                }

                const photos = posts.map((url, index) => ({
                    id: `manual-${index}`,
                    type: 'image',
                    url: this.getInstagramImageUrl(url),
                    thumbnail: this.getInstagramImageUrl(url),
                    link: url,
                    caption: `Instagram post from Levelz Barber Studio`,
                    alt: `Levelz Barber Studio Instagram post ${index + 1}`
                }));

                this.displayPhotos(photos, 'manual-instagram');
                console.log(`✅ Loaded ${photos.length} manual Instagram photos`);
                
            } catch (error) {
                console.error('Failed to load manual Instagram photos:', error);
                this.showError(`Manual Instagram Error: ${error.message}`);
                setTimeout(() => this.fallbackToNext(), 2000);
            } finally {
                this.hideLoading();
            }
        }

        // Load demo/fallback images
        loadDemoImages() {
            try {
                this.showLoading('Loading gallery...');
                const images = this.config.fallback.images;
                
                const photos = images.map((src, index) => ({
                    id: `demo-${index}`,
                    type: 'image',
                    url: src,
                    thumbnail: src,
                    link: this.config.settings.clickToInstagram ? 'https://instagram.com/levelzbarberstudio' : null,
                    caption: `Levelz Barber Studio - Professional barber services`,
                    alt: `Levelz Barber Studio gallery image ${index + 1}`
                }));

                this.displayPhotos(photos, 'demo');
                console.log(`✅ Loaded ${photos.length} demo images`);
                
                if (this.config.settings.showAttribution) {
                    this.showAttribution();
                }
                
            } catch (error) {
                console.error('Failed to load demo images:', error);
                this.showError('Gallery failed to load');
            } finally {
                this.hideLoading();
            }
        }

        // Display photos in the gallery
        displayPhotos(photos, source) {
            this.galleryContainer.innerHTML = '';
            
            photos.forEach((photo, index) => {
                const photoElement = this.createPhotoElement(photo, index, source);
                this.galleryContainer.appendChild(photoElement);
            });

            // Trigger animations
            if (this.config.settings.animationDelay > 0) {
                this.animatePhotos();
            }
        }

        // Create individual photo element
        createPhotoElement(photo, index, source) {
            const div = document.createElement('div');
            div.className = `gallery-img instagram-gallery-item ${source}-item`;
            div.style.opacity = '0';
            div.style.transform = 'translateY(20px)';
            
            const img = document.createElement('img');
            img.src = photo.thumbnail || photo.url;
            img.alt = photo.alt || photo.caption || 'Levelz Barber Studio';
            img.loading = 'lazy';
            
            // Add click handler
            if (photo.link) {
                div.style.cursor = 'pointer';
                div.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(photo.link, '_blank', 'noopener,noreferrer');
                });
                
                // Add hover overlay for Instagram posts
                if (source !== 'demo') {
                    const overlay = document.createElement('div');
                    overlay.className = 'overlay';
                    overlay.innerHTML = '📸 View on Instagram';
                    div.appendChild(overlay);
                }
            }
            
            div.appendChild(img);
            return div;
        }

        // Animate photos on load
        animatePhotos() {
            const photos = this.galleryContainer.querySelectorAll('.gallery-img');
            photos.forEach((photo, index) => {
                setTimeout(() => {
                    photo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    photo.style.opacity = '1';
                    photo.style.transform = 'translateY(0)';
                }, index * this.config.settings.animationDelay);
            });
        }

        // Setup automatic refresh for Instagram scraper
        setupScraperRefresh() {
            const refreshInterval = this.config.scraper.refreshInterval || 1800000; // Default 30 minutes
            
            setInterval(async () => {
                try {
                    console.log('🔄 Auto-refreshing Instagram scraper photos...');
                    await this.loadScrapedPhotos();
                } catch (error) {
                    console.error('Scraper auto-refresh failed:', error);
                }
            }, refreshInterval);
            
            console.log(`✅ Instagram scraper auto-refresh enabled (every ${refreshInterval/60000} minutes)`);
        }

        // Fallback to next available option
        fallbackToNext() {
            const config = this.config;
            
            if (config.manual.enabled && config.manual.posts.length > 0 && 
                !this.galleryContainer.querySelector('.manual-instagram-item')) {
                console.log('🔄 Falling back to manual Instagram URLs...');
                this.loadManualInstagramPhotos();
            } else if (config.fallback.enabled && 
                       !this.galleryContainer.querySelector('.demo-item')) {
                console.log('🔄 Falling back to demo images...');
                this.loadDemoImages();
            } else {
                this.showError('All gallery options failed');
            }
        }

        // Utility: Convert Instagram post URL to image URL
        getInstagramImageUrl(postUrl) {
            // Try to extract post ID and use oEmbed API for better image quality
            const match = postUrl.match(/\/p\/([A-Za-z0-9_-]+)/);
            if (match) {
                // For now, use a placeholder that works with Instagram's structure
                return `https://instagram.com/p/${match[1]}/media/?size=m`;
            }
            return postUrl;
        }

        // Show loading indicator
        showLoading(message = 'Loading...') {
            if (!this.loadingIndicator) {
                this.createLoadingIndicator();
            }
            
            this.loadingIndicator.querySelector('p').textContent = message;
            this.galleryContainer.innerHTML = '';
            this.galleryContainer.appendChild(this.loadingIndicator);
            this.isLoading = true;
        }

        // Hide loading indicator
        hideLoading() {
            if (this.loadingIndicator && this.loadingIndicator.parentNode) {
                this.loadingIndicator.remove();
            }
            this.isLoading = false;
        }

        // Show error message
        showError(message) {
            this.galleryContainer.innerHTML = `
                <div class="instagram-error">
                    <h3>⚠️ Gallery Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-button">
                        🔄 Retry
                    </button>
                </div>
            `;
        }

        // Show attribution for demo images
        showAttribution() {
            const attribution = document.createElement('div');
            attribution.className = 'instagram-attribution';
            attribution.innerHTML = `
                <p>
                    📸 <a href="https://instagram.com/levelzbarberstudio" target="_blank" rel="noopener">
                        Follow @levelzbarberstudio on Instagram
                    </a> for our latest work!
                </p>
            `;
            this.galleryContainer.appendChild(attribution);
        }

        // Create loading indicator
        createLoadingIndicator() {
            this.loadingIndicator = document.createElement('div');
            this.loadingIndicator.className = 'instagram-loading';
            this.loadingIndicator.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Loading...</p>
            `;
            
            this.addStyles();
        }

        // Add necessary styles
        addStyles() {
            if (document.getElementById('simplified-gallery-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'simplified-gallery-styles';
            style.textContent = `
                .instagram-loading {
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                    grid-column: 1 / -1;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--accent-color, #00bfff);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .instagram-gallery-item {
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    border-radius: 15px;
                    transition: transform 0.3s ease;
                }
                
                .instagram-gallery-item:hover {
                    transform: scale(1.02);
                }
                
                .instagram-gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                
                .instagram-gallery-item .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: bold;
                    border-radius: 15px;
                }
                
                .instagram-gallery-item:hover .overlay {
                    opacity: 1;
                }
                
                .instagram-error {
                    background: linear-gradient(135deg, #ffe6e6, #ffcccc);
                    border: 2px solid #ff9999;
                    color: #cc0000;
                    padding: 2rem;
                    border-radius: 15px;
                    text-align: center;
                    margin: 1rem;
                    grid-column: 1 / -1;
                }
                
                .instagram-error h3 {
                    margin-top: 0;
                    color: #990000;
                }
                
                .retry-button {
                    background: var(--accent-color, #00bfff);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 1rem;
                }
                
                .instagram-attribution {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 1rem;
                    background: rgba(0, 191, 255, 0.1);
                    border-radius: 10px;
                    margin-top: 1rem;
                }
                
                .instagram-attribution a {
                    color: var(--accent-color, #00bfff);
                    text-decoration: none;
                    font-weight: bold;
                }
                
                .instagram-attribution a:hover {
                    text-decoration: underline;
                }
            `;
            document.head.appendChild(style);
        }

        // Public method to manually refresh
        async refresh() {
            console.log('🔄 Manual refresh triggered...');
            await this.initializeGallery();
        }

        // Get current status
        getStatus() {
            return {
                isLoading: this.isLoading,
                lastUpdate: this.lastUpdate,
                hasScraper: !!this.instagramScraper,
                source: this.galleryContainer.querySelector('.scraped-item') ? 'scraped' :
                       this.galleryContainer.querySelector('.manual-instagram-item') ? 'manual-instagram' :
                       this.galleryContainer.querySelector('.demo-item') ? 'demo' : 'unknown'
            };
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.instagramGallery = new SimplifiedInstagramGallery();
        });
    } else {
        window.instagramGallery = new SimplifiedInstagramGallery();
    }

})();
