# Egypt Digital Museum

An immersive, responsive digital museum experience built for the CyberNex project.

## Stack
- Next.js 16 App Router
- React 19
- React Three Fiber + Drei + Three.js
- Supabase Auth + PostgreSQL + Row Level Security (RLS)
- Responsive CSS with dark/night mode, reduced-motion support and accessible focus states
- Vercel deployment

## Features
- Responsive museum landing page
- 74-object searchable collection with era and category filters
- Accessible artifact detail modal
- Egypt history timeline
- Interactive Three.js 3D gallery
- Museum day/night mode
- Mobile navigation
- Loading, error and not-found states
- Category browsing with robust object-type matching
- Supabase-backed museum categories and editable museum items
- Protected `/admin` area with server-side role checks
- Admin/editor RBAC enforced by Supabase RLS
- Single designated admin account: `admin@egyptdigitalmuseum.local`

## Admin
1. Open `/login`.
2. Sign in with the designated Supabase Auth account.
3. `/admin` is accessible only to authenticated users whose database role is `admin` or `editor`.
4. Only `admin@egyptdigitalmuseum.local` may hold the `admin` role; this restriction is enforced in PostgreSQL.
5. Regular visitors and authenticated users without an authorized role are redirected away from `/admin`.

The admin account is intentionally a project-only virtual identity. No password or service-role credential is stored in this repository.

## Project structure

    app/
      page.jsx
      layout.jsx
      globals.css
      login/page.jsx
      admin/page.jsx
      loading.jsx
      error.jsx
      not-found.jsx
    components/
      Navigation.jsx
      ArtifactCard.jsx
      ArtifactModal.jsx
      MuseumScene.jsx
      AdminPanel.jsx
    lib/supabase/
      client.js
      server.js
      proxy.js
    data/
      artifacts.js
    proxy.js
    vercel.json

## Development

    npm install
    npm run dev

Open http://localhost:3000.

## Production check

    npm run build
    npm start

## Environment variables

Set these in Vercel and local development:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

Only the publishable Supabase key belongs in browser-exposed environment variables. Never commit a service-role or secret key.

## Security
- Supabase RLS protects categories, museum items and user roles.
- Authorization is checked server-side before rendering `/admin`.
- PostgreSQL prevents any other email from receiving the `admin` role.
- No passwords, private credentials, or service secrets are stored in the repository.

## Deployment
The repository is connected to Vercel and uses the Next.js framework. The production deployment is generated from the `main` branch.

## Links
- GitHub: https://github.com/manula961/egypt-digital-museum
- Live site: https://egypt-digital-museum.vercel.app
