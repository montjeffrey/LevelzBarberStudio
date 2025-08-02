const fs = require('fs');
const path = require('path');

// Get the tracking ID from environment variable
const trackingId = process.env.GOOGLE_ANALYTICS_ID || 'G-NTV4YS7VF1';

// List of HTML files to process
const htmlFiles = [
  'index.html',
  'services.html',
  'products.html',
  'gallery.html',
  'contact.html',
  'book.html',
  'barbers.html'
];

// Replace tracking ID in all HTML files
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the tracking ID in the analytics.js file reference
    content = content.replace(
      /window\.GOOGLE_ANALYTICS_ID = 'G-NTV4YS7VF1';/g,
      `window.GOOGLE_ANALYTICS_ID = '${trackingId}';`
    );
    
    // Replace the tracking ID in the gtag script src
    content = content.replace(
      /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-NTV4YS7VF1/g,
      `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    );
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file} with tracking ID: ${trackingId}`);
  }
});

// Update analytics.js file
const analyticsContent = `// Google Analytics Configuration
// This file gets processed by Netlify build system
window.GOOGLE_ANALYTICS_ID = '${trackingId}';`;

fs.writeFileSync('analytics.js', analyticsContent);
console.log(`Updated analytics.js with tracking ID: ${trackingId}`); 