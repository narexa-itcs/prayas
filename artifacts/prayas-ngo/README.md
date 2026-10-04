# Prayas Sahyog Sewa Samiti — public website

A static React + TypeScript + Vite site for the community-service organization based in Bareilly, Uttar Pradesh. Its publication standard is intentionally evidence-led: names, numbers, dates, documents and activity outcomes remain clearly marked as pending until approved source material is provided.

## Run and build

From the workspace root:

```sh
pnpm install
pnpm --filter @workspace/prayas-ngo run dev
pnpm --filter @workspace/prayas-ngo run typecheck
pnpm --filter @workspace/prayas-ngo run build
```

The production build is written to `artifacts/prayas-ngo/dist/public/`. Configure the static host to serve that directory and rewrite unknown paths to `index.html` for SPA routes (`/about`, `/activities`, `/core-team`, `/members`, `/transparency`, `/documents`, `/contact`).

## Updating public content

- `src/data/content.ts` is the centralized source for organization copy, navigation, activity categories, planned activity data, member/team records, document records, contact email and page descriptions.
- Add approved, optimized activity images under `public/images/activities/`, then add each image's path, activity ID, caption and accurate alt text to `galleryPhotos` in `src/data/content.ts`. The home carousel advances automatically and supports touch, previous/next controls and a lightbox.
- Replace the initials-only `PS` identity mark in `src/App.tsx` with official brand assets only after they are supplied.
- Enter team/member details only after confirming role, spelling and permission to publish. Do not include personal phone numbers unless the person has explicitly authorized public display.
- Add document links only for organization-approved public files. Check files for private donor data, personal identifiers, credentials and other sensitive material before deployment.
- Enter real contact details only after confirming the official public address, monitored email and any authorized public phone number.
- Set `site.contactEmail` in `src/data/content.ts` only after confirming the monitored public inbox. The form then opens a prefilled draft in the visitor's email app; the visitor must send it, and the site cannot confirm delivery. For hosted form processing, integrate a trusted static-form provider without exposing API keys in client code.
- Impact examples from the source brief have not been displayed as verified statistics. Add figures only with source records and period/context.

There is no backend, database, admin interface, live message delivery or external API integration.