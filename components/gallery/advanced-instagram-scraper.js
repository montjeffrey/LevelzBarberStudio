// Advanced Instagram Feed Scraper - Multiple Methods for Real Photos
// Uses various techniques to get actual Instagram content

class AdvancedInstagramScraper {
    constructor(username) {
        this.username = username;
        this.cache = new Map();
        this.cacheExpiry = 1800000; // 30 minutes
        this.maxRetries = 3;
    }

    // Main method to get Instagram photos with advanced techniques
    async getInstagramPhotos(limit = 12) {
        const cacheKey = `advanced_photos_${this.username}_${limit}`;
        
        // Check cache first
        if (this.isCacheValid(cacheKey)) {
            console.log('📦 Using cached Instagram data');
            return this.getCachedData(cacheKey);
        }

        console.log(`🚀 Advanced scraping for @${this.username}...`);
        
        const methods = [
            { name: 'Direct Web Scraping', fn: () => this.directWebScraping(limit) },
            { name: 'Embedded Data Extraction', fn: () => this.embeddedDataExtraction(limit) },
            { name: 'JSON-LD Extraction', fn: () => this.jsonLdExtraction(limit) },
            { name: 'Meta Tags Extraction', fn: () => this.metaTagsExtraction(limit) },
            { name: 'Third-party Services', fn: () => this.thirdPartyServices(limit) }
        ];

        for (const method of methods) {
            try {
                console.log(`🔄 Trying: ${method.name}`);
                const photos = await method.fn();
                
                if (photos && photos.length > 0) {
                    console.log(`✅ Success with ${method.name}: ${photos.length} photos found`);
                    this.setCachedData(cacheKey, photos);
                    return photos;
                }
                console.log(`⚠️ ${method.name} found no photos`);
            } catch (error) {
                console.log(`❌ ${method.name} failed: ${error.message}`);
            }
        }

        console.log('⚠️ All advanced methods failed, trying alternative approaches...');
        return await this.getAlternativeContent(limit);
    }

    // Method 1: Direct web scraping with better parsing
    async directWebScraping(limit) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${this.username}/`)}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const html = data.contents;
            
            // Look for various data patterns in the HTML
            const photos = this.parseAdvancedHTML(html, limit);
            return photos;
            
        } catch (error) {
            throw new Error(`Direct scraping failed: ${error.message}`);
        }
    }

    // Method 2: Extract embedded JSON data
    async embeddedDataExtraction(limit) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${this.username}/`)}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; InstagramBot/1.0; +http://www.instagram.com/)'
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const html = data.contents;
            
            // Look for different embedded data patterns
            const patterns = [
                /window\._sharedData\s*=\s*({.+?});/,
                /window\.__additionalDataLoaded\([^,]+,({.+?})\)/,
                /"ProfilePage"\s*:\s*\[({.+?})\]/,
                /"entry_data"\s*:\s*({.+?})/
            ];

            for (const pattern of patterns) {
                const match = html.match(pattern);
                if (match) {
                    try {
                        const jsonData = JSON.parse(match[1]);
                        const photos = this.extractPhotosFromData(jsonData, limit);
                        if (photos.length > 0) return photos;
                    } catch (e) {
                        continue;
                    }
                }
            }

            throw new Error('No embedded data found');
            
        } catch (error) {
            throw new Error(`Embedded data extraction failed: ${error.message}`);
        }
    }

    // Method 3: JSON-LD structured data extraction
    async jsonLdExtraction(limit) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${this.username}/`)}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const html = data.contents;
            
            // Look for JSON-LD structured data
            const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
            let match;
            
            while ((match = jsonLdRegex.exec(html)) !== null) {
                try {
                    const jsonData = JSON.parse(match[1]);
                    const photos = this.extractPhotosFromStructuredData(jsonData, limit);
                    if (photos.length > 0) return photos;
                } catch (e) {
                    continue;
                }
            }

            throw new Error('No JSON-LD data found');
            
        } catch (error) {
            throw new Error(`JSON-LD extraction failed: ${error.message}`);
        }
    }

    // Method 4: Meta tags extraction
    async metaTagsExtraction(limit) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${this.username}/`)}`, {
                headers: {
                    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const html = data.contents;
            
            // Extract Open Graph and Twitter Card images
            const metaImages = this.extractMetaImages(html);
            if (metaImages.length > 0) {
                const photos = metaImages.slice(0, limit).map((img, index) => ({
                    id: `meta-${index}`,
                    type: 'image',
                    url: img.url,
                    thumbnail: img.url,
                    link: `https://www.instagram.com/${this.username}/`,
                    caption: img.alt || `Instagram post from @${this.username}`,
                    alt: img.alt || `Instagram post ${index + 1}`,
                    timestamp: Date.now() - (index * 3600000)
                }));
                return photos;
            }

            throw new Error('No meta images found');
            
        } catch (error) {
            throw new Error(`Meta tags extraction failed: ${error.message}`);
        }
    }

    // Method 5: Third-party services
    async thirdPartyServices(limit) {
        const services = [
            {
                name: 'InstagramAPI',
                url: `https://instagram-scraper-2022.p.rapidapi.com/ig/info_username/${this.username}`,
                headers: { 'X-RapidAPI-Key': 'demo-key' }
            },
            {
                name: 'SocialFeed',
                url: `https://api.socialgrep.com/instagram/user/${this.username}/posts`
            },
            {
                name: 'MediaAPI',
                url: `https://api.mediastack.com/v1/instagram/${this.username}`
            }
        ];

        for (const service of services) {
            try {
                console.log(`🔄 Trying service: ${service.name}`);
                const response = await fetch(service.url, {
                    headers: service.headers || {}
                });

                if (response.ok) {
                    const data = await response.json();
                    const photos = this.parseServiceResponse(data, limit);
                    if (photos.length > 0) {
                        console.log(`✅ Service ${service.name} success: ${photos.length} photos`);
                        return photos;
                    }
                }
            } catch (error) {
                console.log(`❌ Service ${service.name} failed: ${error.message}`);
                continue;
            }
        }

        throw new Error('All third-party services failed');
    }

    // Alternative content when all else fails
    async getAlternativeContent(limit) {
        console.log('🔄 Getting alternative Instagram content...');
        
        try {
            // Try to get at least profile picture and basic info
            const profileData = await this.getBasicProfileData();
            
            if (profileData) {
                const photos = [{
                    id: 'profile-pic',
                    type: 'image',
                    url: profileData.profilePic,
                    thumbnail: profileData.profilePic,
                    link: `https://www.instagram.com/${this.username}/`,
                    caption: `Follow @${this.username} on Instagram for the latest updates!`,
                    alt: `${this.username} profile picture`
                }];
                
                // Add some placeholder posts that link to Instagram
                for (let i = 1; i < limit; i++) {
                    photos.push({
                        id: `placeholder-${i}`,
                        type: 'link',
                        url: `images/instagram-placeholder-${(i % 3) + 1}.jpg`, // You can create these
                        thumbnail: `images/instagram-placeholder-${(i % 3) + 1}.jpg`,
                        link: `https://www.instagram.com/${this.username}/`,
                        caption: `See more of our work on Instagram @${this.username}`,
                        alt: `Visit our Instagram @${this.username}`
                    });
                }
                
                return photos;
            }
        } catch (error) {
            console.log('❌ Alternative content failed:', error.message);
        }
        
        // Return empty array to trigger fallback
        return [];
    }

    // Advanced HTML parsing
    parseAdvancedHTML(html, limit) {
        const photos = [];
        
        // Multiple regex patterns for different Instagram layouts
        const patterns = [
            /"display_url":"([^"]+)"/g,
            /"thumbnail_src":"([^"]+)"/g,
            /"src":"([^"]*cdninstagram[^"]+)"/g,
            /src="([^"]*cdninstagram[^"]+)"/g
        ];

        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(html)) && photos.length < limit) {
                const url = match[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"');
                if (url.includes('instagram') && !photos.find(p => p.url === url)) {
                    photos.push({
                        id: `parsed-${photos.length}`,
                        type: 'image',
                        url: url,
                        thumbnail: url,
                        link: `https://www.instagram.com/${this.username}/`,
                        caption: `Instagram post from @${this.username}`,
                        alt: `Instagram post ${photos.length + 1}`
                    });
                }
            }
        }

        return photos;
    }

    // Extract photos from structured data
    extractPhotosFromData(data, limit) {
        const photos = [];
        
        // Navigate through various data structures
        const possiblePaths = [
            'entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges',
            'data.user.edge_owner_to_timeline_media.edges',
            'user.edge_owner_to_timeline_media.edges',
            'media.edges',
            'posts'
        ];

        for (const path of possiblePaths) {
            const media = this.getNestedValue(data, path);
            if (Array.isArray(media)) {
                for (let i = 0; i < Math.min(media.length, limit); i++) {
                    const item = media[i];
                    const node = item.node || item;
                    
                    if (node.display_url || node.thumbnail_src) {
                        photos.push({
                            id: node.id || `extracted-${i}`,
                            type: node.is_video ? 'video' : 'image',
                            url: node.display_url || node.thumbnail_src,
                            thumbnail: node.thumbnail_src || node.display_url,
                            link: `https://www.instagram.com/p/${node.shortcode || ''}`,
                            caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || `Instagram post from @${this.username}`,
                            alt: `Instagram post ${i + 1}`,
                            timestamp: node.taken_at_timestamp ? node.taken_at_timestamp * 1000 : Date.now()
                        });
                    }
                }
                
                if (photos.length > 0) break;
            }
        }

        return photos;
    }

    // Extract from JSON-LD structured data
    extractPhotosFromStructuredData(data, limit) {
        const photos = [];
        
        if (data['@type'] === 'ImageObject' && data.contentUrl) {
            photos.push({
                id: 'structured-0',
                type: 'image',
                url: data.contentUrl,
                thumbnail: data.thumbnailUrl || data.contentUrl,
                link: data.url || `https://www.instagram.com/${this.username}/`,
                caption: data.caption || `Instagram post from @${this.username}`,
                alt: data.name || `Instagram post`
            });
        }
        
        return photos;
    }

    // Extract meta tag images
    extractMetaImages(html) {
        const images = [];
        const metaPatterns = [
            /property="og:image"\s+content="([^"]+)"/g,
            /name="twitter:image"\s+content="([^"]+)"/g,
            /property="og:image:url"\s+content="([^"]+)"/g
        ];

        for (const pattern of metaPatterns) {
            let match;
            while ((match = pattern.exec(html)) !== null) {
                const url = match[1];
                if (url && !images.find(img => img.url === url)) {
                    images.push({ url, alt: 'Instagram meta image' });
                }
            }
        }

        return images;
    }

    // Parse service responses
    parseServiceResponse(data, limit) {
        // Handle different service response formats
        const photos = [];
        
        if (data.posts || data.media || data.items) {
            const items = data.posts || data.media || data.items;
            for (let i = 0; i < Math.min(items.length, limit); i++) {
                const item = items[i];
                if (item.image_url || item.media_url || item.url) {
                    photos.push({
                        id: `service-${i}`,
                        type: 'image',
                        url: item.image_url || item.media_url || item.url,
                        thumbnail: item.thumbnail_url || item.image_url || item.media_url || item.url,
                        link: item.permalink || `https://www.instagram.com/${this.username}/`,
                        caption: item.caption || `Instagram post from @${this.username}`,
                        alt: `Instagram post ${i + 1}`
                    });
                }
            }
        }

        return photos;
    }

    // Get basic profile data
    async getBasicProfileData() {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${this.username}/`)}`);
            if (!response.ok) return null;
            
            const data = await response.json();
            const html = data.contents;
            
            const profilePicMatch = html.match(/"profile_pic_url":"([^"]+)"/);
            if (profilePicMatch) {
                return {
                    profilePic: profilePicMatch[1].replace(/\\u0026/g, '&')
                };
            }
        } catch (error) {
            console.log('Could not get basic profile data:', error.message);
        }
        
        return null;
    }

    // Utility function to get nested object values
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            if (key.includes('[') && key.includes(']')) {
                const arrayKey = key.substring(0, key.indexOf('['));
                const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
                return current?.[arrayKey]?.[index];
            }
            return current?.[key];
        }, obj);
    }

    // Cache management
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

    clearCache() {
        this.cache.clear();
        console.log('🗑️ Advanced scraper cache cleared');
    }

    // Test all methods
    async testAllMethods() {
        console.log('🧪 Testing all advanced scraping methods...');
        
        const results = {};
        const methods = [
            'directWebScraping',
            'embeddedDataExtraction', 
            'jsonLdExtraction',
            'metaTagsExtraction',
            'thirdPartyServices'
        ];

        for (const method of methods) {
            try {
                console.log(`Testing ${method}...`);
                const photos = await this[method](3);
                results[method] = {
                    success: true,
                    photoCount: photos.length,
                    samplePhoto: photos[0] || null
                };
            } catch (error) {
                results[method] = {
                    success: false,
                    error: error.message
                };
            }
        }

        return results;
    }
}

// Export for use
window.AdvancedInstagramScraper = AdvancedInstagramScraper;
