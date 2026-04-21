# Patrick Dean Fox — Portfolio Website

A [Next.js 15](https://nextjs.org/) portfolio site with an admin console, AI-assisted job-relevance analysis, and a Postgres-backed content store.

## Tech stack

- **Framework:** Next.js 15 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + Radix UI + shadcn/ui
- **Database:** PostgreSQL via Prisma 6
- **Auth:** NextAuth
- **Storage:** AWS S3 (resume/upload assets)
- **AI:** Anthropic Claude (Sonnet 4.6) for chat / job-relevance analysis, with prompt caching

## Project layout

```
app/          Next.js App Router routes (pages + API routes)
components/   React components (including shadcn/ui in components/ui)
lib/          Data, utilities, contexts, Prisma client, S3 helpers
hooks/        Custom React hooks
prisma/       Prisma schema
scripts/      Seed / maintenance scripts
public/       Static assets (images, resume PDF, og-image, favicon)
docs/         Background context (not served by the app)
```

## Local development

```bash
pnpm install
cp .env.example .env   # then fill in the values below
pnpm prisma generate
pnpm prisma migrate deploy   # or `pnpm prisma db push` for first setup
pnpm dev
```

App runs at http://localhost:3000.

### Required environment variables

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (pooled, for app traffic) |
| `DIRECT_URL` | Unpooled Postgres connection (for Prisma migrations). Required when using Neon / pgbouncer. |
| `NEXTAUTH_SECRET` | NextAuth session encryption |
| `NEXTAUTH_URL` | Canonical site URL (e.g. `https://your-domain.com`) |
| `ANTHROPIC_API_KEY` | Anthropic API key (chat + job-relevance analysis use Claude Sonnet 4.6) |
| `AWS_REGION` | e.g. `us-west-2` |
| `AWS_BUCKET_NAME` | S3 bucket for uploads |
| `AWS_FOLDER_PREFIX` | Key prefix inside the bucket |
| `AWS_ACCESS_KEY_ID` | S3 access key (Vercel can't use `AWS_PROFILE`) |
| `AWS_SECRET_ACCESS_KEY` | S3 secret |

## Deploying to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), **Add New Project** → import `patrickdeanfox/website`.
3. Framework preset is auto-detected as **Next.js**; leave the defaults.
4. Add every env var from the table above in **Project Settings → Environment Variables**.
5. Deploy. Subsequent pushes to `main` trigger production deploys; PRs get preview deploys.

The `postinstall` script runs `prisma generate` automatically so the Prisma client is built on every Vercel install. If you change the schema, run `pnpm prisma migrate deploy` against your production database before deploying.

### Using Vercel's managed Postgres (Neon)

In the Vercel dashboard: **Storage → Create Database → Neon**. Vercel auto-injects both `DATABASE_URL` (pooled) and `DIRECT_URL` (unpooled) into every environment — no manual config needed. `prisma/schema.prisma` already references both.

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — Next.js ESLint
- `pnpm prisma ...` — Prisma CLI
