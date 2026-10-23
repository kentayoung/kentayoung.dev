# [KentaYoung.dev](https://KentaYoung.dev)

Personal portfolio site for Kenta Young, a Software Engineer and Photographer based in Idaho. It has a home page, project case studies, and a photography gallery.

## Stack

- **Astro** (static, no client framework)
- **Tailwind CSS v4**
- **Cloudinary**: image hosting and optimization (gallery and masthead)
- **Firebase Hosting**: deployment
- **Google Analytics 4**: via gtag.js

## Development

```bash
nvm use   # Node 24, see .nvmrc
npm install
npm run dev
```

## Project structure

```
src/pages/        one file per route (index, photography, work/needed-catalog-migration)
src/components/   page sections, navbar, footer, icons
src/layouts/      shared <head>, meta tags, structured data, navbar
src/styles/       global.css (Tailwind plus the masthead and menu styles)
src/data/         generated gallery data and inline SVG icons
public/           static files: resume PDF, favicons, sitemap.xml, llms.txt, 404 page
```

To add a case study, copy `src/pages/work/needed-catalog-migration.astro`, add an entry to `projects` in `src/data/work.js` (it shows up on the home page and on `/work`), and add the page to `public/llms.txt`. The sitemap is generated from the same list in `src/pages/sitemap.xml.js`, so it needs no edit. Smaller projects go in `more` in the same file.

## Design tokens

Colors, spacing, and breakpoints are defined once in `src/styles/global.css` under `@theme`. Use these instead of one-off values.

| Token | Utility | Used for |
|---|---|---|
| `--color-dark` | `bg-dark`, `text-dark` | Page background |
| `--color-surface`, `--color-surface-hover` | `bg-surface`, `hover:bg-surface-hover` | Cards and filled pills |
| `--color-line` | `border-line` | Card and pill borders |
| `--color-nav` | `bg-nav` | Navbar |
| `--color-ink` | `text-ink` | Main text (use `/80` and `/60` for muted text) |
| `--color-seafoam` | `text-seafoam`, `bg-seafoam` | Accent |
| `--radius-card` | `rounded-card` | Card corners (10px) |
| `--spacing-nav` | `h-nav`, `mt-nav` | Navbar height (64px) |
| `--spacing-section` | `pb-section`, `py-section` | Space between sections (70px) |
| `--breakpoint-nav` | `nav:`, `max-nav:` | Where the menu switches (900px) |

Shared styles: `container-page` and `container-wide` (page gutters), `section-title`, `eyebrow` (small uppercase label), `card`, `pill` and `pill-filled`, and `btn` with `btn-primary` or `btn-outline`.

## Image generation

Gallery images are fetched from Cloudinary at build time by tag (`automotive gallery`, `travel gallery`) and written to `src/data/images.js`. Requires credentials in `.env.local`:

```
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

```bash
npm run generate   # fetch images from Cloudinary
npm run build      # runs generate then builds
```

## Deployment

Deployed automatically to Firebase Hosting on push to `main` via GitHub Actions. Requires the following repository secrets:

| Secret | Purpose |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT_KENTA_YOUNG` | Firebase deploy auth |
| `ENV_FILE` | Full contents of `.env` |
| `CLOUDINARY_API_KEY` | Cloudinary image fetch at build time |
| `CLOUDINARY_API_SECRET` | Cloudinary image fetch at build time |

To deploy by hand (for example when CI is failing), log in with `firebase login` and run:

```bash
npm run build
firebase deploy --only hosting --project kenta-young
```

For a temporary preview URL instead of production, use `firebase hosting:channel:deploy <name> --project kenta-young`.
