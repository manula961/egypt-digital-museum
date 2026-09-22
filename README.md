# Egypt Digital Museum

An immersive, responsive digital museum experience built for the CyberNex project.

## Stack
- Next.js 16 App Router
- React 19
- React Three Fiber + Drei + Three.js
- Responsive CSS with reduced-motion support
- Vercel deployment

## Features
- Responsive museum landing page
- Searchable and filterable artifact collection
- Accessible artifact detail modal
- Egyptian history timeline
- Interactive 3D pyramid gallery
- Museum day/night mode
- Mobile navigation
- Loading, error and not-found states
- Keyboard focus states and reduced-motion support

## Project structure

    app/
      page.jsx
      layout.jsx
      globals.css
      loading.jsx
      error.jsx
      not-found.jsx
    components/
      Navigation.jsx
      ArtifactCard.jsx
      ArtifactModal.jsx
      MuseumScene.jsx
    data/
      artifacts.js
    vercel.json

## Development

    npm install
    npm run dev

Open http://localhost:3000.

## Production check

    npm run build
    npm start

## Security
No passwords, private credentials, or service secrets are stored in the repository. Any future backend/auth integration should use environment variables and server-side authorization/RLS rather than committed credentials.

## Deployment
The repository is connected to Vercel and `vercel.json` explicitly selects the Next.js framework.
