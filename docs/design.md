# Lumen Studio — Design System

This is the canonical design doc for the Lumen platform. It is the contract
that all UI work — marketing, admin, future modules — must follow.

---

## 1. Color tokens

Colors are CSS variables defined in `app/globals.css` and re-exported to
Tailwind via `@theme inline`. Always use the semantic class names, never raw
hex values.

### Semantic tokens

| Token                  | Light              | Dark               | Usage                            |
| ---------------------- | ------------------ | ------------------ | -------------------------------- |
| `bg-background`        | near-white         | near-black         | Page background                  |
| `bg-foreground`        | near-black         | near-white         | Default text                     |
| `bg-card`              | white-tinted       | dark-tinted        | Card surfaces                    |
| `text-card-foreground` | same as foreground | same as foreground | Text inside cards                |
| `bg-muted`             | light gray         | dark gray          | Muted backgrounds                |
| `text-muted-foreground`| mid gray           | mid gray           | Muted text                       |
| `bg-accent`            | very light brand   | dark brand         | Hover states, callouts           |
| `border-border`        | light border       | dark border        | All borders                      |
| `bg-primary`           | brand-600          | brand-500          | Primary buttons, links           |
| `bg-secondary`         | light gray         | dark gray          | Secondary buttons                |
| `bg-destructive`       | red                | red                | Destructive actions              |
| `bg-success`           | green              | green              | Success states                   |
| `bg-warning`           | amber              | amber              | Warning states                   |

### Brand palette

`brand-50` → `brand-900`. Used for gradients, shadows, and the brand glow.
The "gradient" variant of `Button` uses `brand-500 → brand-700`.

### Glassmorphism

- `glass` — translucent with 16px blur, used in nav, cards, modals.
- `glass-strong` — more opaque, used for modals over busy backgrounds.
- `glass-subtle` — 8px blur, used in footer and dividers.

---

## 2. Typography

Two families loaded via `next/font`:

- **Inter** (latin) — `var(--font-inter)`. Set in `app/[locale]/layout.tsx`.
- **Cairo** (arabic) — `var(--font-cairo)`. Set in the same layout, applied
  to `<body>` when locale is `ar`.

### Scale

| Class       | Size  | Use                  |
| ----------- | ----- | -------------------- |
| `text-xs`   | 12px  | Captions, meta       |
| `text-sm`   | 14px  | Body small, buttons  |
| `text-base` | 16px  | Body                 |
| `text-lg`   | 18px  | Lead                 |
| `text-xl`   | 20px  | Section titles       |
| `text-2xl`  | 24px  | Card titles          |
| `text-3xl`  | 30px  | Section H2 (mobile)  |
| `text-4xl`  | 36px  | Section H2           |
| `text-5xl`  | 48px  | Page H1 (mobile)     |
| `text-6xl`  | 60px  | Page H1              |
| `text-7xl`  | 72px  | Hero (desktop)       |

Display titles use `text-balance` for even wrapping. Body uses `text-pretty`.

---

## 3. Spacing

Tailwind's default scale. Common rhythms:

- Section vertical: `py-16 sm:py-20` (md) / `py-20 sm:py-28` (lg) / `py-24 sm:py-36` (xl)
- Section container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Card padding: `p-6` or `p-8`
- Component gap: `gap-2` (tight) / `gap-4` (default) / `gap-6` (loose) / `gap-8` (hero)

---

## 4. Radius

- `rounded-md` — buttons, inputs (default: 0.75rem)
- `rounded-lg` — small cards
- `rounded-xl` — cards, sections
- `rounded-2xl` — modals, big containers
- `rounded-3xl` — hero cards

---

## 5. Shadows

- `shadow-soft` — subtle elevation
- `shadow-elevated` — modals, hover
- `shadow-glow` — branded glow, used on CTAs

---

## 6. Components

All in `components/ui/`. Type-safe, no `any`.

### `<Button>`

`variant`: `default | destructive | outline | secondary | ghost | glass | gradient | link`
`size`: `default | sm | lg | icon`

```tsx
<Button variant="gradient" size="lg">Get started</Button>
<Button asChild variant="glass"><Link href="/contact">Contact</Link></Button>
```

### `<Card>`

```tsx
<Card glass>...</Card>
```

### `<Input>` / `<Textarea>` / `<Label>`

Standard form primitives. Use with `react-hook-form` + zod.

### `<Section>`

Wraps content with consistent vertical spacing. `id` prop for anchor nav.

```tsx
<Section id="services" spacing="lg">...</Section>
```

### `<Container>`

Max-width container with responsive padding.

---

## 7. Animations

### Framer Motion

Used for hero entrance, section reveal-on-scroll, modals, carousels.

Pattern for scroll reveal:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

Pattern for stagger:
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }}
>
  <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} />
</motion.div>
```

### GSAP

Not used in MVP. Reserved for scroll-triggered timeline animations in
future iterations (hero scroll narrative, etc).

### Custom CSS animations

Defined in `app/globals.css`:
- `animate-float` — slow vertical drift
- `animate-pulse-slow` — opacity pulse
- `animate-shimmer` — gradient sweep
- `animate-gradient` — gradient position animation (used in `text-gradient`)
- `animate-fade-up` — simple fade-in

All animations respect `prefers-reduced-motion` (see globals.css).

---

## 8. Layouts

Three primary route groups:

- `app/[locale]/(marketing)/` — public site, uses Navbar + Footer.
- `app/[locale]/(admin)/admin/` — protected admin shell.
- `app/[locale]/(auth)/` — centered, decorative background, used for login.

---

## 9. i18n

- Locales: `en` (default, LTR) and `ar` (RTL).
- Messages in `messages/en.json` and `messages/ar.json`. Always update both.
- Use `useTranslations("namespace")` in client components.
- Use `getTranslations("namespace", { locale })` in server components.
- For plurals, use `useTranslations` with `{ count }`.
- For raw arrays/objects, use `t.raw("key")`.

RTL behavior:
- `<html lang dir>` is set per locale.
- For directional icons (chevrons, arrows), use the `rtl:` variant or
  manually flip with CSS transforms.

---

## 10. Auth flow

- NextAuth v5 with PrismaAdapter, JWT session strategy.
- Credentials provider: email + bcrypt password.
- Roles: `USER`, `EDITOR`, `ADMIN`. Stored as String (SQLite).
- Middleware (`middleware.ts`) protects `/[locale]/admin/*` — redirects
  to `/{locale}/login` if no session.
- Admin layout also checks session in `app/[locale]/(admin)/admin/layout.tsx`
  as a defense in depth.
- `User` and `Role` checks live in Server Actions (`requireSession`,
  `requireAdmin` helpers in `app/[locale]/(admin)/admin/_actions/*`).

Demo credentials (seeded):
- `admin@example.com` / `admin123` — full access
- `editor@example.com` / `editor123` — no user management

---

## 11. Database

SQLite via Prisma. Schema in `prisma/schema.prisma`.

Models:
- `User` — accounts, roles, password (bcrypt)
- `Account`, `Session`, `VerificationToken` — NextAuth
- `Article` — bilingual content (en/ar), published flag, tags
- `Project` — bilingual content, featured, order, category
- `Media` — uploaded files, with optional width/height
- `Message` — contact form submissions, read flag
- `Setting` — key-value site configuration

All `*Ar` fields are written and read by both locales — never nullable for
required content.

---

## 12. File structure

```
app/
  [locale]/
    (marketing)/
      layout.tsx          # marketing shell (Navbar + Footer)
      page.tsx            # home (Hero + sections)
    (admin)/
      admin/
        layout.tsx        # admin shell (sidebar)
        page.tsx          # dashboard
        articles/
        projects/
        media/
        users/
        messages/
        settings/
        _actions/         # server actions
        _components/      # admin-only components
    (auth)/
      login/
  api/
    auth/[...nextauth]/   # NextAuth handler
    contact/              # contact form POST
    upload/               # (future) media upload via API
  layout.tsx              # root (passes children through)
  globals.css             # tokens + utilities

components/
  ui/                     # shared primitives
  sections/               # marketing sections
  three/                  # 3D scene components
  admin/                  # admin-only shared components
  theme-provider.tsx

lib/
  db.ts                   # Prisma client singleton
  utils.ts                # cn, slugify, formatBytes, formatDate
  validations.ts          # zod schemas
  i18n.ts                 # (deprecated; use i18n/routing.ts)
  types.ts                # shared TS types

i18n/
  request.ts              # next-intl getRequestConfig
  routing.ts              # defineRouting + createNavigation

messages/
  en.json
  ar.json

prisma/
  schema.prisma
  seed.ts

middleware.ts             # next-intl + admin auth protection
auth.ts                   # NextAuth v5 config
```

---

## 13. Conventions

- Type-safe throughout. No `any` in shared code.
- Server components by default. Add `"use client"` only when needed.
- Always use semantic token classes, never raw `bg-[#...]`.
- Always set `dir="rtl"` on form inputs in Arabic.
- Always update both `en.json` and `ar.json` together.
- Always add `loading.tsx` and `error.tsx` for new route segments.
- Always run `pnpm build` before declaring a feature done.
