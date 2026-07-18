# Contributing to Lumen

Thanks for your interest in contributing! Here's how to get started.

## Local setup

```bash
git clone <repo>
cd premium-platform
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

## Project conventions

- TypeScript strict — no `any` in shared code.
- Always update both `messages/en.json` and `messages/ar.json`.
- Use semantic token classes (`bg-primary`, `text-muted-foreground`) — never raw hex.
- Server components by default. Add `"use client"` only when needed.
- Run `npm run build` before opening a PR.

## Pull request flow

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Run `npm run build` and verify it passes
5. Open a PR with a clear description of what + why

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add contact form`
- `fix: resolve RTL padding issue`
- `chore: upgrade next to 15.2`
- `docs: update README with new env vars`

## Code style

- 2-space indent
- Single quotes for strings
- Trailing commas (enforced by Prettier — `npx prettier --write .`)

## Reporting issues

Use the GitHub issue tracker. Include:
- A clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
