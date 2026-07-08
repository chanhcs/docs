<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

This project is on Next.js 16.2 (App Router). Doc locations inside `node_modules/next/dist/docs/`:

- `01-app/01-getting-started/` — core conventions (layouts/pages, fetching, mutating, caching, proxy)
- `01-app/02-guides/upgrading/version-16.md` — full list of v16 breaking changes
- `01-app/03-api-reference/` — per-API reference

Gotchas that differ from older Next.js:

- **Async request APIs**: `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` return Promises and must be awaited.
- **`middleware.ts` is now `proxy.ts`** (see `01-getting-started/16-proxy.md`).
- **Turbopack is the default** bundler for `dev` and `build`.
- **`next lint` was removed** — the `lint` script runs ESLint directly (flat config in `eslint.config.mjs`).
- **Caching**: new `updateTag`/`refresh` APIs alongside `revalidateTag`; `cacheLife`/`cacheTag` for Cache Components. `experimental.dynamicIO`/`useCache` no longer exist.
- Parallel routes require an explicit `default.js`.

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — typecheck (no dedicated script; `next build` also typechecks)
- No test framework is configured.

## Architecture

Fresh `create-next-app` scaffold (a Google Docs clone is the intended product; nothing is built yet).

- **App Router only** — routes live in `app/`; `app/layout.tsx` is the root layout (loads Geist fonts and `globals.css`).
- **Tailwind CSS v4** — configured through `@tailwindcss/postcss` and CSS (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`). There is no `tailwind.config.*` file; don't create one — customize the theme in CSS.
- **TypeScript** strict mode; path alias `@/*` maps to the repo root.
- React 19.2 — Server Components by default; add `"use client"` where needed.
