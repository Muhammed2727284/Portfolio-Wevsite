# Setup Guide - MUH.dev Portfolio

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Required Configuration

### 1. Google Analytics (Required for Production)
**File**: `index.html` (lines 33, 38)

Replace `G-XXXXXXXXXX` with your Google Analytics 4 tracking ID:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA4-ID');
</script>
```

Get your GA4 ID from: https://analytics.google.com/

### 2. PWA Icons (Required for PWA)
Create and add to `/public/` directory:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

**Recommended tool**: https://realfavicongenerator.net/

### 3. Favicon (Optional but Recommended)
Replace `/public/vite.svg` with your custom favicon.

### 4. Social Media Links
Update social media URLs in `src/components/Footer.vue`:
```vue
<a href="https://github.com/YOUR-USERNAME" target="_blank">
<a href="https://linkedin.com/in/YOUR-PROFILE" target="_blank">
<a href="https://instagram.com/YOUR-USERNAME" target="_blank">
<a href="mailto:YOUR-EMAIL@example.com">
```

### 5. Domain Configuration
Update URLs in `index.html` for production:
```html
<meta property="og:url" content="https://YOUR-DOMAIN.com" />
<link rel="canonical" href="https://YOUR-DOMAIN.com" />
```

### 6. EmailJS Setup (For Contact Form - Future)
When implementing contact form:
1. Sign up at https://www.emailjs.com/
2. Get your Service ID, Template ID, and Public Key
3. Add to environment variables or config file

## Environment Variables

Create `.env.local` file (optional):
```env
VITE_GA_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://muh.dev
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages
1. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
# Push dist folder to gh-pages branch
```

### Custom Server
1. Build: `npm run build`
2. Upload `dist/` folder contents to your server
3. Configure server to serve `index.html` for all routes (SPA)

**Nginx example**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Features Already Configured

✅ Vue 3 + TypeScript
✅ Vue Router
✅ Vue i18n (3 languages)
✅ Dark/Light theme
✅ SCSS support
✅ SEO meta tags
✅ PWA manifest
✅ Google Analytics code
✅ Responsive design
✅ ChatBot
✅ Scroll animations
✅ Typing effect

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Opera (last 2 versions)

## Performance Tips

1. **Image Optimization**: Convert images to WebP format
2. **Font Loading**: Use `font-display: swap` in CSS
3. **Code Splitting**: Already implemented via Vue Router
4. **Lazy Loading**: Add to images: `loading="lazy"`
5. **CDN**: Consider using CDN for static assets

## Testing Checklist

Before deployment, test:
- [ ] All pages load correctly
- [ ] Language switcher works (EN, RU, KG)
- [ ] Theme switcher works (Dark/Light)
- [ ] ChatBot responds correctly
- [ ] Mobile responsive on all pages
- [ ] All links work
- [ ] Forms work (if implemented)
- [ ] Google Analytics tracking (check in GA console)
- [ ] PWA installable (check in Chrome DevTools)
- [ ] SEO meta tags correct (use Facebook Sharing Debugger)
- [ ] Page load speed (use Lighthouse)

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npx vue-tsc --noEmit
```

### Styles Not Loading
Check that SCSS is properly configured in `vite.config.ts`:
```ts
css: {
  preprocessorOptions: {
    scss: {}
  }
}
```

## Support

For issues or questions:
1. Check `FEATURES.md` for detailed feature documentation
2. Review Vue 3 docs: https://vuejs.org/
3. Review Vite docs: https://vitejs.dev/

## License

Update `package.json` with your license information.

---

**Built with ❤️ using Vue.js**
