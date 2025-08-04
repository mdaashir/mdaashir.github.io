# Mohamed Aashir S - Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and deployed with Docker.

![Portfolio Preview](https://img.shields.io/badge/React-18+-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4+-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-green.svg)

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations and gradient accents
- **Interactive Components**:
  - Animated typing effect with React Type Animation
  - Smooth scrolling navigation
  - Working contact form with validation
  - Hover effects and transitions
- **Performance Optimized**: Fast loading with optimized assets and lazy loading
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Production Ready**: Docker containerization and CI/CD ready

## 🛠️ Technologies Used

### Frontend

- **React 19** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **React Type Animation** - Smooth typing animations

### Build Tools

- **React Scripts** - Zero-configuration build setup
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment & DevOps

- **Docker** - Containerization
- **Nginx** - Production web server
- **GitHub Pages** - Static site hosting
- **gh-pages** - Automated deployment

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/mdaashir/mdaashir.github.io.git
   cd mdaashir.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Production Build

1. **Build for production**

   ```bash
   npm run build
   ```

2. **Serve production build locally**

   ```bash
   npm run serve
   ```

3. **Test production build**
   ```
   http://localhost:3000
   ```

## 🐳 Docker Deployment

### Development with Docker

```bash
# Build and run development container
docker-compose up dev

# Or manually
docker build -f Dockerfile.dev -t portfolio-dev .
docker run -p 3000:3000 -v $(pwd):/app portfolio-dev
```

### Production with Docker

```bash
# Build and run production container
docker-compose up prod

# Or manually
docker build -t portfolio-prod .
docker run -p 80:80 portfolio-prod
```

### Custom Port Production

```bash
# Run on custom port (8080)
docker-compose up prod-custom
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   ├── manifest.json      # PWA manifest
│   └── img/               # Images and icons
├── src/
│   ├── components/        # Reusable components
│   │   ├── Hero.jsx      # Landing section
│   │   └── NavBar.jsx    # Navigation component
│   ├── pages/            # Page components
│   │   ├── index.js      # Home/Work section
│   │   ├── about.js      # About page
│   │   └── contact.js    # Contact page
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── docs/                 # GitHub Pages build output
├── Dockerfile            # Production container
├── Dockerfile.dev        # Development container
├── docker-compose.yml    # Docker orchestration
├── nginx.conf            # Nginx configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Deployment Options

### GitHub Pages (Recommended)

1. **Configure repository**

   - Enable GitHub Pages in repository settings
   - Set source to "gh-pages" branch

2. **Deploy**

   ```bash
   npm run deploy
   ```

3. **Access your site**
   ```
   https://mdaashir.github.io
   ```

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect React and configure build settings
3. Deploy automatically on push

### Docker Production

```bash
# Build production image
docker build -t portfolio .

# Run container
docker run -d -p 80:80 --name portfolio-site portfolio

# Or with docker-compose
docker-compose up -d prod
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3001

# Production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.yourdomain.com
```

### Tailwind Customization

Edit `tailwind.config.js` to customize the design:

```javascript
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f97316', // Custom orange
				secondary: '#ec4899', // Custom pink
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
```

## 📝 Scripts

| Script           | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run build`  | Build for production             |
| `npm run start`  | Start development server (alias) |
| `npm run test`   | Run tests                        |
| `npm run serve`  | Serve production build locally   |
| `npm run deploy` | Deploy to GitHub Pages           |

## 🎨 Customization

### Colors & Branding

1. Update the gradient colors in `src/index.css`:

   ```css
   .primary-color {
   	@apply text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 inline-block;
   }
   ```

2. Modify hero content in `src/components/Hero.jsx`
3. Update personal information in `src/pages/about.js`
4. Add your projects in `src/pages/index.js`

### Contact Form

The contact form includes:

- Form validation
- Loading states
- Success messages
- Responsive design

To integrate with a backend:

1. Replace the simulation in `src/pages/contact.js`
2. Add your API endpoint
3. Handle form submission

## 🛡️ Security Features

- **Content Security Policy** headers
- **XSS Protection** enabled
- **Frame Options** configured
- **Input Validation** on contact form
- **HTTPS Ready** for production

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed Aashir S**

- Email: s.mohamedaashir@gmail.com
- GitHub: [@mdaashir](https://github.com/mdaashir)
- Portfolio: [https://mdaashir.github.io](https://mdaashir.github.io)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations from [React Type Animation](https://www.npmjs.com/package/react-type-animation)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**⭐ Star this repository if you found it helpful!**
