# QRForge — Free QR Generator

A modern, responsive, fully free static QR generator built with **React + TypeScript + Vite**. No sign-in, server, or paid API required.

## Start locally

Requires Node.js 20.19+ (or Node 22.12+).

```bash
npm install
npm run dev
```

Open the address shown in your terminal (usually http://localhost:5173).

## Production build

```bash
npm run build
```

The generated `dist/` folder is ready for static hosting. Relative asset URLs keep the app working under a GitHub Pages repository path.

## Deploy to GitHub Pages

1. Push this project to the `main` branch of your GitHub repository. Include the hidden `.github/` folder and `package-lock.json`; omit `node_modules/` and `dist/`.
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
3. Open **Actions → Deploy QRForge to GitHub Pages** and run the workflow, or push a commit to `main`.
4. When the deployment succeeds, open the URL shown by the `github-pages` environment. For a repository named `qrforge`, it will normally be `https://<username>.github.io/qrforge/`.

Later pushes to `main` rebuild and publish automatically. Home, generator, history and information pages use hash links, so page navigation and refreshes work on static hosting. No hosting secrets or QR API keys are required.

## Features

- Dedicated Home and About pages with a shared QR illustration, an animated scan line on Home, content-type shortcuts and scroll reveals that respect reduced-motion preferences.
- 11 QR content formats: URL, text, Wi-Fi, email, phone, SMS, WhatsApp, location, vCard, social link and payment URL/details.
- Realtime styled QR preview, QR dot patterns, custom colors, gradients and logo. Color updates reuse cached QR geometry; high-resolution exports are prepared after selection pauses.
- PNG, SVG and JPG downloads at 1024 × 1024. Files are prepared before clicking, then downloaded through native browser links. PNG/SVG preserve transparency; JPG uses a white background.
- Browser-local download history (last 20 codes), no account.
- Light/dark themes with consistent contrast, system preference detection, saved theme choice and responsive layouts.
- Encodes **static** QR data. Destinations cannot be edited once generated, except by controlling the destination URL yourself. No scan analytics or hosted redirects.

### Implementation notes

QR generation uses the open-source `qr-code-styling` library in the browser. Logos and images should be small so they do not interfere with QR scanning. Payments encode a link or text, **not** an integrated payment processing service. History is stored on the user's device through `localStorage` and can be cleared any time.

External Google Fonts are purely cosmetic; if offline they fall back to system fonts.
