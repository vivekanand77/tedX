# TEDxSRKR 2026 Website

> Official website for TEDxSRKR 2026 - Ideas Worth Spreading

**Stack:** React 19 • Vite • TypeScript • Tailwind CSS • Framer Motion • Supabase

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📋 Pre-Deployment Checklist

### 🔴 Critical (Must Complete)

| Task | File | Status |
|------|------|--------|
| Add Supabase credentials | `.env.local` | ⬜ |
| Run database migration | `supabase/migrations/001_create_registrations.sql` | ⬜ |
| Replace speaker images (4) | `constants.ts` lines 6-9 | ⬜ |
| Replace team images (17) | `constants.ts` lines 37-244 | ⬜ |
| Add social media URLs | `components/Footer.tsx` lines 7-10 | ⬜ |
| Complete team LinkedIn URLs | `constants.ts` (search `linkedin.com/in/`) | ⬜ |
| Complete team Instagram URLs | `constants.ts` (search `instagram.com/`) | ⬜ |
| Create og-image.jpg (1200x630) | `public/og-image.jpg` | ⬜ |
| Create twitter-card.jpg (1200x675) | `public/twitter-card.jpg` | ⬜ |
| Create favicon files | `public/favicon-*.png` | ⬜ |

### 🟡 Recommended (Before Launch)

| Task | Notes |
|------|-------|
| Update schedule year | `constants.ts` line 14 says "2025" - should be "2026" |
| Add Google Analytics | Add `VITE_GA_ID` to `.env.production` |
| Set up email confirmations | Install Resend or SendGrid |
| Test registration flow | Submit test registration, check Supabase |

### 🟢 Optional Enhancements

| Task | Notes |
|------|-------|
| Migrate rate limiting to Redis | Use Upstash for production scale |
| Add admin dashboard | View/export registrations |
| Add privacy policy | `/privacy` route |

---

## 🔧 Environment Variables

### Required (`.env.local`)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-key
```

### Optional
```bash
VITE_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxx
```

---

## 📁 Project Structure

```
├── api/                    # Vercel serverless functions
│   └── register.ts         # Registration endpoint
├── components/             # React components
├── lib/                    # Utilities (Supabase, validators, rate limiting)
├── pages/                  # Route pages
├── public/                 # Static assets
├── supabase/migrations/    # Database schema
├── constants.ts            # Speakers, team, schedule data
└── types.ts                # TypeScript interfaces
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import in Vercel Dashboard
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

### Custom Domain
1. Add domain in Vercel
2. Update DNS records
3. Update `VITE_SITE_URL` in environment
4. Update `og:url` in `index.html`

---

## 📍 Content Locations

| Content | File | Lines |
|---------|------|-------|
| Speakers | `constants.ts` | 5-10 |
| Schedule | `constants.ts` | 12-22 |
| Team | `constants.ts` | 25-247 |
| Stats | `constants.ts` | 250-255 |
| Footer social links | `components/Footer.tsx` | 6-11 |
| SEO meta tags | `index.html` | 8-32 |

---

## ✅ What's Working

- ✅ Registration form → Supabase
- ✅ Mobile responsive navigation
- ✅ Dynamic page titles
- ✅ Skip-to-content accessibility
- ✅ Rate limiting on API
- ✅ Form validation (frontend + backend)
- ✅ SEO meta tags configured
- ✅ sitemap.xml & robots.txt

---

*Last updated: 2026-02-04*
