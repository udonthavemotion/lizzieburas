# Lizzie Buras Real Estate Website

A modern, responsive real estate website for Lizzie Buras, REALTOR® with Gulf Coast Real Estate in Houma, Louisiana. Features integrated property listings, search functionality, and a professional presentation of real estate services.

## 🏠 Features

- **Modern Design**: Clean, professional design with responsive layouts
- **Property Listings**: Integrated real estate listings with search and filtering
- **Video Hero Section**: Eye-catching video background with smooth animations
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **SEO Optimized**: Schema.org markup for better search engine visibility
- **Contact Forms**: Easy-to-use contact functionality
- **Performance Optimized**: Fast loading times and smooth interactions

## 🔧 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Animations**: AOS (Animate On Scroll) library
- **Icons**: Heroicons via Tailwind CSS
- **Hosting**: Vercel (recommended) or traditional web hosting

## 📋 Property Listings Integration

### Current Setup

The website includes a comprehensive property listings system with:
- **Listings Page**: Dedicated page with search filters and property grid
- **Featured Listings**: Homepage section showcasing top properties
- **Search Functionality**: Filter by price, property type, bedrooms, bathrooms, and location
- **SEO Markup**: Schema.org RealEstateListing structured data

### API Configuration

The listings system is currently configured with mock data for demonstration. To integrate with a real estate API:

#### Option 1: SimplyRETS API (Recommended)
1. Sign up for a free account at [SimplyRETS.com](https://simplyrets.com)
2. Get your API credentials (API Key and Secret)
3. Update the configuration in `listings.js`:

```javascript
const CONFIG = {
    useMockData: false,  // Change to false
    apiBaseUrl: 'https://api.simplyrets.com/properties',
    apiKey: 'YOUR_API_KEY_HERE',
    apiSecret: 'YOUR_API_SECRET_HERE',
    itemsPerPage: 9,
    maxItems: 100
};
```

#### Option 2: Other MLS/IDX Services
- **Zillow API**: Limited access, check current terms
- **Realtor.com API**: May require broker approval
- **RETS.ly**: Freemium service with good documentation
- **Custom MLS Integration**: Contact your local MLS provider

### Updating Listings Data

#### For Mock Data (Current Setup):
1. Edit the `getMockProperties()` function in `listings.js`
2. Update the `getFeaturedProperties()` function in `scripts.js`
3. Add/remove properties as needed

#### For Live API Data:
1. The system automatically fetches fresh data from your configured API
2. Properties update in real-time based on your MLS feed
3. No manual updates required once API is configured

### Adding New Properties Manually

If you need to add properties manually (for new construction, etc.):
1. Add property data to the mock data arrays
2. Include high-quality photos (store in `/Property-Photos/` folder)
3. Update the property count in search results

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   ```bash
   # If using Git
   git add .
   git commit -m "Add listings integration"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically deploy your site

3. **Environment Variables** (if using real API):
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     - `LISTINGS_API_KEY` = Your API key
     - `LISTINGS_API_SECRET` = Your API secret

4. **Custom Domain**:
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., `lizzieburas.com`)

### Namecheap Hosting

1. **Build for Production**:
   ```bash
   # No build step needed - static files ready to upload
   ```

2. **Upload Files**:
   - Upload all files to your hosting account's public folder
   - Ensure `index.html` is in the root directory

3. **API Configuration**:
   - If using server-side API calls, you may need to set up CORS
   - Consider using a serverless function for API calls

### Environment Variables Setup

Create a `.env` file in your project root (if using build tools):
```env
LISTINGS_API_KEY=your_simplyrets_api_key
LISTINGS_API_SECRET=your_simplyrets_api_secret
LISTINGS_API_BASE_URL=https://api.simplyrets.com/properties
```

## 🔒 Security & API Keys

### Production Security
- **Never commit API keys to version control**
- Use environment variables for sensitive data
- Consider using a backend proxy for API calls to hide credentials
- Implement rate limiting if needed

### CORS Handling
Most real estate APIs require server-side calls due to CORS policies. Options:
1. Use Vercel serverless functions
2. Set up a simple Node.js proxy server
3. Use a CORS proxy service (for development only)

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile-optimized navigation
- Touch-friendly search filters
- Responsive property grids
- Optimized images for mobile
- Fast loading on slow connections

## 🎨 Customization

### Adding New Pages
1. Create new HTML file (e.g., `services.html`)
2. Copy navigation structure from existing pages
3. Update navigation links in all HTML files

### Modifying Styling
1. Custom styles are in `styles.css`
2. Tailwind classes can be customized in the `tailwind.config` section
3. Color scheme can be modified in the config:
   ```javascript
   colors: {
       brandBeige: '#F5F5DC',
       brandBlue: '#6BA6D9',
       gulfCoastBlue: '#2B5A87'
   }
   ```

### Adding New Sections
1. Follow the existing HTML structure
2. Add appropriate `data-aos` attributes for animations
3. Include proper schema markup for SEO

## 🔍 SEO Features

- **Schema.org Markup**: Real estate and business markup
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: Property listings with rich snippets
- **Local SEO**: Location-based optimization for Houma, LA
- **Performance**: Optimized images and loading

## 📊 Analytics & Tracking

To add Google Analytics:
1. Get your GA4 tracking ID
2. Add the tracking script to each HTML file
3. Update the tracking calls in `scripts.js` and `listings.js`

## 🛠️ Development

### Local Development
```bash
# Install a local server (if needed)
npm install -g serve

# Start local server
serve . -p 3000

# Visit http://localhost:3000
```

### File Structure
```
├── index.html              # Homepage
├── listings.html           # Property listings page
├── blog.html              # Blog page
├── post.html              # Individual blog post
├── styles.css             # Custom styles
├── scripts.js             # Homepage JavaScript
├── listings.js            # Listings page JavaScript
├── icon/                  # Favicon and app icons
├── Family/                # Family photos
├── Lizzies Pics customers/ # Customer testimonial photos
├── Picture/               # Additional images
├── videos/                # Hero section videos
└── README.md              # This file
```

## 🚨 Troubleshooting

### Common Issues

1. **Listings Not Loading**:
   - Check browser console for JavaScript errors
   - Verify API credentials if using real API
   - Ensure proper CORS configuration

2. **Images Not Displaying**:
   - Check image paths and file extensions
   - Verify images are properly uploaded
   - Check browser network tab for failed requests

3. **Search Filters Not Working**:
   - Ensure JavaScript is enabled
   - Check for console errors
   - Verify filter data matches property data structure

4. **Mobile Layout Issues**:
   - Test on actual devices, not just browser resize
   - Check Tailwind responsive classes
   - Verify viewport meta tag is present

### Getting Help

- Check browser console for error messages
- Verify all files are uploaded correctly
- Test on different browsers and devices
- Contact your hosting provider for server-related issues

## 📝 License

This website is custom-built for Lizzie Buras, REALTOR® with Gulf Coast Real Estate. All content and branding are proprietary.

## 🤝 Support

For technical support or modifications, contact the development team or your web developer.

---

**Last Updated**: December 2024
**Version**: 2.0.0 (with listings integration)

Built with ❤️ for Lizzie Buras, REALTOR® | Gulf Coast Real Estate 