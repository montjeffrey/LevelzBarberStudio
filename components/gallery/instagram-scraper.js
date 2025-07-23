// Instagram Feed Scraper - Free Alternative to SnapWidget
// Uses Instagram's public endpoints to fetch photos without API restrictions

class InstagramFeedScraper {
    constructor(username) {
        this.username = username;
        this.cache = new Map();
        this.cacheExpiry = 1800000; // 30 minutes cache
        this.maxRetries = 3;
    }

    // Main method to get Instagram photos
    async getInstagramPhotos(limit = 12) {
        const cacheKey = `photos_${this.username}_${limit}`;
        
        // Check cache first
        if (this.isCacheValid(cacheKey)) {
            console.log('📦 Using cached Instagram data');
            return this.getCachedData(cacheKey);
        }

        try {
            console.log(`🔄 Fetching Instagram photos for @${this.username}...`);
            
            const photos = await this.scrapeInstagramPhotos(limit);
            
            if (photos && photos.length > 0) {
                this.setCachedData(cacheKey, photos);
                console.log(`✅ Found ${photos.length} Instagram photos`);
                return photos;
            } else {
                throw new Error('No photos found');
            }

        } catch (error) {
            console.error('Instagram scraping failed:', error);
            
            // Return cached data if available, even if expired
            const cachedData = this.getCachedData(cacheKey);
            if (cachedData) {
                console.log('⚠️ Using expired cache due to scraping error');
                return cachedData;
            }
            
            throw error;
        }
    }

    // Scrape Instagram photos using multiple methods
    async scrapeInstagramPhotos(limit) {
        const methods = [
            () => this.scrapeFromPublicProfile(limit),
            () => this.scrapeFromPublicAPI(limit),
            () => this.scrapeFromRSSFeed(limit)
        ];

        for (let i = 0; i < methods.length; i++) {
            try {
                const photos = await methods[i]();
                if (photos && photos.length > 0) {
                    return photos;
                }
            } catch (error) {
                console.warn(`Method ${i + 1} failed:`, error.message);
                if (i === methods.length - 1) {
                    throw error;
                }
            }
        }

        throw new Error('All scraping methods failed');
    }

    // Method 1: Scrape from public Instagram profile
    async scrapeFromPublicProfile(limit) {
        try {
            // Use CORS proxy to fetch Instagram profile
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const instagramUrl = `https://www.instagram.com/${this.username}/`;
            
            const response = await fetch(proxyUrl + encodeURIComponent(instagramUrl), {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();
            return this.parseInstagramHTML(html, limit);

        } catch (error) {
            throw new Error(`Public profile scraping failed: ${error.message}`);
        }
    }

    // Method 2: Try Instagram's public API endpoints
    async scrapeFromPublicAPI(limit) {
        try {
            // Try Instagram's legacy public endpoints
            const endpoints = [
                `https://www.instagram.com/api/v1/users/web_profile_info/?username=${this.username}`,
                `https://i.instagram.com/api/v1/users/${this.username}/info/`
            ];

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const photos = this.parseAPIResponse(data, limit);
                        if (photos.length > 0) {
                            return photos;
                        }
                    }
                } catch (e) {
                    continue;
                }
            }

            throw new Error('No working API endpoints');

        } catch (error) {
            throw new Error(`Public API scraping failed: ${error.message}`);
        }
    }

    // Method 3: RSS/Feed approach (if available)
    async scrapeFromRSSFeed(limit) {
        try {
            // Some third-party services provide Instagram RSS feeds
            const rssServices = [
                `https://rss.app/feeds/${this.username}.xml`,
                `https://rsshub.app/instagram/user/${this.username}`
            ];

            for (const rssUrl of rssServices) {
                try {
                    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
                    if (response.ok) {
                        const data = await response.json();
                        const photos = this.parseRSSFeed(data.contents, limit);
                        if (photos.length > 0) {
                            return photos;
                        }
                    }
                } catch (e) {
                    continue;
                }
            }

            throw new Error('No working RSS feeds');

        } catch (error) {
            throw new Error(`RSS feed scraping failed: ${error.message}`);
        }
    }

    // Parse Instagram HTML to extract photo data
    parseInstagramHTML(html, limit) {
        try {
            // Look for JSON data in script tags
            const scriptRegex = /window\._sharedData\s*=\s*({.+?});/;
            const match = html.match(scriptRegex);
            
            if (match) {
                const data = JSON.parse(match[1]);
                const user = data.entry_data?.ProfilePage?.[0]?.graphql?.user;
                
                if (user && user.edge_owner_to_timeline_media) {
                    return this.processInstagramMedia(user.edge_owner_to_timeline_media.edges, limit);
                }
            }

            // Fallback: try to find media URLs in HTML
            return this.extractMediaFromHTML(html, limit);

        } catch (error) {
            throw new Error(`HTML parsing failed: ${error.message}`);
        }
    }

    // Parse API response data
    parseAPIResponse(data, limit) {
        try {
            let media = null;

            // Try different possible data structures
            if (data.data?.user?.edge_owner_to_timeline_media) {
                media = data.data.user.edge_owner_to_timeline_media.edges;
            } else if (data.user?.edge_owner_to_timeline_media) {
                media = data.user.edge_owner_to_timeline_media.edges;
            } else if (data.items) {
                media = data.items;
            }

            if (media) {
                return this.processInstagramMedia(media, limit);
            }

            return [];

        } catch (error) {
            throw new Error(`API response parsing failed: ${error.message}`);
        }
    }

    // Parse RSS feed data
    parseRSSFeed(rssContent, limit) {
        try {
            // Simple RSS parsing for Instagram feeds
            const parser = new DOMParser();
            const doc = parser.parseFromString(rssContent, 'text/xml');
            const items = doc.querySelectorAll('item');
            
            const photos = [];
            for (let i = 0; i < Math.min(items.length, limit); i++) {
                const item = items[i];
                const title = item.querySelector('title')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const description = item.querySelector('description')?.textContent || '';
                
                // Extract image URL from description
                const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
                if (imgMatch) {
                    photos.push({
                        id: `rss-${i}`,
                        type: 'image',
                        url: imgMatch[1],
                        thumbnail: imgMatch[1],
                        link: link,
                        caption: title,
                        alt: `Instagram post: ${title}`,
                        timestamp: Date.now() - (i * 3600000) // Rough timestamp
                    });
                }
            }

            return photos;

        } catch (error) {
            throw new Error(`RSS parsing failed: ${error.message}`);
        }
    }

    // Process Instagram media data into our format
    processInstagramMedia(mediaArray, limit) {
        if (!Array.isArray(mediaArray)) return [];

        return mediaArray
            .slice(0, limit)
            .map((item, index) => {
                const node = item.node || item;
                
                return {
                    id: node.id || `scraped-${index}`,
                    type: node.is_video ? 'video' : 'image',
                    url: node.display_url || node.media_url || node.src,
                    thumbnail: node.thumbnail_src || node.display_url || node.media_url,
                    link: `https://www.instagram.com/p/${node.shortcode || ''}`,
                    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || 
                            node.caption || 
                            `Instagram post from @${this.username}`,
                    alt: this.generateAltText(node.edge_media_to_caption?.edges?.[0]?.node?.text || ''),
                    timestamp: node.taken_at_timestamp ? node.taken_at_timestamp * 1000 : Date.now(),
                    likes: node.edge_liked_by?.count || 0,
                    comments: node.edge_media_to_comment?.count || 0
                };
            })
            .filter(photo => photo.url);
    }

    // Extract media URLs directly from HTML as fallback
    extractMediaFromHTML(html, limit) {
        const photos = [];
        const imgRegex = /<img[^>]+src="([^"]*instagram[^"]*)"[^>]*>/gi;
        let match;
        let count = 0;

        while ((match = imgRegex.exec(html)) && count < limit) {
            const url = match[1];
            if (url.includes('instagram') && !url.includes('profile')) {
                photos.push({
                    id: `html-${count}`,
                    type: 'image',
                    url: url,
                    thumbnail: url,
                    link: `https://www.instagram.com/${this.username}/`,
                    caption: `Instagram post from @${this.username}`,
                    alt: `Instagram post ${count + 1} from ${this.username}`,
                    timestamp: Date.now() - (count * 3600000)
                });
                count++;
            }
        }

        return photos;
    }

    // Generate alt text for accessibility
    generateAltText(caption) {
        if (!caption) return `Instagram post from @${this.username}`;
        
        const cleaned = caption
            .replace(/#\w+/g, '')
            .replace(/@\w+/g, '')
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 100);
            
        return cleaned || `Instagram post from @${this.username}`;
    }

    // Cache management methods
    isCacheValid(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;
        return (Date.now() - cached.timestamp) < this.cacheExpiry;
    }

    getCachedData(key) {
        const cached = this.cache.get(key);
        return cached ? cached.data : null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Instagram scraper cache cleared');
    }

    // Test connection
    async testConnection() {
        try {
            const photos = await this.getInstagramPhotos(1);
            return {
                success: true,
                photoCount: photos.length,
                samplePhoto: photos[0] || null,
                message: `✅ Instagram scraper connected! Found ${photos.length} photos.`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `❌ Instagram scraper failed: ${error.message}`
            };
        }
    }
}

// Export for use in other files
window.InstagramFeedScraper = InstagramFeedScraper;
