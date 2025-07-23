// Instagram Gallery Configuration - Free Scraper Solution
// 🚀 SETUP: See FREE_SCRAPER_SOLUTION.md for details

window.LEVELZ_GALLERY_CONFIG = {
    // 🔧 PRIMARY: Free Instagram Scraper (ACTIVE)
    // ✅ Completely free | ✅ Automatic updates | ✅ Uses your exact design
    // ✅ No third-party dependencies | ✅ No API limits | ✅ No authentication
    scraper: {
        enabled: true, // 👈 ACTIVE - Free Instagram photo scraping
        username: 'levelzbarberstudio',
        maxPhotos: 12,
        refreshInterval: 1800000, // Check for updates every 30 minutes
        retryAttempts: 3,
        cacheDuration: 1800000 // 30 minutes cache
    },

    // 🔧 BACKUP: Manual Instagram Post URLs
    // ✅ Full control | ✅ Works immediately | ✅ Choose specific photos
    // 
    // SETUP INSTRUCTIONS (if scraper fails):
    // 1. Go to instagram.com/levelzbarberstudio
    // 2. Click on photos to get URLs like: https://www.instagram.com/p/ABC123/
    // 3. Replace the example URLs below with your real ones
    // 4. Set enabled: true and scraper enabled: false
    manual: {
        enabled: false, // 👈 BACKUP OPTION - Enable if scraper fails
        posts: [
            // 👇 REPLACE THESE with your actual Instagram post URLs if needed
            'https://www.instagram.com/p/EXAMPLE_POST_1/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_2/',  // Replace this  
            'https://www.instagram.com/p/EXAMPLE_POST_3/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_4/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_5/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_6/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_7/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_8/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_9/',  // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_10/', // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_11/', // Replace this
            'https://www.instagram.com/p/EXAMPLE_POST_12/'  // Replace this
        ]
    },

    // 🔧 FINAL BACKUP: Demo Images
    // ✅ Always works | ✅ Professional look | ✅ No setup required
    fallback: {
        enabled: false, // 👈 FINAL BACKUP - Always available
        images: [
            'images/image1.jpg',
            'images/levelz-cover1.jpeg', 
            'images/Levelz Cover.jpeg',
            'images/alex-faceshot.jpeg',
            'images/anthony-faceshot.jpeg',
            'images/Julian-faceshot.jpeg',
            'images/jhon-mugshot.jpeg',
            'images/Levelz-curl-cream.jpg',
            'images/Levelzproducts.jpg',
            'images/Levelz-hair-pomade.jpg',
            'images/Levelz-volume-powder.jpg',
            'images/Levelz-products cluster.jpg'
        ]
    },

    // 🎨 GALLERY SETTINGS
    settings: {
        animationDelay: 100, // Delay between photo animations (ms)
        clickToInstagram: true, // Click photos to open Instagram
        showAttribution: true // Show Instagram attribution for demo images
    }
};

// 📖 SYSTEM OVERVIEW:
// 
// 🥇 FREE SCRAPER (Active): Automatically scrapes your Instagram photos
// 🥈 MANUAL URLS (Backup): Use specific Instagram post URLs  
// 🥉 DEMO IMAGES (Final): Professional gallery with sample images
//
// The system automatically tries each option in order until one works.
// Your gallery will always display beautifully with your exact design!
