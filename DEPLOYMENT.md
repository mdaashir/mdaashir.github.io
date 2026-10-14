# 🚀 Deployment Guide - Vite + Preact Portfolio

This guide covers multiple deployment options for your modern Vite + Preact portfolio website.

## 📋 Pre-deployment Checklist

Before deploying, ensure:

- [ ] All features work correctly in development (`npm run dev`)
- [ ] Production build completes successfully (`npm run build`)
- [ ] No console errors or warnings
- [ ] All links and navigation work properly
- [ ] Contact form functions as expected
- [ ] Responsive design tested on different screen sizes
- [ ] TypeAnimation and smooth scrolling work properly

## 🛠️ Build Commands

```bash
# Development server
npm run dev              # Starts Vite dev server on http://localhost:5173

# Production build
npm run build            # Builds optimized production bundle to dist/

# Preview production build locally
npm run preview          # Serves production build locally

# Deploy to GitHub Pages
npm run deploy           # Builds and deploys to gh-pages branch
```

## 🌐 Deployment Options

### 1. GitHub Pages (Free & Recommended) ⭐

**Prerequisites:**

- GitHub repository with your code
- GitHub Actions enabled

**Automatic Deployment (Recommended):**

Your repository is already configured with GitHub Actions! Simply:

1. Push your code to the `main` branch:

   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Run tests and build the project
   - Deploy to GitHub Pages
   - Make your site live at `https://mdaashir.github.io`

**Manual Deployment:**

```bash
npm run deploy
```

**Custom Domain (Optional):**

1. Add your domain to the `CNAME` file in the `public/` folder
2. Configure DNS settings with your domain provider
3. Update `base` in `vite.config.ts` if needed

---

### 2. Netlify (Free Tier Available)

**Git Integration (Recommended):**

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

**Manual Deploy:**

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify dashboard

**Environment Variables:**

- Set `NODE_VERSION` to `18` in Netlify settings

---

### 3. Vercel (Free Tier Available)

**Git Integration:**

1. Connect your GitHub repository to Vercel
2. Vercel auto-detects Vite and configures build settings
3. Build Command: `npm run build`
4. Output Directory: `dist`

**Manual Deploy:**

```bash
npx vercel --prod
```

---

### 4. Docker Deployment 🐳

**Development with Docker:**

```bash
# Build and run development container with hot reloading
docker-compose up dev

# Access at http://localhost:5173
```

**Production with Docker:**

```bash
# Build and run production container
docker-compose up prod

# Access at http://localhost:80
```

**Custom Port:**

```bash
# Run on port 8080
docker-compose up prod-custom

# Access at http://localhost:8080
```

**Manual Docker Commands:**

```bash
# Development
docker build -f Dockerfile.dev -t portfolio-dev .
docker run -p 5173:5173 -v $(pwd):/app portfolio-dev

# Production
docker build -t portfolio-prod .
docker run -p 80:80 portfolio-prod
```

---

### 5. Static Hosting Services

**Build Command:** `npm run build`
**Output Directory:** `dist`

#### Compatible Services:

- **Surge.sh**
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**
- **Heroku** (with buildpack)

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for different environments:

```env
# Development
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3001

# Production
VITE_APP_ENV=production
VITE_API_URL=https://api.yourdomain.com
```

**Note:** Vite uses `VITE_` prefix for environment variables exposed to the client.

### Base URL Configuration

For subdirectory deployments, update `vite.config.ts`:

```typescript
export default defineConfig({
	base: '/your-subdirectory/',
	// ... other config
});
```

### Custom Domain Setup

1. Add `CNAME` file to `public/` folder:

   ```
   yourdomain.com
   ```

2. Configure DNS:
   ```
   CNAME: www -> username.github.io
   A:     @   -> 185.199.108.153
                185.199.109.153
                185.199.110.153
                185.199.111.153
   ```

---

## 📊 Performance Optimization

### Build Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/
```

### Key Optimizations Already Included:

- ✅ **Code Splitting**: Automatic with Vite
- ✅ **Tree Shaking**: Dead code elimination
- ✅ **Asset Optimization**: Images and CSS minification
- ✅ **Gzip Compression**: Enabled in nginx config
- ✅ **Caching Headers**: Set for static assets
- ✅ **Prerendering**: Static pages for SEO

---

## 🛡️ Security & Performance

### Nginx Configuration

The included `nginx.conf` provides:

- **Security Headers**: XSS protection, CSRF protection
- **Gzip Compression**: Faster loading
- **Asset Caching**: Optimized cache policies
- **SPA Routing**: Proper fallback to index.html

### Performance Monitoring

- **Lighthouse**: Built-in Chrome DevTools
- **Web Vitals**: Core performance metrics
- **Bundle Analyzer**: Size optimization

---

## 🐛 Troubleshooting

### Common Issues:

**1. Blank page after deployment:**

- Check browser console for errors
- Verify `base` URL in `vite.config.ts`
- Ensure all assets are correctly referenced

**2. 404 on page refresh:**

- Configure server for SPA routing
- Ensure fallback to `index.html` is set

**3. Environment variables not working:**

- Use `VITE_` prefix for client-side variables
- Restart dev server after adding new variables

**4. Build fails:**

- Check Node.js version (requires 18+)
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

---

## 📱 Mobile & PWA Support

To enable PWA features:

1. Install Vite PWA plugin:

   ```bash
   npm install -D vite-plugin-pwa
   ```

2. Configure in `vite.config.ts`:

   ```typescript
   import { VitePWA } from 'vite-plugin-pwa';

   plugins: [
   	VitePWA({
   		registerType: 'autoUpdate',
   		workbox: {
   			globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
   		},
   	}),
   ];
   ```

---

## 🎯 Best Practices

### Before Deploying:

1. **Test thoroughly** in development
2. **Run production build** locally
3. **Check responsive design** on multiple devices
4. **Validate all forms** and interactions
5. **Test navigation** and routing
6. **Verify performance** with Lighthouse

### After Deploying:

1. **Test live site** functionality
2. **Check all pages** and routes
3. **Verify contact form** works
4. **Test on different devices**
5. **Monitor performance** metrics

---

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test the production build locally first
4. Check the specific platform's documentation

---

**🎉 Your modern Vite + Preact portfolio is ready for the world!**
