// Instagram Gallery Configuration
// Edit this file to customize your Instagram gallery settings

window.LEVELZ_GALLERY_CONFIG = {
    // OPTION 1: Full Instagram API Integration
    // Requires Instagram Basic Display API setup (see README.md)
    instagram: {
        enabled: false, // Set to true when you have API credentials
        accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN', // Replace with your actual token
        userId: 'YOUR_INSTAGRAM_USER_ID', // Replace with your actual user ID
        maxPhotos: 12,
        refreshInterval: 60000 // Refresh every 60 seconds (60000ms)
    },

    // OPTION 2: Manual Instagram Post URLs
    // Simple setup - just add your Instagram post URLs
    manual: {
        enabled: false, // Set to true to use manual URLs
        posts: [
            // Replace these with actual Instagram post URLs
            'https://www.instagram.com/p/EXAMPLE_POST_1/',
            'https://www.instagram.com/p/EXAMPLE_POST_2/',
            'https://www.instagram.com/p/EXAMPLE_POST_3/',
            'https://www.instagram.com/p/EXAMPLE_POST_4/',
            'https://www.instagram.com/p/EXAMPLE_POST_5/',
            'https://www.instagram.com/p/EXAMPLE_POST_6/',
            'https://www.instagram.com/p/EXAMPLE_POST_7/',
            'https://www.instagram.com/p/EXAMPLE_POST_8/',
            'https://www.instagram.com/p/EXAMPLE_POST_9/',
            'https://www.instagram.com/p/EXAMPLE_POST_10/',
            'https://www.instagram.com/p/EXAMPLE_POST_11/',
            'https://www.instagram.com/p/EXAMPLE_POST_12/'
        ]
    },

    // OPTION 3: Fallback Images (Current Setup)
    // Uses existing demo images - works immediately
    fallback: {
        enabled: true, // Currently active
        images: [
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
    },

    // Gallery Settings
    settings: {
        animationDelay: 100, // Delay between image animations (ms)
        loadingTimeout: 5000, // Fallback to images after timeout (ms)
        clickToInstagram: true, // Enable click-to-view on Instagram
        showAttribution: true, // Show Instagram attribution link
        lazyLoading: true // Enable lazy loading for better performance
    }
};

// Quick Setup Instructions:
// 
// FOR IMMEDIATE USE (No setup required):
// - Keep fallback.enabled = true
// - Gallery will use existing images with Instagram link
//
// FOR MANUAL INSTAGRAM POSTS:
// 1. Set manual.enabled = true
// 2. Set fallback.enabled = false  
// 3. Replace the example URLs in manual.posts with real Instagram post URLs
// 4. Photos will be clickable and link to Instagram
//
// FOR FULL INSTAGRAM API:
// 1. Follow setup guide in README.md
// 2. Set instagram.enabled = true
// 3. Add your access token and user ID
// 4. Set fallback.enabled = false
// 5. Gallery will auto-update with latest Instagram photos
