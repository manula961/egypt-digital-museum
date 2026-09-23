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

## Project Overview

Egypt Digital Museum is an interactive web experience that presents ancient Egyptian heritage through a modern digital interface. The project combines a searchable artifact collection, historical context, interactive visualization, responsive layouts, and a protected content-management area.

### Core experience

- **Discover:** Browse a curated collection of Egyptian artifacts.
- **Search:** Find artifacts quickly by title and descriptive content.
- **Explore by era:** Filter the collection across major historical periods.
- **Explore by category:** Browse architecture, sculpture, royal art, funerary art, writing, jewelry and craft, and religious art.
- **Learn:** Open detailed artifact views with historical descriptions and metadata.
- **Visualize:** Explore the interactive Three.js/R3F gallery and available 3D artifact models.
- **Follow the timeline:** Move through key periods of ancient Egyptian history.
- **Personalize:** Switch between museum day and night presentation modes.
- **Use on any device:** Responsive layouts support desktop, tablet and mobile screens.

## Design & UX

The interface is designed around a museum-inspired visual language while keeping navigation familiar and accessible.

- Responsive grid and mobile-first navigation
- Clear information hierarchy for artifact discovery
- Search and filtering designed for fast exploration
- Accessible focus states and semantic interactive controls
- Reduced-motion considerations
- Loading, error and not-found states
- Day/night presentation mode
- Interactive artifact detail modal
- 3D visualization separated from the main collection flow for progressive exploration

## Collection & Data

The application supports a structured museum catalog containing **74 collection objects** with metadata such as:

- Title and slug
- Historical era and date label
- Museum category
- Artifact type
- Description
- Symbol/icon
- Optional image
- Optional 3D model reference

Museum categories and editable content can be stored in Supabase PostgreSQL, allowing the collection to evolve without rebuilding the complete frontend catalog.

## Interactive 3D Gallery

The museum includes a Three.js-powered 3D experience built with React Three Fiber and Drei.

The gallery is designed to demonstrate how cultural objects can be presented beyond static images, with interactive camera and object presentation where supported. The application also includes graceful handling for models that are unavailable or still loading.

## Architecture

The project uses a modern Next.js App Router architecture:

- **Next.js:** Application framework, routing and server rendering
- **React:** Component-based UI
- **React Three Fiber / Drei / Three.js:** 3D museum experiences
- **Supabase:** Authentication, PostgreSQL data and Row Level Security
- **Vercel:** Production hosting and deployment
- **CSS:** Responsive visual system, themes and accessibility states

Server-side authorization is used for protected routes, while database Row Level Security provides an additional authorization boundary for museum data.

## Security

Security is treated as part of the application architecture rather than only a frontend feature.

- Supabase Row Level Security protects database tables.
- Protected routes perform server-side authentication and authorization checks.
- Database roles distinguish authorized management users from regular visitors.
- PostgreSQL constraints prevent unauthorized elevation to the designated administrator role.
- Browser-exposed configuration uses only the Supabase publishable key.
- Private credentials and service-role secrets are excluded from the repository.

## Accessibility

The interface includes accessibility-oriented implementation details such as:

- Keyboard-visible focus states
- Semantic buttons and controls
- Reduced-motion support
- Responsive text and layouts
- Clear interactive states
- Error and loading feedback
- Mobile-friendly navigation

## Performance & Reliability

The application includes production-oriented states and safeguards:

- Loading UI for asynchronous experiences
- Error boundaries for recoverable application failures
- Not-found handling
- Responsive asset presentation
- Progressive 3D loading behavior
- Server-side authorization before protected content is rendered

## Project Goals

The project was built to demonstrate how a cultural institution could translate a physical museum experience into an engaging digital platform while keeping the experience:

1. Educational
2. Interactive
3. Responsive
4. Accessible
5. Maintainable
6. Secure

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
