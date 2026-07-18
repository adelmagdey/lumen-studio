# Changelog

## 0.1.0 — MVP (2026-07-16)

Initial release. Feature-complete MVP with:

### Marketing
- Hero with real 3D Three.js scene (icosahedrons, particles, parallax camera)
- Services grid (6 services, animated on scroll)
- Portfolio grid (6 projects, filterable, modal details)
- Pricing tiers (3 tiers, monthly/yearly toggle)
- Stats with count-up animation
- Testimonials carousel (5 testimonials, auto-rotate)
- CTA banner
- Contact form (saves to DB, validated, toasts)
- Footer with newsletter signup
- Sticky glassmorphism navbar with mobile menu

### Admin
- Login with NextAuth v5 + credentials
- Dashboard with 4 stat cards + recent activity
- Articles CRUD (bilingual en/ar, with Tiptap-ready content fields)
- Projects CRUD (bilingual, featured + order)
- Media library (drag & drop upload)
- Messages inbox (read/delete, mark as read)
- Users management (admin-only, role-based)
- Settings editor (site name, social links, etc.)
- Role-based access (USER / EDITOR / ADMIN)

### Infrastructure
- Bilingual i18n (en, ar) with RTL support
- Prisma + SQLite (easily swapped to Postgres)
- Tailwind v4 with custom design tokens
- Dark/light mode with system preference
- SEO: sitemap, robots, JSON-LD, OG, Twitter, hreflang
- PWA: manifest, service worker, offline fallback
- Docker + docker-compose
- Responsive (320px → 4K)
- Type-safe (TypeScript strict, no `any` in shared code)

### Known Limitations
- No automated tests (vitest + playwright recommended)
- SQLite for dev — Postgres recommended for production
- Service worker is custom (no push notifications yet)
- No real email service (logs to console in dev)
- Image upload goes to local filesystem (swap to S3 for prod)
