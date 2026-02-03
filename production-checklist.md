# Production Deployment Checklist

## TEDxSRKR 2026 - Final Deployment Steps

---

## ✅ Phase 1: Code Quality

- [x] TypeScript compiles without errors
- [x] Production build succeeds (`npm run build`)
- [x] No console errors in production build
- [x] Code splitting implemented
- [x] ErrorBoundary wraps application

---

## ✅ Phase 2: SEO & Meta Tags

- [x] Title tag configured
- [x] Meta description added
- [x] Open Graph tags (Facebook/LinkedIn)
- [x] Twitter Card meta tags
- [x] robots.txt created
- [x] sitemap.xml created
- [ ] **TODO**: Create OG image (1200x630px)
- [ ] **TODO**: Create Twitter card image (1200x675px)
- [ ] **TODO**: Add favicon files (16x16, 32x32, 180x180)

---

## ✅ Phase 3: Performance

- [x] Code splitting for routes
- [x] Vendor bundles separated
- [x] Images lazy loaded
- [x] Build minified with esbuild
- [ ] **TODO**: Convert images to WebP format
- [ ] **TODO**: Run Lighthouse audit (target: 90+)

---

## ✅ Phase 4: Functionality

- [x] All routes working
- [x] 404 page for unknown routes
- [x] 500 error page created
- [x] Form validation implemented
- [x] Form success state added
- [x] Navigation works correctly
- [x] Mobile responsive verified

---

## ✅ Phase 5: Accessibility

- [x] ARIA labels on interactive elements
- [x] Alt text on images
- [x] Semantic HTML structure
- [ ] **TODO**: Add focus-visible styles globally
- [ ] **TODO**: Test keyboard navigation

---

## 🚀 Phase 6: Deployment

### Before Deploy

```bash
# 1. Test production build locally
npm run build
npm run preview

# 2. Verify all pages at http://localhost:4173
#    - Home
#    - Team
#    - Speakers
#    - Schedule
#    - Register
#    - About
#    - 404 (visit /random-page)
```

### Deploy Commands

```bash
# Vercel (Recommended)
npm i -g vercel
vercel login
vercel              # Deploy to staging
vercel --prod       # Deploy to production

# Netlify Alternative
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Post-Deploy

- [ ] Verify production URL works
- [ ] Test all pages on production
- [ ] Check mobile responsiveness
- [ ] Verify forms submit correctly
- [ ] Configure custom domain
- [ ] Set up SSL certificate (auto with Vercel/Netlify)
- [ ] Set up analytics (Google Analytics / Vercel Analytics)

---

## 📱 Social Media Images to Create

### Open Graph Image (1200x630px)
- TEDxSRKR logo
- "The Future of Ideas"
- March 15, 2026
- Save as: `public/og-image.jpg`

### Twitter Card (1200x675px)
- Similar to OG image, 16:9 ratio
- Save as: `public/twitter-card.jpg`

### Favicons
- 16x16px: `public/favicon-16x16.png`
- 32x32px: `public/favicon-32x32.png`
- 180x180px: `public/apple-touch-icon.png`

**Tool**: Use [Canva](https://canva.com) or [Figma](https://figma.com)

---

## 🔧 Environment Variables

Update `.env.production`:

```env
VITE_APP_TITLE=TEDxSRKR 2026
VITE_EVENT_DATE=2026-03-15
VITE_SITE_URL=https://your-actual-domain.com
VITE_GA_ID=G-YOUR-GA-ID
```

---

## 📊 Success Metrics

After launch, monitor:

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| Lighthouse Score | 90+ |
| Mobile Usability | 100% |
| Registration Conversions | Track |

---

## ☑️ Final Sign-off

- [ ] Lead Developer approval
- [ ] Organizer approval
- [ ] Domain configured
- [ ] Launch announcement ready
- [ ] Social media posts scheduled

**Target Launch Date**: _______________

**Deployed URL**: _______________
