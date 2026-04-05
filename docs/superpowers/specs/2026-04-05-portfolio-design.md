# Developer Portfolio — Design Spec

## Overview

A static single-page developer portfolio for Toby, deployed to GitHub Pages. Built with Vite + React + TypeScript. Showcases GitHub projects, professional experience, technical skills, and database design knowledge through a polished, elevated dark UI.

## Target Audience

- **Recruiters / hiring managers:** polished presentation, clear credentials, easy to skim
- **Technical interviewers / engineering leads:** real code links, schema diagrams, annotated SQL, system design thinking

## Stack

- **Build:** Vite + `@vitejs/plugin-react`
- **UI:** React 18 + TypeScript
- **Styling:** Tailwind CSS + custom dark theme
- **Animations:** Framer Motion (scroll-triggered reveals, hover effects, expand/collapse)
- **Diagrams:** Mermaid.js for ER diagrams (styled to match dark theme)
- **Syntax Highlighting:** `prism-react-renderer` for SQL code blocks
- **Hosting:** GitHub Pages via GitHub Actions

## Visual Design

### Palette

| Token        | Value                          |
| ------------ | ------------------------------ |
| bg-primary   | `#0f172a`                      |
| bg-secondary | `#1e293b`                      |
| bg-gradient  | linear 180deg primary→secondary|
| text-primary | `#f1f5f9`                      |
| text-muted   | `#94a3b8`                      |
| accent       | `#6366f1`                      |
| accent-light | `#a5b4fc`                      |
| border       | `#334155`                      |
| glow         | `rgba(99,102,241,0.12)` radial |

### Typography

- System font stack or Inter (single loaded font)
- Large bold headings, muted secondary text, clear hierarchy

### Interactions

- Cards lift on hover with subtle border glow
- Sections fade/slide in on scroll via Framer Motion
- Smooth scroll between nav anchors
- Project detail expand/collapse animation

## Sections

### 1. Hero

- Name: "Toby"
- Title: "Software Engineer" or similar
- One-liner summarizing focus (backend, databases, full-stack delivery)
- CTA buttons: "View Projects" (scrolls down), "Resume" (PDF link or download)
- Subtle radial glow behind the hero content

### 2. Projects

A grid of project cards. Featured projects display as larger cards; others as a compact grid.

Each card shows:
- Title
- Short summary
- Tech tags (pill badges)
- GitHub link (icon)

Clicking a featured card expands an inline detail view with:
- Full description
- Tech stack breakdown
- GitHub repo link
- Optional schema showcase (ER diagram + annotated SQL snippets)

**Featured GitHub projects (initial):**

1. **GODOTProjects** — Godot game project
2. **MLBELO** — MLB ELO rating engine
3. **javaquest** — Java-based project
4. **truckerbadv2** — Full-stack application

**Work projects:** Added later with NDA-safe descriptions. Same card format but `github` link omitted, replaced with description of role/impact/tech used.

### 3. Skills / Tech Stack

Grouped by category:
- **Languages:** Java (primary), Python, PHP, C (limited), JavaScript/TypeScript
- **Frameworks:** Spring Boot, React
- **Databases & Data:** SQL, database design, schema architecture
- **Tools:** Git, and others as relevant

Skills displayed as labeled pill badges grouped under each category heading — no progress bars or percentage ratings (these are subjective and often backfire with technical reviewers).

### 4. Experience

Vertical timeline layout of professional work history. NDA-safe descriptions focusing on:
- What you built (in general terms)
- Tech used
- Impact / scope

### 5. Contact

- GitHub: Tobynatoren
- LinkedIn (if desired)
- Email
- Optional: simple contact form via Formspree or similar static-friendly service

## Project Data Model

All project content lives in a single `projects.ts` config file:

```ts
interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech: string[];
  github?: string;           // omitted for work projects
  featured: boolean;
  category: "github" | "work";
  schema?: {
    mermaidDiagram: string;
    sqlSnippets: Array<{
      title: string;
      code: string;
      annotation: string;
    }>;
  };
}
```

Adding a new project means appending an object to the array. No new files or components needed.

## Deployment

- **Repo:** GitHub repo under Tobynatoren
- **CI/CD:** GitHub Actions workflow — builds on push to `main`, deploys built output to `gh-pages` branch
- **Dev:** `npm run dev` for local development with HMR
- **Build:** `npm run build` produces static output in `dist/`

## Dependencies

| Package                | Purpose                     |
| ---------------------- | --------------------------- |
| `vite`                 | Build tooling               |
| `@vitejs/plugin-react` | React support in Vite       |
| `react`, `react-dom`  | UI framework                |
| `typescript`           | Type safety                 |
| `tailwindcss`          | Utility-first CSS           |
| `framer-motion`        | Animations and transitions  |
| `mermaid`              | ER diagram rendering        |
| `prism-react-renderer` | SQL syntax highlighting     |

## Out of Scope (for now)

- Blog / writing section
- About page (covered by hero + experience)
- CMS or admin panel
- Backend API
- Analytics (can add later)
