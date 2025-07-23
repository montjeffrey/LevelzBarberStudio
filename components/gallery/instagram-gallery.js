(function() {
    'use strict';

    // Wait for config to load, then use it or fall back to defaults
    const getConfig = () => {
        return window.LEVELZ_GALLERY_CONFIG || {
            instagram: { enabled: false, accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN', maxPhotos: 12 },
            manual: { enabled: false, posts: [] },
            fallback: { 
                enabled: true, 
                images: [
                    'images/image1.jpg', 'images/Levelz Cover.jpeg', 'images/levelz-cover1.jpeg',
                    'images/Julian-faceshot.jpeg', 'images/alex-faceshot.jpeg', 'images/anthony-faceshot.jpeg',
                    'images/jhon-mugshot.jpeg', 'images/Levelzproducts.jpg', 'images/Levelz-curl-cream.jpg',
                    'images/Levelz-hair-pomade.jpg', 'images/Levelz-volume-powder.jpg', 'images/Levelz-products cluster.jpg'
                ]
            },
            settings: { animationDelay: 100, clickToInstagram: true, showAttribution: true }
        };
    };

    class InstagramGallery {
        constructor() {
            this.config = getConfig();
            this.galleryContainer = document.querySelector('.gallery-masonry-grid');
            this.loadingIndicator = null;
            this.isLoading = false;
            this.init();
        }

        init() {
            if (!this.galleryContainer) {
                console.error('Gallery container not found');
                return;
            }
            
            this.createLoadingIndicator();
            
            // Determine which method to use based on configuration
            if (this.config.instagram.enabled && this.config.instagram.accessToken !== 'YOUR_INSTAGRAM_ACCESS_TOKEN') {
                this.loadInstagramPhotos();
            } else if (this.config.manual.enabled && this.config.manual.posts.length > 0) {
                this.loadManualPosts();
            } else {
                this.renderFallbackImages();
            }
        }

        createLoadingIndicator() {
            this.loadingIndicator = document.createElement('div');
            this.loadingIndicator.className = 'instagram-loading';
            this.loadingIndicator.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Loading latest photos from Instagram...</p>
            `;
            
            // Add loading styles
            const style = document.createElement('style');
            style.textContent = `
                .instagram-loading {
                    text-align: center;
                    padding: 2rem;
                    color: #666;
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
                }
                .instagram-gallery-item:hover {
                    transform: scale(1.02);
                    transition: transform 0.3s ease;
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
                    font-size: 1.2rem;
                }
                .instagram-gallery-item:hover .overlay {
                    opacity: 1;
                }
                .instagram-error {
                    background: #ffe6e6;
                    border: 1px solid #ffcccc;
                    color: #cc0000;
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                    margin: 1rem 0;
                }
            `;
            document.head.appendChild(style);
        }

        async loadInstagramPhotos() {
            this.isLoading = true;
            this.showLoading();

            try {
                // Attempt to load from Instagram API
                const photos = await this.fetchInstagramPhotos();
                if (photos && photos.length > 0) {
                    this.renderPhotos(photos);
                } else {
                    throw new Error('No photos returned from Instagram API');
                }
            } catch (error) {
                console.warn('Instagram API failed, using fallback images:', error);
                this.renderFallbackImages();
            } finally {
                this.hideLoading();
                this.isLoading = false;
            }
        }

        async fetchInstagramPhotos() {
            // Check if we have valid credentials
            if (!this.config.instagram.accessToken || this.config.instagram.accessToken === 'YOUR_INSTAGRAM_ACCESS_TOKEN') {
                throw new Error('Instagram access token not configured');
            }

            const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${this.config.instagram.accessToken}&limit=${this.config.instagram.maxPhotos}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Instagram API error: ${response.status}`);
            }

            const data = await response.json();
            
            // Filter for images only (exclude videos for now)
            return data.data
                .filter(item => item.media_type === 'IMAGE')
                .slice(0, this.config.instagram.maxPhotos)
                .map(item => ({
                    id: item.id,
                    url: item.media_url,
                    caption: item.caption || 'Levelz Barber Studio',
                    permalink: item.permalink
                }));
        }

        async loadManualPosts() {
            this.isLoading = true;
            this.showLoading();

            try {
                const validPosts = this.config.manual.posts.filter(url => 
                    url && !url.includes('EXAMPLE_POST') && url.includes('instagram.com')
                );
                
                if (validPosts.length === 0) {
                    throw new Error('No valid Instagram posts configured');
                }

                const photos = validPosts.slice(0, 12).map((url, index) => ({
                    id: `manual_${index}`,
                    url: this.config.fallback.images[index % this.config.fallback.images.length], // Use fallback images for now
                    caption: `Instagram Post ${index + 1}`,
                    permalink: url
                }));

                this.renderPhotos(photos);
            } catch (error) {
                console.warn('Manual posts failed, using fallback images:', error);
                this.renderFallbackImages();
            } finally {
                this.hideLoading();
                this.isLoading = false;
            }
        }

        renderPhotos(photos) {
            this.galleryContainer.innerHTML = '';
            
            photos.forEach((photo, index) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'instagram-gallery-item';
                
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.caption ? this.truncateCaption(photo.caption) : `Instagram photo ${index + 1}`;
                img.className = 'gallery-img';
                img.loading = 'lazy';
                
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = '<i>📷</i>';
                
                imgContainer.appendChild(img);
                imgContainer.appendChild(overlay);
                
                // Add click handler to open Instagram post
                imgContainer.addEventListener('click', () => {
                    if (photo.permalink) {
                        window.open(photo.permalink, '_blank', 'noopener');
                    }
                });

                this.galleryContainer.appendChild(imgContainer);
                
                // Trigger the fade-in animation
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 100);
            });

            // Add Instagram attribution
            this.addInstagramAttribution();
        }

        renderFallbackImages() {
            this.galleryContainer.innerHTML = '';
            
            this.config.fallback.images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Gallery ${index + 1}`;
                img.className = 'gallery-img';
                img.loading = 'lazy';
                
                this.galleryContainer.appendChild(img);
                
                // Trigger the fade-in animation
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * (this.config.settings.animationDelay || 100));
            });

            // Show fallback message
            if (this.config.settings.showAttribution) {
                this.showFallbackMessage();
            }
        }

        addInstagramAttribution() {
            const attribution = document.createElement('div');
            attribution.className = 'instagram-attribution';
            attribution.innerHTML = `
                <p style="text-align: center; color: #666; margin-top: 1rem; font-size: 0.9rem;">
                    📸 Latest photos from our 
                    <a href="https://instagram.com/levelzbarberstudio" target="_blank" style="color: var(--accent-color);">
                        Instagram @levelzbarberstudio
                    </a>
                </p>
            `;
            this.galleryContainer.parentNode.insertBefore(attribution, this.galleryContainer.nextSibling);
        }

        showFallbackMessage() {
            const message = document.createElement('div');
            message.className = 'instagram-fallback-message';
            message.innerHTML = `
                <p style="text-align: center; color: #666; margin-top: 1rem; font-size: 0.9rem;">
                    Gallery showcasing our work. Follow us on 
                    <a href="https://instagram.com/levelzbarberstudio" target="_blank" style="color: var(--accent-color);">
                        Instagram @levelzbarberstudio
                    </a> 
                    for the latest updates!
                </p>
            `;
            this.galleryContainer.parentNode.insertBefore(message, this.galleryContainer.nextSibling);
        }

        showLoading() {
            this.galleryContainer.innerHTML = '';
            this.galleryContainer.appendChild(this.loadingIndicator);
        }

        hideLoading() {
            if (this.loadingIndicator && this.loadingIndicator.parentNode) {
                this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
            }
        }

        truncateCaption(caption) {
            if (caption.length <= 100) return caption;
            return caption.substring(0, 100) + '...';
        }

        // Method to refresh gallery (can be called from outside)
        refresh() {
            if (!this.isLoading) {
                this.loadInstagramPhotos();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.instagramGallery = new InstagramGallery();
        });
    } else {
        window.instagramGallery = new InstagramGallery();
    }

})();
