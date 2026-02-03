# TEDxSRKR 2026 Website

A modern, high-performance web application for TEDxSRKR 2026 - "The Future of Ideas"

![TEDxSRKR](https://tedxsrkr.com/og-image.jpg)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Development URL**: http://localhost:3000

---

## 📋 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 6.x | Build Tool |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 12.x | Animations |
| React Router | 7.x | Navigation |
| Lucide React | 0.5x | Icons |

---

## 📁 Project Structure

```
tedxsrkr-website/
├── components/         # Reusable UI components
│   ├── CinematicHero.tsx    # Hero section with parallax
│   ├── Team.tsx             # Glassmorphism team cards
│   ├── Register.tsx         # Form with validation
│   ├── Schedule.tsx         # Event timeline
│   ├── Speakers.tsx         # Speaker cards
│   ├── ErrorBoundary.tsx    # Error handling
│   └── Layout.tsx           # Page layout wrapper
├── pages/              # Route pages
│   ├── Home.tsx
│   ├── TeamPage.tsx
│   ├── RegisterPage.tsx
│   ├── NotFound.tsx         # 404 page
│   └── ServerError.tsx      # 500 page
├── public/             # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── constants.ts        # Team, speakers, schedule data
├── types.ts           # TypeScript interfaces
├── App.tsx            # Route configuration
└── index.tsx          # Entry point
```

---

## 🎨 Design System

### Colors
```css
--ted-red: #E62B1E
--ted-red-light: #ff6b5e
--background: #0A0A0A
--surface: #121212
--text-primary: #FFFFFF
--text-secondary: #888888
```

### Typography
- **Headings**: Inter, system-ui (700-800 weight)
- **Body**: Inter, system-ui (400-500 weight)

### Components
- **Glassmorphism**: `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Animations**: Framer Motion for all transitions
- **Hover Effects**: Scale, glow, and color transitions

---

## 🌐 Environment Variables

Create `.env.production` for production:

```env
VITE_APP_TITLE=TEDxSRKR 2026
VITE_EVENT_DATE=2026-03-15
VITE_EVENT_VENUE=SRKR Engineering College
VITE_SITE_URL=https://tedxsrkr.com
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Manual

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload to any static hosting service
```

---

## ✅ Pre-Deployment Checklist

See [production-checklist.md](./production-checklist.md) for the complete deployment checklist.

**Quick checklist:**
- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Update meta tags in `index.html`
- [ ] Add social media images (OG, Twitter)
- [ ] Configure environment variables
- [ ] Test all routes work correctly
- [ ] Verify mobile responsiveness

---

## 📊 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | 90+ | ~88 |
| First Contentful Paint | <1.5s | ~1.2s |
| Time to Interactive | <3s | ~2.5s |
| Bundle Size (gzipped) | <200KB | ~180KB |

---

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Build test
npm run build

# Preview and manual test
npm run preview
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed for TEDxSRKR use only.

**TEDx** is a program of local, self-organized events that bring people together to share a TED-like experience.

---

## 👥 Team

Built with ❤️ by the **TEDxSRKR Tech Team**

- Ch. Vivekananda - Lead Developer
- Sk. Saidani - Backend Developer
- T. Adithya - Full Stack Developer
- V. Akash - UI/UX Developer

---

## 📞 Support

For technical issues: [tech@tedxsrkr.com](mailto:tech@tedxsrkr.com)

For general inquiries: [team@tedxsrkr.com](mailto:team@tedxsrkr.com)
