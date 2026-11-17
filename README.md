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

## Analytics

GA4 initializes only in production builds on `kentayoung.dev` and `www.kentayoung.dev`. The shared click handler and photography lightbox use `src/scripts/analytics.js`; they do nothing when `gtag` is unavailable and never prevent navigation or open a second window.

| Event | Trigger | Custom parameters |
|---|---|---|
| `email_click` | A `mailto:` link | `link_location`, `contact_intent` (`general` or `photography`) |
| `resume_click` | A same-site link marked `data-analytics-event="resume_click"` | `link_location`, `file_name` |
| `case_study_click` | A link to `/work/<slug>` | `link_location`, `project_slug` |
| `social_click` | A LinkedIn, GitHub, Instagram, or Facebook link | `link_location`, `platform`, `link_domain` |
| `photo_open` | Opening a gallery thumbnail in the lightbox | `gallery`, `photo_id` (Cloudinary image identifier) |

All custom events include `page_path` without its query string or fragment. The custom payloads do not include email addresses, mail subjects, full destination URLs, or link text. GA4's own automatically collected fields are separate from these custom payloads.

`link_location` comes from the nearest `data-analytics-location`, section ID, nav ID, or footer. Current placements include `home`, `about`, `work`, `work_index`, `contact`, `navbar`, `footer`, and `photo_contact`.

Use GA4 Enhanced Measurement for generic outbound `click` and `file_download` events instead of also sending `outbound_click`. These can coexist with the intent-specific events above, but should not be summed as separate user actions. A resume click is not a confirmed download, an email click is not a sent inquiry, and a case-study click is not proof the destination loaded. `photo_open` counts only thumbnail opens, not next/previous/keyboard browsing. Page views remain owned by the GA4 configuration; custom tracking sends no extra page views.

### GA4 property setup after deployment

1. Check the web stream's Enhanced Measurement settings for outbound clicks and file downloads. The repository cannot confirm those settings.
2. Create event-scoped custom dimensions for `link_location`, `contact_intent`, `project_slug`, `platform`, and `gallery` if those breakdowns are needed in reports. `photo_id` is optional for per-photo reporting.
3. Consider `email_click` a key event for contact intent. Keep resume, social, project, and gallery events as engagement measures unless the reporting goal calls for otherwise.
4. Use Tag Assistant / DebugView to verify the deployed site: one intended custom event per action, correct placement, and no extra page views. Debug mode is not enabled for ordinary visitors by this code.

References: [Enhanced Measurement](https://support.google.com/analytics/answer/9216061) and [GA4 event parameters](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

### Tests

Unit tests use Node's built-in test runner with no added dependencies:

```bash
node --test tests/analytics.test.js
npm run build
```

The optional Chromium test exercises the built site, nested SVG clicks, working resume PDF, actual case-study navigation, both galleries, missing analytics, and the production hostname initialization. It blocks external requests so test traffic never reaches GA4. Install Playwright and its Chromium browser outside this repository, then run the preview and tests in separate terminals:

```bash
npm run preview -- --host 127.0.0.1 --port 4321
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node --test tests/*.test.js
```

Override `ANALYTICS_PREVIEW_URL` if using another preview port. Without `PLAYWRIGHT_MODULE`, the browser test is explicitly skipped. The browser test checks event dispatch and the local GA queue, not delivery into the real GA4 property.

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
