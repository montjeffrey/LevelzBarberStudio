// 📸 Instagram Gallery Template
// Copy this code to replace the placeholder in index.html when you have real Instagram post URLs

function loadRealInstagramGallery() {
    const gallery = document.getElementById('instagram-gallery');
    
    // 🔧 REPLACE THESE WITH REAL INSTAGRAM POST URLs
    // To get URLs: Go to instagram.com/levelzbarberstudio → Click a post → Copy URL
    const instagramPosts = [
        'https://www.instagram.com/p/YOUR_POST_1/', // Replace with real URL
        'https://www.instagram.com/p/YOUR_POST_2/', // Replace with real URL
        'https://www.instagram.com/p/YOUR_POST_3/', // Replace with real URL
        'https://www.instagram.com/p/YOUR_POST_4/', // Replace with real URL
        'https://www.instagram.com/p/YOUR_POST_5/', // Replace with real URL
        'https://www.instagram.com/p/YOUR_POST_6/'  // Replace with real URL
    ];

    // Clear any existing content
    gallery.innerHTML = '';

    // Create Instagram embeds
    instagramPosts.forEach((postUrl, index) => {
        const embedContainer = document.createElement('div');
        embedContainer.className = 'gallery-item';
        embedContainer.innerHTML = `
            <blockquote class="instagram-media" 
                data-instgrm-permalink="${postUrl}" 
                data-instgrm-version="14">
            </blockquote>
        `;
        gallery.appendChild(embedContainer);
    });

    // Load Instagram embed script
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        
        // Animate gallery items after Instagram embeds load
        script.onload = () => {
            setTimeout(animateGalleryItems, 500);
        };
    } else {
        setTimeout(animateGalleryItems, 500);
    }
}

function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100); // Stagger the animation
    });
}

// 📝 INSTRUCTIONS TO USE:
// 1. Go to https://instagram.com/levelzbarberstudio
// 2. Click on recent posts and copy their URLs
// 3. Replace the placeholder URLs above with real ones
// 4. In index.html, replace the loadInstagramGallery function with loadRealInstagramGallery
// 5. Test the page - you should see real Instagram posts!

console.log(`
🔧 Instagram Gallery Setup Instructions:

1. Get Real Post URLs:
   - Visit: https://instagram.com/levelzbarberstudio
   - Click on each post you want to show
   - Copy the URL (like: https://www.instagram.com/p/ABC123/)

2. Update the instagramPosts array above with real URLs

3. Replace the placeholder function in index.html:
   - Find: function loadInstagramGallery()
   - Replace with: function loadRealInstagramGallery()
   - Change the function call from loadInstagramGallery() to loadRealInstagramGallery()

4. Test the page - your real Instagram posts will appear!
`);
