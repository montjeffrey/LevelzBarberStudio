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
        enabled: true, // 👈 ENABLED - Use real Instagram URLs while scraper improves
        posts: [
            // 👇 REPLACE THESE with your actual Instagram post URLs
            'https://www.instagram.com/p/C8v7rZgOQPE/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQPD/', // Replace with actual post  
            'https://www.instagram.com/p/C8v7rZgOQPC/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQPB/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQPA/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP9/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP8/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP7/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP6/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP5/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP4/', // Replace with actual post
            'https://www.instagram.com/p/C8v7rZgOQP3/'  // Replace with actual post
        ]
    },

    // 🔧 FINAL BACKUP: Demo Images
    // ✅ Always works | ✅ Professional look | ✅ No setup required
    fallback: {
        enabled: true, // 👈 ENABLED - Automatic fallback when scraper fails
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
