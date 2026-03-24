# Ivan Pavlovic Portfolio v2

This repository contains the second iteration of my personal portfolio, built as a production-focused React application with a strong emphasis on animation, responsive layout work, and clean frontend architecture. The project is designed to be easy to continue evolving locally while also deploying automatically to GitHub Pages after every push to `main`.

The stack is centered around Vite, React 19, TypeScript, React Router, GSAP, Framer Motion, and modern CSS. The codebase is organized around reusable layout and UI components, route-level pages, and dedicated style files, which keeps presentation work fast without sacrificing maintainability.

## Local Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:3000`.

For quality checks and production builds, use:

```bash
npm run lint
npm run type-check
npm run build
```

## Environment Configuration

The project includes an `.env.example` file for EmailJS and basic app metadata. Create a local environment file before wiring the contact flow to a real EmailJS account:

```bash
cp .env.example .env.local
```

Populate the EmailJS values with your service ID, template ID, and public key. If you are not using the contact integration yet, the rest of the site will still work without those values.

## Project Structure

The application lives in `src/`, where route pages are separated from reusable layout and UI components. Static assets are stored under `src/assets`, and global styling is split into dedicated CSS files inside `src/styles`. This keeps high-motion sections, page layouts, and reusable primitives easier to reason about during iteration.

The router is configured in `src/App.tsx`, and the Vite deployment base is configured in `vite.config.ts`. Both are already prepared for GitHub Pages deployment under the `portfoliov2` repository path.

## Deployment

This repository is configured for GitHub Pages via GitHub Actions. A workflow lives at `.github/workflows/deploy.yml` and runs on every push to `main`. The workflow installs dependencies, builds the app, creates a `404.html` SPA fallback for React Router, and publishes the generated `dist/` output to GitHub Pages.

Once GitHub Pages is enabled for this repository, the expected deployment URL is:

```text
https://ivanpavlovic-web.github.io/portfoliov2/
```

That means the normal day-to-day publishing flow stays simple:

```bash
git add .
git commit -m "Describe the change"
git push
```

After the push completes, GitHub Actions handles the build and deploy automatically.

## Notes For Developers

This codebase intentionally favors direct, readable component composition over over-abstracted helper layers. Animation-heavy sections are implemented close to the UI they affect, while shared behavior is extracted into hooks and utilities only when that improves clarity. If you are extending the site, the safest workflow is to make the change, run `npm run build`, and then push to `main` once the output is clean.
