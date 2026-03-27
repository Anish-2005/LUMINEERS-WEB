# Lumineers

<p align="center">
  <img src="./public/favicon.svg" alt="Lumineers logo" width="92" height="92" />
</p>

<p align="center">
  <strong>Travel stories and journals with a modern editorial experience.</strong>
</p>

<p align="center">
  <a href="https://lumineers-web.vercel.app"><img src="https://img.shields.io/badge/live-lumineers--web.vercel.app-2563eb?style=for-the-badge" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-0ea5e9?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-7c3aed?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/PWA-enabled-db2777?style=for-the-badge" alt="PWA enabled" />
</p>

---

## Product Preview

<p align="center">
  <img src="./public/image.png" alt="Lumineers preview" width="920" />
</p>

## Why Lumineers

Lumineers is a travel publishing platform where explorers can:

- Write and publish rich travel journals.
- Browse curated stories in a visual blog gallery.
- Authenticate with Google and manage author identity.
- Share cover imagery, tags, and readable long-form narratives.
- Benefit from built-in SEO metadata and PWA support.

## Core Features

| Area | Included |
| --- | --- |
| Experience | Home, Blogs, Upload flows with consistent brand UI |
| Auth | Google Sign-In using Firebase Authentication |
| Content | Story creation + Firestore persistence |
| Discovery | Search, sorting, pagination, modal reading |
| Quality | Error boundaries, loading/empty states, responsive UI |
| SEO | Canonicals, Open Graph/Twitter cards, `robots.txt`, `sitemap.xml`, JSON-LD |
| PWA | Manifest + service worker via `next-pwa` |

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Firebase (Auth, Firestore, Storage, Analytics)
- Jest + Testing Library

## Project Structure

```text
lumineers-web/
├─ app/
│  ├─ blogs/
│  ├─ upload/
│  ├─ components/
│  ├─ layout.js
│  ├─ page.js
│  ├─ robots.js
│  └─ sitemap.js
├─ public/
│  ├─ favicon.svg
│  ├─ image.png
│  └─ manifest.json
├─ __tests__/
├─ next.config.mjs
└─ package.json
```

## Local Development

### 1) Install

```bash
npm install
```

### 2) Configure environment

Create `.env.local` with your Firebase web app config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### 3) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm test         # Run tests
```

## SEO and Indexing

Production target: `https://lumineers-web.vercel.app`

Implemented:

- Global metadata with canonical base URL
- Route metadata for `/`, `/blogs`, and `/upload`
- Structured data (`Organization`, `WebSite`)
- Generated `robots.txt` and `sitemap.xml`
- Social metadata for Open Graph and Twitter cards

Indexing policy:

- `index,follow`: `/`, `/blogs`
- `noindex,follow`: `/upload`

## Deployment

The app is optimized for Vercel deployment.

```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, standards, and pull request workflow.

## License

Licensed under the MIT License. See [LICENSE](./LICENSE).
