# Egypt Digital Museum 🏺

> A responsive, interactive digital museum experience for exploring ancient Egyptian heritage.

**Live:** https://egypt-digital-museum.vercel.app  
**GitHub:** https://github.com/manula961/egypt-digital-museum

## 1. Overview

Egypt Digital Museum is a full-stack Next.js application created for the CyberNex project. It combines a searchable museum collection, historical learning, interactive 3D visualization, responsive design, day/night presentation, authentication, RBAC, and a Supabase-powered content management system.

The public museum can be explored without an account. Administrative functionality is protected by server-side authentication and database-level authorization.

## 2. Visitor Experience

Visitors can:

- Browse a curated collection of 74 museum objects.
- Search the collection.
- Filter by historical era.
- Filter by museum category.
- Open detailed artifact views.
- Follow a visual history timeline.
- Explore available artifacts in an interactive 3D gallery.
- Switch between day and night museum presentation.
- Use the experience on desktop, tablet, and mobile.
- Continue using core museum information even when 3D content is unavailable.

## 3. Features

### Museum

- Responsive museum landing page
- 74-object collection
- Search
- Era filters
- Category filters
- Robust category/object-type matching
- Artifact detail modal
- Historical timeline
- Three.js 3D gallery
- Day/night mode
- Mobile navigation
- Loading, error, and not-found states
- Reduced-motion support
- Accessible focus states

### Administration

- Supabase authentication
- Protected /admin route
- Server-side authorization
- Admin/editor/viewer roles
- Museum item management
- Category management
- Admin-only destructive actions
- PostgreSQL Row Level Security

## 4. Collection

The current collection contains 74 objects.

Each museum item can contain:

| Field | Description |
|---|---|
| Title | Artifact name |
| Slug | Stable identifier |
| Era | Historical period |
| Date label | Human-readable date |
| Category | Museum classification |
| Item type | Object classification |
| Description | Educational information |
| Symbol | UI representation |
| Image URL | Optional image |
| Model ID | Optional 3D model |
| Timestamps | Creation/update tracking |

### Categories

- Architecture
- Sculpture
- Royal Art
- Funerary Art
- Writing
- Jewelry & Craft
- Religious Art

## 5. 3D Gallery

The interactive gallery uses:

- Three.js
- React Three Fiber
- Drei
- WebGL

It supports interactive object/camera presentation, model loading states, unavailable-model handling, and progressive 3D presentation.

The main museum experience does not depend exclusively on WebGL, so artifact information remains usable when a model cannot load.

## 6. Design & UX

The visual design combines Egyptian museum-inspired presentation with modern web interaction.

Design goals include:

- Clear visual hierarchy
- Fast discovery
- Responsive layouts
- Museum atmosphere
- Day/night presentation
- Accessible controls
- Consistent typography and spacing
- Mobile-first interaction patterns
- Clear loading and error feedback

The UI adapts collection grids, navigation, filters, modals, and interactive areas for desktop, tablet, and mobile screens.

## 7. Technology Stack

### Frontend

- Next.js 16
- React 19
- Next.js App Router
- JavaScript / JSX
- CSS

### 3D

- Three.js
- React Three Fiber
- Drei

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)

### Deployment

- Vercel

### Source control

- GitHub

## 8. Architecture

High-level application flow:

    Visitor
       |
       v
    Next.js application
       |
       +-- Museum UI
       +-- Search / filters
       +-- Artifact details
       +-- Timeline
       +-- 3D gallery
                 |
                 v
          Three.js / R3F

    Administrator
       |
       v
    Supabase Auth
       |
       v
    Server-side role check
       |
       v
    Admin Panel
       |
       v
    PostgreSQL + RLS

Responsibilities are separated between route-level pages, reusable components, museum data, Supabase utilities, and protected server-side operations.

## 9. Routes

| Route | Purpose | Access |
|---|---|---|
| / | Main museum | Public |
| /login | Authentication | Public |
| /admin | Content management | Authorized users |
| /loading | Loading UI | Framework state |
| /error | Error UI | Framework state |
| /not-found | Missing content UI | Framework state |

The /admin page verifies the authenticated session and database role before rendering protected content.

## 10. Authentication & RBAC

Supabase Auth handles login sessions.

Supported application roles:

- admin
- editor
- viewer

The authorization flow is:

    /login
       |
       v
    Supabase Auth
       |
       v
    Authenticated session
       |
       v
    Role lookup
       |
       +-- admin/editor --> /admin
       |
       +-- unauthorized --> /

Public visitors do not receive administrative access.

The project also has PostgreSQL enforcement for the single designated administrator identity. The administrator identity and password are intentionally not published in this README. Passwords and private credentials must never be committed to source control.

## 11. Database

### user_roles

Associates authenticated users with application roles.

### categories

Stores museum categories including name, slug, description, and timestamps.

### museum_items

Stores museum collection data including title, slug, category, era, date label, item type, description, symbol, image URL, 3D model reference, and timestamps.

## 12. Database Security

Row Level Security protects database operations.

The security model includes:

- Public read access where appropriate
- Authenticated management policies
- Admin/editor role checks
- Admin-only destructive operations
- User-specific role visibility
- PostgreSQL role constraints
- Security-definer functions for controlled role checks

Database authorization is therefore an independent security boundary and is not based only on hiding UI elements.

## 13. Security

The repository intentionally excludes:

- Authentication passwords
- Supabase service-role keys
- Private API keys
- Private credentials
- Other secrets

Browser configuration uses only the public Supabase configuration required by the application.

If a secret is ever exposed, rotate it instead of committing it to Git history.

## 14. Accessibility

The application includes:

- Keyboard-visible focus states
- Semantic interactive controls
- Reduced-motion support
- Responsive layouts
- Clear interaction states
- Loading feedback
- Error feedback
- Mobile-friendly navigation

Important museum information is not dependent exclusively on 3D interaction.

## 15. Performance & Reliability

Production-oriented handling includes:

- Loading UI
- Error boundaries
- Not-found handling
- Responsive asset presentation
- Progressive 3D loading
- Graceful unavailable-model handling
- Server-side authorization
- Separation of public browsing from administration

## 16. Project Structure

    egypt-digital-museum/
    ├── app/
    │   ├── page.jsx
    │   ├── layout.jsx
    │   ├── globals.css
    │   ├── loading.jsx
    │   ├── error.jsx
    │   ├── not-found.jsx
    │   ├── login/page.jsx
    │   └── admin/page.jsx
    ├── components/
    │   ├── Navigation.jsx
    │   ├── ArtifactCard.jsx
    │   ├── ArtifactModal.jsx
    │   ├── MuseumScene.jsx
    │   └── AdminPanel.jsx
    ├── data/
    │   └── artifacts.js
    ├── lib/
    │   └── supabase/
    │       ├── client.js
    │       ├── server.js
    │       └── proxy.js
    ├── proxy.js
    ├── vercel.json
    ├── package.json
    └── README.md

## 17. Supabase Integration

### lib/supabase/client.js

Browser-side Supabase client.

### lib/supabase/server.js

Server-side Supabase access and authentication.

### lib/supabase/proxy.js

Supabase session handling within the Next.js request lifecycle.

### proxy.js

Integrates request/session handling with the application.

## 18. Environment Variables

Required local/Vercel configuration:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

Only public/publishable configuration should be browser-exposed.

Never place service-role keys or passwords in README.md, source files, GitHub, or public environment variables.

## 19. Local Development

Requirements:

- Node.js
- npm
- Git

Install dependencies:

    npm install

Start development:

    npm run dev

Open:

    http://localhost:3000

## 20. Production Verification

Build:

    npm run build

Start production server:

    npm start

## 21. Deployment

The repository is connected to Vercel and production is deployed from the main branch.

Deployment flow:

    GitHub
       |
       v
    main branch
       |
       v
    Vercel build
       |
       v
    Production deployment
       |
       v
    Live museum

Live site:

https://egypt-digital-museum.vercel.app

## 22. Code Quality

The codebase separates responsibilities:

- Pages compose route-level experiences.
- Components provide reusable UI.
- Data files separate museum content from presentation.
- Supabase utilities isolate backend integration.
- CSS manages responsive presentation and themes.
- Server-side checks protect administrative routes.
- PostgreSQL RLS provides database-level authorization.

This structure makes the application easier to maintain and extend.

## 23. Future Expansion

The architecture can support:

- More artifacts
- More 3D models
- Artifact image galleries
- Audio guides
- Multiple languages
- Virtual exhibition rooms
- Guided tours
- Favorites/bookmarks
- Advanced search
- Educational activities
- Visitor analytics
- Expanded administration tools

## 24. Project Goals

The project is designed to be:

1. Educational
2. Interactive
3. Responsive
4. Accessible
5. Maintainable
6. Secure

## 25. CyberNex Context

The project was built to demonstrate:

- Functionality
- Design and UX
- Creativity
- Clean code architecture
- Documentation
- Responsive web development
- Interactive 3D technology
- Secure backend integration

## 26. Links

**GitHub:** https://github.com/manula961/egypt-digital-museum

**Live website:** https://egypt-digital-museum.vercel.app

## 27. License

No separate open-source license is currently specified. Unless a license is added to the repository, reuse and redistribution should not be assumed to be permitted.

---

## Final Summary

Egypt Digital Museum is a production-oriented digital heritage experience built with Next.js, React, Three.js, React Three Fiber, Supabase, PostgreSQL, and Vercel.

It combines cultural discovery, structured museum data, responsive UX, historical learning, interactive 3D visualization, authentication, role-based access control, and database-level security in one maintainable application.
