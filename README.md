# Patrick Dean Fox — Portfolio (static landing)

Minimal Next.js 15 portfolio site — no database, no AI, no server actions. Pure static page rendering from data in `lib/`.

This branch exists to get the site deployed cleanly on Vercel. AI/DB features from `main` can be layered back in on top after this ships.

## Stack

- **Framework:** Next.js 15 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Motion:** Framer Motion
- **Icons:** Lucide React

## Layout

```
app/          Next.js App Router (layout + home page)
components/   Page sections (Hero, About, Career, Projects, Resume, Contact, ...)
lib/          Static content + typed data
public/       Resume PDF, og-image, project screenshots, favicon
```

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve the production build
```

## Deploying to Vercel

1. Connect the repo at [vercel.com](https://vercel.com) → **Add New Project** → import `patrickdeanfox/Website`.
2. Framework auto-detects as Next.js. No env vars required.
3. Deploy.

After this branch is live on Vercel, you can merge/rebase the AI + DB feature work back on top.
