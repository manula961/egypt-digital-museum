# Egypt Digital Museum

A responsive digital museum experience for Egyptian history built with React, Vite, Three.js / React Three Fiber, and Supabase.

## Stack

- React 19
- Vite
- Three.js
- React Three Fiber + Drei
- Supabase PostgreSQL + Auth
- Responsive HTML/CSS

## Features

- Interactive Three.js pyramid gallery
- Immersive 3D gallery mode with orbit controls
- Supabase-backed artifact collection
- Search and historical era filtering
- Artifact detail/provenance panels
- Favorites for authenticated visitors
- Guided tours
- Learning/quiz entry point
- English / Arabic interface toggle
- Museum-at-night mode
- Responsive mobile and desktop layout

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Supabase

The browser client uses a Supabase publishable key. Private/service-role keys must never be committed.

Project ref: `vqehwywibgnqvkkdpcuz`.

## Deployment

The project is structured for Vercel deployment.