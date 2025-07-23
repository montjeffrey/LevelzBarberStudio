// Simple Instagram Gallery Alternative
// This version allows you to manually specify Instagram post URLs
// No API setup required - just update the URLs when you want new photos

(function() {
    'use strict';

    // Simple Configuration - Just add your Instagram post URLs here
    const SIMPLE_INSTAGRAM_CONFIG = {
        // Add your Instagram post URLs here (replace with actual URLs)
        instagramPosts: [
            'https://www.instagram.com/p/SAMPLE_POST_1/',
            'https://www.instagram.com/p/SAMPLE_POST_2/',
            'https://www.instagram.com/p/SAMPLE_POST_3/',
            'https://www.instagram.com/p/SAMPLE_POST_4/',
            'https://www.instagram.com/p/SAMPLE_POST_5/',
            'https://www.instagram.com/p/SAMPLE_POST_6/',
            // Add more URLs as needed
        ],
        fallbackImages: [
            'images/image1.jpg',
            'images/Levelz Cover.jpeg', 
            'images/levelz-cover1.jpeg',
            'images/Julian-faceshot.jpeg',
            'images/alex-faceshot.jpeg',
            'images/anthony-faceshot.jpeg',
            'images/jhon-mugshot.jpeg',
            'images/Levelzproducts.jpg',
            'images/Levelz-curl-cream.jpg',
            'images/Levelz-hair-pomade.jpg',
            'images/Levelz-volume-powder.jpg',
            'images/Levelz-products cluster.jpg'
        ]
    };

    class SimpleInstagramGallery {
        constructor() {
            this.galleryContainer = document.querySelector('.gallery-masonry-grid');
            this.init();
        }

        init() {
            if (!this.galleryContainer) return;
            
            // Check if we have Instagram post URLs configured
            const hasInstagramPosts = SIMPLE_INSTAGRAM_CONFIG.instagramPosts.some(
                url => url !== 'https://www.instagram.com/p/SAMPLE_POST_1/' && 
                       !url.includes('SAMPLE_POST')
            );

            if (hasInstagramPosts) {
                this.loadInstagramEmbeds();
            } else {
                this.loadFallbackImages();
            }
        }

        async loadInstagramEmbeds() {
            this.galleryContainer.innerHTML = '<div class="instagram-loading"><div class="loading-spinner"></div><p>Loading Instagram photos...</p></div>';

            try {
                const embedPromises = SIMPLE_INSTAGRAM_CONFIG.instagramPosts
                    .filter(url => !url.includes('SAMPLE_POST'))
                    .slice(0, 12)
                    .map(url => this.getInstagramEmbed(url));

                const embedData = await Promise.all(embedPromises);
                this.renderInstagramPhotos(embedData);
            } catch (error) {
                console.warn('Instagram embed failed, using fallback:', error);
                this.loadFallbackImages();
            }
        }

        async getInstagramEmbed(postUrl) {
            // Instagram oEmbed endpoint (no authentication required)
            const embedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=YOUR_APP_TOKEN`;
            
            try {
                const response = await fetch(embedUrl);
                if (!response.ok) throw new Error('Embed failed');
                return await response.json();
            } catch (error) {
                // Fallback: extract image from post URL pattern
                return {
                    media_id: postUrl.split('/p/')[1]?.split('/')[0] || 'unknown',
                    permalink: postUrl,
                    thumbnail_url: this.generateInstagramImageUrl(postUrl)
                };
            }
        }

        generateInstagramImageUrl(postUrl) {
            // This is a simplified approach - in production you'd want actual image URLs
            const postId = postUrl.split('/p/')[1]?.split('/')[0];
            return `https://instagram.com/p/${postId}/media/?size=m`;
        }

        renderInstagramPhotos(embedData) {
            this.galleryContainer.innerHTML = '';

            embedData.forEach((embed, index) => {
                const container = document.createElement('div');
                container.className = 'instagram-gallery-item';
                
                const img = document.createElement('img');
                img.src = embed.thumbnail_url || embed.media_url || SIMPLE_INSTAGRAM_CONFIG.fallbackImages[index % SIMPLE_INSTAGRAM_CONFIG.fallbackImages.length];
                img.alt = `Instagram post ${index + 1}`;
                img.className = 'gallery-img';
                img.loading = 'lazy';

                // Add error handling for images
                img.onerror = () => {
                    img.src = SIMPLE_INSTAGRAM_CONFIG.fallbackImages[index % SIMPLE_INSTAGRAM_CONFIG.fallbackImages.length];
                };

                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = '<span>📷 View on Instagram</span>';

                container.appendChild(img);
                container.appendChild(overlay);

                // Click to open Instagram post
                container.addEventListener('click', () => {
                    window.open(embed.permalink || SIMPLE_INSTAGRAM_CONFIG.instagramPosts[index], '_blank');
                });

                this.galleryContainer.appendChild(container);

                // Animate in
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 100);
            });

            this.addInstagramLink();
        }

        loadFallbackImages() {
            this.galleryContainer.innerHTML = '';
            
            SIMPLE_INSTAGRAM_CONFIG.fallbackImages.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Gallery ${index + 1}`;
                img.className = 'gallery-img';
                img.loading = 'lazy';
                
                this.galleryContainer.appendChild(img);
                
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 100);
            });

            this.addInstagramLink();
        }

        addInstagramLink() {
            // Remove existing attribution
            const existing = document.querySelector('.instagram-attribution');
            if (existing) existing.remove();

            const attribution = document.createElement('div');
            attribution.className = 'instagram-attribution';
            attribution.innerHTML = `
                <p style="text-align: center; color: #666; margin-top: 1rem; font-size: 0.9rem;">
                    📸 Follow us on 
                    <a href="https://instagram.com/levelzbarberstudio" target="_blank" style="color: var(--accent-color);">
                        Instagram @levelzbarberstudio
                    </a> 
                    for more photos and updates!
                </p>
            `;
            this.galleryContainer.parentNode.insertBefore(attribution, this.galleryContainer.nextSibling);
        }
    }

    // Export for manual activation if needed
    window.SimpleInstagramGallery = SimpleInstagramGallery;
    
    // Uncomment the line below to use this simple version instead of the full API version
    // window.simpleInstagramGallery = new SimpleInstagramGallery();

})();
