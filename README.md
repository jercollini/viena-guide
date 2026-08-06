# Vienna Guide

A small, mobile-first web app with the essential information for a short trip to
Vienna: must-see places, where to eat, how to get around, useful German phrases,
emergency contacts, an interactive map and live weather.

It was built to be dead simple to use on a phone, so travelers can find
everything they need at a glance — no accounts, no ads, no clutter. The app UI
is in Spanish; the codebase is in English.

## Tech

- React + Vite + TypeScript
- Maps via OpenStreetMap (Leaflet) and weather via Open-Meteo — both free and
  key-less
- Vitest + React Testing Library for component tests
- Deployed as a static site to GitHub Pages

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the local dev server
npm run build    # production build
npm test         # run the test suite
npm run coverage # run tests with coverage
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the app and
publishes it to GitHub Pages.

### Workflow

The deployment workflow is defined in `.github/workflows/deploy.yml` and:

- installs dependencies with `npm ci`
- runs the production build with `npm run build`
- uploads the generated `dist` folder as a GitHub Pages artifact
- deploys that artifact through the GitHub Pages action

### Notes

- The Vite `base` in `vite.config.ts` must match the repository name so asset
  paths resolve correctly on GitHub Pages.
- GitHub Pages must be enabled for the repository and set to use the
  `GitHub Actions` source in the repository Settings.
- If deployment appears to hang in a queued state, check the Pages settings and
  the workflow run logs for repository-level permission or configuration issues.

