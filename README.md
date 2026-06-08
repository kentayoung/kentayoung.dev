# [KentaYoung.dev](https://KentaYoung.dev)

Personal portfolio site for Kenta Young — Software Engineer and Photographer based in Idaho.

## Stack

- **React** + **Vite**
- **Tailwind CSS v4**
- **Cloudinary** — image hosting and optimization (gallery + masthead)
- **Firebase Hosting** — deployment
- **Google Analytics 4** — via gtag.js

## Development

```bash
npm install
npm run dev
```

## Image generation

Gallery images are fetched from Cloudinary at build time by tag (`automotive gallery`, `travel gallery`) and written to `src/components/imageGallery/images.jsx`. Requires credentials in `.env.local`:

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
| `ENV_FILE` | Full contents of `.env` (Firebase + Vite config) |
| `CLOUDINARY_API_KEY` | Cloudinary image fetch at build time |
| `CLOUDINARY_API_SECRET` | Cloudinary image fetch at build time |
