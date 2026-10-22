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
src/pages/        one file per route (index, photography, work/needed)
src/components/   page sections, navbar, footer, icons
src/layouts/      shared <head>, meta tags, structured data, navbar
src/styles/       global.css (Tailwind plus the masthead and menu styles)
src/data/         generated gallery data and inline SVG icons
public/           static files: resume PDF, favicons, sitemap.xml, llms.txt, 404 page
```

To add a case study, copy `src/pages/work/needed.astro`, add an entry to `projects` in `src/data/work.js` (it shows up on the home page and on `/work`), and add the route to `public/sitemap.xml` and `public/llms.txt`. Smaller projects go in `more` in the same file.

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
