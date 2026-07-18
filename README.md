# Lumen — A Premium Studio Platform

A production-grade, bilingual (English + Arabic, RTL-ready) studio website with
admin dashboard, 3D hero, real authentication, and PWA support. Built with
Next.js 15, React 19, Tailwind v4, Prisma, NextAuth v5, and Three.js.

> **Status:** MVP — feature-complete, ready to deploy to Vercel or Docker.

---

## ✨ Features

- **Next.js 15** with App Router, React 19, TypeScript (strict)
- **Tailwind v4** with custom design tokens (CSS variables, light + dark)
- **3D Hero** with real Three.js scene (icosahedrons, particles, parallax camera)
- **Framer Motion** + GSAP-ready animation system
- **Glassmorphism** design language (`.glass`, `.glass-strong`, `.glass-subtle`)
- **i18n** with `next-intl` — full English + Arabic translations, RTL support
- **Auth** with NextAuth v5 + PrismaAdapter + bcrypt credentials
- **Admin Dashboard** — Articles, Projects, Media, Users, Messages, Settings
- **Server Actions** for all mutations (type-safe, role-checked)
- **Prisma + SQLite** (one-command DB setup)
- **PWA-ready** — manifest, service worker, offline fallback
- **SEO** — sitemap, robots, JSON-LD, OG, Twitter, hreflang
- **Responsive** — mobile-first, works at 320px to 4K
- **Type-safe** throughout (no `any` in shared code)
- **Docker** support — single command deploy

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Set up the database + seed sample data
npx prisma db push
npx tsx prisma/seed.ts

# 3. Run dev server
npm run dev
```

Visit:
- **Public site:** http://localhost:3000/en (or `/ar` for Arabic)
- **Admin login:** http://localhost:3000/en/login
  - Email: `admin@example.com`
  - Password: `admin123`
- **Editor login:** `editor@example.com` / `editor123`

---

## 🛠 Tech Stack

| Layer        | Tech                                      |
| ------------ | ----------------------------------------- |
| Framework    | Next.js 15, React 19                      |
| Language     | TypeScript (strict)                       |
| Styling      | Tailwind CSS v4, CSS custom properties    |
| Animation    | Framer Motion, GSAP (ready)               |
| 3D           | Three.js, @react-three/fiber, @react-three/drei |
| i18n         | next-intl                                 |
| Auth         | NextAuth v5 (beta) + PrismaAdapter        |
| Database     | Prisma + SQLite (swap to Postgres in prod)|
| Forms        | react-hook-form + zod                     |
| Email        | Resend (or Nodemailer)                    |
| PWA          | Custom service worker + manifest          |
| Validation   | zod                                       |
| Toasts       | sonner                                    |

---

## 📁 Project Structure

```
app/
  [locale]/
    (marketing)/         # Public site (Hero, Sections, Footer)
      layout.tsx
      page.tsx
    (admin)/admin/       # Admin dashboard (sidebar + nested CRUD)
      page.tsx           # Dashboard with stats
      articles/          # CRUD with bilingual content
      projects/          # CRUD with bilingual content
      media/             # Drag & drop upload
      users/             # Admin-only
      messages/          # Contact form inbox
      settings/          # Site config
      _actions/          # Server Actions (role-checked)
    (auth)/login/        # Centered auth layout
  api/
    auth/[...nextauth]/  # NextAuth handler
    contact/             # Contact form POST
  layout.tsx             # Root layout (passes through)
  globals.css            # Design tokens + utilities
  sitemap.ts             # Sitemap with hreflang
  robots.ts              # Robots.txt
public/
  manifest.json
  sw.js                  # Service worker
  favicon.svg
  icons/
  uploads/               # Media uploads
components/
  ui/                    # Shared primitives
  sections/              # Marketing sections
  three/                 # 3D scene components
  theme-provider.tsx
  admin/
i18n/
  request.ts             # next-intl getRequestConfig
  routing.ts             # defineRouting
messages/
  en.json
  ar.json
lib/
  db.ts                  # Prisma client singleton
  utils.ts               # cn, slugify, formatters
  validations.ts         # zod schemas
  types.ts
prisma/
  schema.prisma
  seed.ts                # 6 projects, 3 articles, 5 messages, 2 users
auth.ts                  # NextAuth v5 config
middleware.ts            # next-intl + admin protection
docs/
  design.md              # Canonical design system doc
Dockerfile
docker-compose.yml
```

---

## 🌍 Internationalization

- Locales: `en` (LTR) and `ar` (RTL)
- All user-facing strings live in `messages/{locale}.json`
- `<html lang dir>` is set automatically per locale
- Use `useTranslations("namespace")` in client components
- Use `getTranslations({ locale, namespace })` in server components

To add a new string:
1. Add the key to `messages/en.json` and `messages/ar.json`
2. Use it in the component: `t("yourKey")`

---

## 🔐 Auth + Roles

Roles: `USER`, `EDITOR`, `ADMIN`

- **Middleware** (`middleware.ts`) protects `/[locale]/admin/*`
- **Layout** (`app/[locale]/(admin)/admin/layout.tsx`) double-checks session
- **Server Actions** use `requireSession()` or `requireAdmin()` helpers
- **User management** is restricted to ADMIN role

Adding a new auth-protected page:
1. Place it under `app/[locale]/(admin)/admin/...`
2. The route group handles auth automatically
3. Use `auth()` server-side to access the session

---

## 🗄 Database

SQLite by default (file: `prisma/dev.db`). To switch to Postgres:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `DATABASE_URL` in `.env`
3. Run `npx prisma db push`

Migrations are managed via `prisma db push` (suitable for SQLite + early-stage Postgres).
For production, switch to `prisma migrate dev` / `prisma migrate deploy`.

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Set environment variables:
   - `DATABASE_URL` (use Vercel Postgres or external)
   - `AUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `AUTH_URL` (your Vercel URL)
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL)
4. Deploy

For SQLite on Vercel: **not recommended** — Vercel's filesystem is ephemeral.
Use Vercel Postgres or external DB.

### Docker

```bash
docker-compose up --build
```

The compose file mounts two volumes:
- `sqlite-data` — the SQLite database
- `uploads` — uploaded media files

### Self-hosted Node

```bash
npm install
npm run build
DATABASE_URL="file:./data/prod.db" npm start
```

Behind a reverse proxy (nginx, Caddy) with HTTPS.

---

## 📜 Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable               | Required | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `DATABASE_URL`         | ✅       | Prisma connection string                 |
| `AUTH_SECRET`          | ✅       | NextAuth secret (32+ random bytes)       |
| `AUTH_URL`             | ✅       | Base URL (e.g. `https://example.com`)    |
| `NEXT_PUBLIC_SITE_URL` | ✅       | Public base URL (for OG, sitemap)        |
| `RESEND_API_KEY`       | ⛔       | Resend API key (for transactional email) |

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## 🗺 Roadmap (Post-MVP)

- [ ] Stripe / Tap / PayPal integration
- [ ] Web push notifications (real service worker push)
- [ ] S3 / R2 file storage (replace local uploads)
- [ ] OAuth providers (Google, GitHub) — stubs already in NextAuth config
- [ ] Real email service (Resend / Postmark)
- [ ] Image cropping in media library
- [ ] Search across articles + projects
- [ ] Analytics (Plausible / Umami)
- [ ] A/B testing
- [ ] MDX in articles
- [ ] AI-powered content suggestions

---

## 🧪 Testing (not included in MVP)

The MVP ships without automated tests. Recommended additions:
- **Unit:** Vitest + Testing Library for components
- **E2E:** Playwright for critical flows (login, contact, CRUD)
- **Visual:** Chromatic or Percy for design regression

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). PRs welcome.

---

Built with ❤️ by Lumen Studio. 2026.
