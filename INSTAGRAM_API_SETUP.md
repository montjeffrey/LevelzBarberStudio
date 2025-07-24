# 📸 Instagram API Setup Guide
## Complete Step-by-Step Tutorial for @levelzbarberstudio

> **Based on Official Facebook Developers Documentation**  
> Source: https://developers.facebook.com/docs/instagram-platform

---

## 🎯 **What You'll Achieve**
- Access **unlimited** Instagram photos from @levelzbarberstudio
- Get **real-time** access to your latest posts
- **No more** 6-photo limitations or fallback demo images
- **Official** Instagram API integration

---

## 🔑 **Your Credentials**
```
App Secret: 0cb60f52732af2a3808b84b522042408
Username: levelzbarberstudio
```

---

## 📋 **Prerequisites**
- ✅ Instagram Business or Creator Account (@levelzbarberstudio)
- ✅ Facebook Developer Account 
- ✅ Business Verification (required for live apps)
- ✅ Your Instagram account must be **public** for testing

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Create Meta App**
1. Go to [Facebook App Dashboard](https://developers.facebook.com/apps/)
2. Click **"Create App"** in upper right
3. Select **"Other"** use case → Click **Next**
4. Select **"Business"** app type → Click **Next**
5. Add app details:
   - **App Name**: "Levelz Barber Studio Gallery"
   - **Contact Email**: Your email
   - Click **Next**

### **Step 2: Add Instagram Product**
1. In your app dashboard, scroll to find **"Instagram"** product
2. Click **"Set up"** on the Instagram card
3. Choose **"API setup with Instagram login"** (automatically added)
4. This allows access to:
   - ✅ Instagram media management
   - ✅ Comment management  
   - ✅ Publishing content
   - ✅ User insights

### **Step 3: Configure Basic Settings**
1. Go to **App Settings → Basic** in left menu
2. Note your **App ID** and **App Secret**
3. Add **App Domains**: your website domain
4. **Platform**: Add website with your domain URL

### **Step 4: Instagram API Setup**
1. Go to **Instagram → API Setup with Instagram login**
2. **Add Instagram Account**:
   - Click **"Add Instagram Account"**
   - Login with @levelzbarberstudio Instagram account
   - Account must be **public** for testing
3. **Configure OAuth Settings**:
   - **Valid OAuth Redirect URIs**: 
     ```
     https://yourdomain.com/auth/instagram/callback
     http://localhost:3000/auth/instagram/callback (for testing)
     ```
   - **Deauthorize Callback URL**: Your deauth endpoint
   - **Data Deletion Request URL**: Your data deletion endpoint

### **Step 5: Get Access Tokens**
1. In **Instagram → API Setup**, click **"Generate Token"**
2. Choose the Instagram account (@levelzbarberstudio)
3. Grant required permissions:
   - `instagram_business_basic` - Basic profile access
   - `instagram_business_content_publish` - Content publishing
   - `instagram_business_manage_comments` - Comment management
   - `instagram_business_manage_insights` - Analytics access
4. **Copy the generated Access Token** - you'll need this!

### **Step 6: Test API Access**
Use the **API Integration Helper** in your app dashboard:
1. Go to **Instagram → API Integration Helper**
2. Test endpoint: `GET /{user-id}/media`
3. Verify you can access your Instagram media

---

## 🛠️ **Implementation Options**

### **Option A: Instagram API with Instagram Login**
**Best for:** Direct Instagram access, unlimited photos
```javascript
// Example API call to get user media
const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`);
```

### **Option B: Instagram oEmbed API** 
**Best for:** Embedding specific posts
```javascript
// Using your App Secret for oEmbed
const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${postUrl}&access_token=${appId}|${appSecret}`;
```

### **Option C: Instagram Graph API**
**Best for:** Business accounts with advanced features
- Requires Instagram Business Account linked to Facebook Page
- More advanced analytics and insights

---

## 🔧 **Required Permissions**

### **Basic Access (Standard)**
- `instagram_business_basic` - Profile and media access
- `instagram_business_content_publish` - Publishing content
- `instagram_business_manage_comments` - Comment management

### **Advanced Access (Requires App Review)**
- `instagram_business_manage_insights` - Analytics data
- `instagram_business_manage_messages` - Message management

---

## 🧪 **Testing Your Setup**

### **Test 1: Basic API Connection**
```bash
curl -X GET "https://graph.instagram.com/me?fields=id,username&access_token=YOUR_ACCESS_TOKEN"
```

### **Test 2: Get Media**
```bash
curl -X GET "https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=YOUR_ACCESS_TOKEN"
```

### **Test 3: oEmbed Single Post**
```bash
curl -X GET "https://graph.facebook.com/v18.0/instagram_oembed?url=INSTAGRAM_POST_URL&access_token=YOUR_APP_ID|YOUR_APP_SECRET"
```

---

## 📝 **App Review Process**

### **When You Need App Review**
- For **live/production** access to user data
- For **Advanced Access** permissions
- Before publishing your app publicly

### **Review Requirements**
1. **App Functionality**: Working demo of your app
2. **Use Case Description**: Clear explanation of how you use Instagram data
3. **Screen Recordings**: Demo videos showing each permission usage
4. **Privacy Policy**: Required for all apps
5. **Terms of Service**: Recommended

### **Standard vs Advanced Access**
- **Standard**: Basic profile and media access (no review needed for testing)
- **Advanced**: Analytics, insights, messaging (requires review)

---

## 🚨 **Important Notes**

### **Rate Limits**
- **Standard Access**: 200 requests per hour per user
- **Advanced Access**: Higher limits after app review

### **Token Expiration**
- **Short-lived tokens**: 1 hour
- **Long-lived tokens**: 60 days
- **User Access Tokens**: Can be refreshed

### **Data Usage Policy**
- Only request data you actually use
- Store data securely and delete when no longer needed
- Respect user privacy and Instagram's terms

### **Testing vs Production**
- **Development Mode**: Limited to app developers and testers
- **Live Mode**: Requires app review completion

---

## 🔗 **Useful Links**

- [Facebook App Dashboard](https://developers.facebook.com/apps/)
- [Instagram Platform Documentation](https://developers.facebook.com/docs/instagram-platform)
- [Instagram API Reference](https://developers.facebook.com/docs/instagram-platform/reference)
- [App Review Guidelines](https://developers.facebook.com/docs/instagram-platform/app-review)
- [Business Verification](https://developers.facebook.com/docs/development/release/business-verification)

---

## 🆘 **Troubleshooting**

### **Common Issues**
1. **"Invalid OAuth access token"**
   - Check token hasn't expired
   - Verify permissions granted
   - Ensure app is in development/live mode

2. **"Instagram account not found"**
   - Account must be Business or Creator
   - Account must be public for testing
   - Verify account is added to app roles

3. **"Permission denied"**
   - Check required permissions are granted
   - May need app review for advanced features

4. **"Rate limit exceeded"**
   - Implement proper rate limiting
   - Consider caching responses
   - Check if you need Advanced Access

### **Getting Help**
- [Facebook Developer Support](https://developers.facebook.com/support/)
- [Developer Community Forum](https://www.facebook.com/groups/fbdevelopers/)
- [Bug Reports](https://developers.facebook.com/support/bugs/)

---

## ✅ **Next Steps**

1. **Create your Meta app** following steps above
2. **Get your App ID and Access Token**
3. **Test API connectivity** with our test files
4. **Implement in your gallery** for unlimited photos
5. **Submit for App Review** when ready for production

---

*Last Updated: July 24, 2025*  
*Based on Meta Instagram Platform Documentation v18.0*
