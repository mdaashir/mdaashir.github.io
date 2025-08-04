# 🚀 Deployment Guide

This guide covers multiple deployment options for your portfolio website.

## 📋 Pre-deployment Checklist

Before deploying, ensure:

- [ ] All features work correctly in development
- [ ] Production build completes successfully (`npm run build`)
- [ ] No console errors or warnings
- [ ] All links and navigation work properly
- [ ] Contact form functions as expected
- [ ] Responsive design tested on different screen sizes

## 🌐 Deployment Options

### 1. GitHub Pages (Free & Recommended)

**Setup:**

1. Push your code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch" and select "gh-pages"

**Deploy:**

```bash
npm run deploy
```

**Custom Domain (Optional):**

1. Add `CNAME` file to public folder with your domain
2. Configure DNS settings with your domain provider

**Access:** `https://username.github.io/repository-name`

---

### 2. Netlify (Free Tier Available)

**Manual Deploy:**

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify dashboard

**Git Integration:**

1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Auto-deploy on git push

**Custom Domain:** Available on free tier

---

### 3. Vercel (Free Tier Available)

**Deploy:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

**Git Integration:**

1. Connect GitHub repository to Vercel dashboard
2. Auto-deploy on git push

**Features:**

- Automatic HTTPS
- Global CDN
- Branch previews

---

### 4. Docker Production Deployment

**Quick Start:**

```bash
# Build production image
docker build -t portfolio .

# Run container
docker run -d -p 80:80 --name portfolio-site portfolio
```

**Docker Compose:**

```bash
# Production deployment
docker-compose up -d prod

# Custom port (8080)
docker-compose up -d prod-custom
```

**Advantages:**

- Consistent environment
- Easy scaling
- Production-ready nginx configuration

---

### 5. AWS S3 + CloudFront

**Setup:**

1. Create S3 bucket with static website hosting
2. Build project: `npm run build`
3. Upload `build` folder contents to S3
4. Configure CloudFront distribution
5. Set up Route 53 for custom domain

**CLI Deploy:**

```bash
# Install AWS CLI
npm install -g aws-cli

# Build and sync
npm run build
aws s3 sync build/ s3://your-bucket-name --delete
```

---

### 6. Digital Ocean App Platform

**Setup:**

1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `build`
3. Configure environment variables

**Features:**

- Automatic scaling
- Built-in monitoring
- Easy SSL certificates

---

## 🔧 Environment Configuration

### Development

```env
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3001
```

### Production

```env
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_GA_TRACKING_ID=your_tracking_id
```

## 🏗️ Build Optimization

### Bundle Analysis

```bash
npm install -g source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Performance Tips

1. **Image Optimization:** Use WebP format, compress images
2. **Code Splitting:** Implement lazy loading for routes
3. **CDN:** Use CDN for static assets
4. **Caching:** Configure proper cache headers

## 🔒 Security Considerations

### HTTPS

- Always use HTTPS in production
- Most platforms provide automatic SSL certificates

### Environment Variables

- Never commit sensitive data to git
- Use platform-specific environment variable settings

### Content Security Policy

Nginx configuration includes basic CSP headers:

```nginx
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📊 Monitoring & Analytics

### Google Analytics (Optional)

```javascript
// Add to public/index.html
<script
	async
	src='https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID'></script>
```

### Performance Monitoring

- Lighthouse CI for automated performance testing
- Web Vitals tracking
- Error monitoring with Sentry

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**

- Check for syntax errors
- Verify all dependencies are installed
- Clear node_modules and reinstall

**Routing Issues (404 on refresh):**

- Configure server to serve index.html for all routes
- Use HashRouter instead of BrowserRouter (fallback)

**Docker Issues:**

- Check Dockerfile and nginx.conf syntax
- Verify port mappings
- Check container logs: `docker logs container-name`

### Debug Commands

```bash
# Check build output
npm run build --verbose

# Test production build locally
npm run serve

# Docker debugging
docker logs portfolio-site
docker exec -it portfolio-site sh
```

## 📈 Scaling & Performance

### CDN Configuration

```javascript
// In package.json
"homepage": "https://cdn.yourdomain.com"
```

### Load Balancing

For high traffic, consider:

- Multiple container instances
- Load balancer (nginx/HAProxy)
- Auto-scaling groups

### Caching Strategy

```nginx
# Static assets (1 year)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow automatically:

1. Runs tests on pull requests
2. Builds and deploys on main branch
3. Tests Docker build
4. Deploys to GitHub Pages

**Manual Deployment:**

```bash
git push origin main  # Triggers auto-deployment
```

## 📝 Post-Deployment

### Domain Setup

1. Configure DNS records
2. Set up SSL certificates
3. Test all functionality
4. Monitor performance

### SEO Optimization

1. Submit sitemap to search engines
2. Configure meta tags
3. Set up Google Search Console
4. Monitor Core Web Vitals

### Maintenance

- Regular dependency updates
- Security patches
- Performance monitoring
- Backup strategies

---

**Need Help?** Check the troubleshooting section or create an issue in the repository.
