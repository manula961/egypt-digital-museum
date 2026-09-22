# 🏺 Egypt Digital Museum

> **A responsive, immersive digital museum for exploring the history, culture, people, objects, and ideas of Egypt.**

Egypt Digital Museum is a modern web experience created for the **CyberNex / CODEXA** project. It combines a curated museum-style interface with an interactive **Three.js 3D environment**, a **Supabase-backed collection**, educational experiences, multilingual support, and responsive design.

The project is designed to demonstrate strong **Functionality, Design & UX, Creativity, Clean Code Architecture, and Documentation**.

---

## ✨ Highlights

- 🏺 Digital artifact collection
- 🧭 Historical timeline and era filtering
- 🔎 Artifact search
- 🧾 Detailed artifact provenance and curator information
- 🏛️ Interactive Three.js 3D museum scene
- 🌀 Orbit controls for exploring the 3D environment
- 🌙 Museum at Night mode
- 🇪🇬 English / Arabic interface
- ❤️ Authenticated visitor favorites
- 🎓 Learning and quiz section
- 🗺️ Guided museum tours
- 🤖 Collection-grounded Egyptologist interaction
- 📱 Responsive desktop, tablet, and mobile layouts
- 🗄️ Supabase PostgreSQL data layer
- 🔐 Supabase authentication and Row Level Security support
- 🚀 Vercel-ready deployment structure

## 🎯 Project Goals

### Education
Make Egyptian history easier to explore through artifacts, eras, guided tours, and interactive learning.

### Immersion
Use 3D graphics and museum-inspired visual design to create an experience that feels more like entering a digital exhibition than browsing a traditional website.

### Accessibility
Support responsive layouts, keyboard-friendly controls, clear typography, Arabic/English content, and a reduced-clutter interface.

### Discovery
Allow visitors to search and filter the collection instead of forcing them through a fixed reading order.

### Scalability
Use React for component-driven UI development and Supabase for a structured backend that can grow into a full museum CMS.

---

# 🧰 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Development server and production bundling |
| JavaScript / JSX | Application logic |
| CSS | Responsive visual system and layout |
| Google Fonts | Playfair Display + DM Sans |

## 3D

| Technology | Purpose |
|---|---|
| Three.js | WebGL 3D rendering |
| React Three Fiber | React integration for Three.js |
| Drei | 3D helpers and controls |
| OrbitControls | Interactive camera navigation |
| Environment | 3D scene lighting/environment |

## Backend

| Technology | Purpose |
|---|---|
| Supabase PostgreSQL | Museum database |
| Supabase Auth | Visitor authentication |
| Supabase RLS | Data access control |
| Supabase browser client | Frontend database communication |

## Deployment

- Vercel-ready
- GitHub repository
- Vite production build

---

# 🏗️ Project Architecture

```text
egypt-digital-museum/
├── index.html
├── package.json
├── README.md
├── .gitignore
├── src/
│   ├── main.jsx
│   └── styles.css
├── public/
│   └── supabase.js
├── data/
│   └── db.json
└── supabase/
    ├── README.md
    └── migrations/
        └── README.md
```

### src/main.jsx
Main React application responsible for the museum interface, data loading, search/filtering, artifact interactions, favorites, language switching, night mode, tours, learning interactions, 3D rendering, artifact details, and Supabase queries.

### src/styles.css
Contains the visual system and responsive layout for navigation, hero, artifact cards, timeline, tours, modals, 3D gallery overlays, mobile breakpoints, and Museum-at-Night styling.

### public/supabase.js
Creates the browser-side Supabase client using the project's publishable key. Never place a Supabase service-role/private key in frontend code.

### data/db.json
Contains lightweight local seed/example data for development and reference.

---

# 🏛️ Museum Experience

## Hero Experience

The homepage opens with a museum-style editorial hero section and the statement **Five thousand years, one living archive.** The hero includes a live Three.js scene rather than a static image.

Visitors can enter the dedicated **3D Gallery** experience.

---

# 🌀 Three.js 3D Gallery

The museum includes an interactive 3D environment built using React Three Fiber, Three.js, Drei, OrbitControls, and Environment lighting.

The current scene contains Egyptian-inspired pyramid structures, a museum floor, atmospheric lighting, floating title treatment, and interactive camera controls.

Visitors can drag to rotate the camera, explore the scene, and open the immersive gallery overlay.

### Future 3D expansion

- Full virtual museum rooms
- 360° galleries
- Photogrammetry artifact models
- Interactive excavation sites
- First-person museum navigation
- Ancient Egyptian architectural reconstructions
- Artifact hotspots
- WebXR / VR support

---

# 🏺 Artifact Collection

The collection is backed by Supabase and can contain title, Arabic title, accession number, era, dynasty, period, date, category, description, Arabic description, material, dimensions, discovery location, provenance, curator notes, symbol, and image URL.

Visitors can search by artifact name, historical era, dynasty, material, or description.

---

# ❤️ Favorites

Authenticated visitors can save artifacts to personal favorites. Favorites are stored in Supabase and associated with the authenticated user.

This can later expand into personal collections, museum passports, saved tours, recommendations, and visitor history.

---

# 🕰️ Egypt Through Time

The timeline supports historical eras including Predynastic Egypt, Early Dynastic Period, Old Kingdom, First Intermediate Period, Middle Kingdom, Second Intermediate Period, New Kingdom, Third Intermediate Period, Late Period, Ptolemaic Egypt, Roman Egypt, Byzantine Egypt, Islamic Egypt, Fatimid Egypt, Ayyubid Egypt, Mamluk Egypt, Ottoman Egypt, Muhammad Ali dynasty, and Modern Egypt.

---

# 🗺️ Guided Tours

Example museum tours include:

- Pharaohs & Power
- The Egyptian Afterlife
- Writing the Eternal
- Life Along the Nile

Tour records can contain title, description, duration, ordered artifacts, and curatorial context.

---

# 🎓 Learning Lab

The Learning Lab provides educational entry points for students and visitors. The current implementation includes a quiz entry point backed by Supabase quiz questions.

Future educational features include student mode, teacher/classroom mode, archaeology challenges, artifact identification, achievement badges, and digital certificates.

---

# 🤖 Egyptologist Assistant

The current museum includes a lightweight collection-grounded Egyptologist interaction that helps visitors locate relevant artifact information.

A production AI version can be built using Vercel AI SDK, AI Gateway, Supabase retrieval, vector embeddings, structured museum metadata, and tool calling. Answers should remain grounded in museum records and distinguish historical evidence from interpretation.

---

# 🌙 Museum at Night

Museum at Night changes the interface into a darker presentation intended for evening exploration, exhibition-style viewing, and immersive 3D scenes.

---

# 🇪🇬 Arabic & English

The interface supports English and Arabic, including right-to-left layout switching. The artifact schema supports Arabic fields such as `title_ar` and `description_ar`.

---

# 🗄️ Supabase Database

Major tables include:

```text
artifacts
profiles
eras
tours
favorites
passport_stamps
quiz_questions
quiz_attempts
visitor_events
content_reviews
history_knowledge
```

`artifacts` stores museum objects. `profiles` stores visitor/staff profiles. `eras` stores historical periods. `tours` stores guided tours. `favorites` stores visitor-selected artifacts. `passport_stamps` provides the foundation for a digital museum passport. `quiz_questions` and `quiz_attempts` support education. `visitor_events` supports analytics. `content_reviews` supports Draft → Review → Published workflows. `history_knowledge` stores structured historical knowledge across major periods, figures, events, sites, deities, writing, science, medicine, society, and culture.

---

# 🔐 Security

The frontend uses a Supabase publishable key. Never commit service-role keys, database passwords, private API keys, or AI provider secrets.

Supabase Row Level Security is used to restrict user-specific operations such as favorites and visitor data. Production policies should be reviewed whenever new tables or privileged operations are added.

---

# 🎨 Design System

The visual direction intentionally avoids a generic AI-dashboard aesthetic.

- Warm ivory, charcoal, muted sandstone, antique gold, and deep museum black
- Playfair Display for editorial headings
- DM Sans for navigation and UI
- Generous whitespace
- Strong editorial hierarchy
- Minimal borders
- Subtle motion
- Large typography
- Museum-inspired composition
- Responsive layouts

---

# 📱 Responsive Design

The interface is designed for desktop, laptop, tablet, and mobile. Navigation, artifact grids, typography, timelines, modals, and 3D scenes adapt to available screen space.

---

# ♿ Accessibility Direction

Recommended production checks include full keyboard navigation, visible focus states, ARIA labels, image alt text, reduced-motion support, contrast checks, screen-reader testing, and accessible modal focus management.

---

# 🚀 Local Development

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🌐 Deployment

The project is structured for Vercel deployment. The expected build command is `npm run build`, producing the Vite `dist` directory.

Typical flow:

```text
GitHub → Vercel → Production Build → Live Museum
```

---

# 🔧 Environment & Configuration

For production, Supabase configuration should preferably use Vite environment variables:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Only publishable browser credentials belong in client-side code.

---

# 🧪 Testing & Quality

Before production release, verify the build, Three.js rendering, console errors, collection loading, search, era filtering, artifact modal, authenticated favorites, Arabic mode, night mode, 3D gallery, and mobile layout.

Also review Supabase RLS policies, authentication flows, WebGL fallback behavior, accessibility, SEO metadata, and mobile performance.

---

# 📈 Roadmap

## Core Museum
- [x] React frontend
- [x] Responsive design
- [x] Supabase integration
- [x] Artifact collection
- [x] Search
- [x] Era filtering
- [x] Artifact details
- [x] Favorites foundation
- [x] Three.js environment

## Immersion
- [x] Interactive 3D scene
- [x] Orbit controls
- [x] Museum at Night
- [x] Arabic / English
- [ ] 360° museum rooms
- [ ] Interactive excavation site
- [ ] Photorealistic artifact models
- [ ] WebXR / VR

## Education
- [x] Quiz foundation
- [x] Guided tours
- [ ] Student mode
- [ ] Teacher mode
- [ ] Archaeology challenges
- [ ] Achievement system
- [ ] Digital certificates

## AI
- [x] Collection-grounded Egyptologist concept
- [ ] Production AI Egyptologist
- [ ] Voice conversation
- [ ] AI-generated tours
- [ ] Timeline AI assistant
- [ ] Explain Like I'm 10 mode

## Museum CMS
- [ ] Draft / Review / Published workflow
- [ ] Version history
- [ ] Media library
- [ ] Bulk CSV/JSON import
- [ ] Bulk editing
- [ ] Content approval dashboard
- [ ] Audit history

## Analytics
- [x] Visitor event data foundation
- [ ] Analytics dashboard
- [ ] Geographic visualization
- [ ] Search trend reports
- [ ] Tour completion analytics

---

# 🏆 CyberNex / CODEXA Evaluation Alignment

### Functionality
Interactive collection, search, filtering, 3D scene, favorites, tours, learning, multilingual UI, and Supabase integration.

### Design & UX
Editorial museum layout, responsive design, restrained visual system, clear navigation, detailed artifact views, and immersive 3D presentation.

### Creativity
Three.js museum environment, Museum at Night mode, historical timeline, digital collection concept, bilingual experience, and museum-oriented interaction design.

### Clean Code Architecture
React + Vite structure, dedicated styling, Supabase client separation, structured database model, and documented project organization.

### Documentation
This README documents the architecture, stack, features, database, security, local development, deployment, roadmap, and future expansion.

---

# 📁 Important Files

| File | Purpose |
|---|---|
| `index.html` | Vite HTML entrypoint |
| `src/main.jsx` | Main React application |
| `src/styles.css` | Museum design system |
| `public/supabase.js` | Supabase browser client |
| `data/db.json` | Local seed/reference data |
| `package.json` | Dependencies and scripts |
| `supabase/README.md` | Supabase documentation |

---

# 📜 License

This project is an educational / demonstration project for the CyberNex / CODEXA challenge. Museum content should be replaced or supplemented with properly licensed imagery and authoritative source material before public production use.

---

# 🔗 Repository

**GitHub:** https://github.com/manula961/egypt-digital-museum

**Project:** Egypt Digital Museum
**Stack:** React + Vite + Three.js + Supabase
**Status:** Active development