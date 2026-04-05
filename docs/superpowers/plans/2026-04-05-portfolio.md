# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Important:** Do NOT commit unless the user explicitly says to. Do NOT include AI co-author tags or AI mentions anywhere.
>
> **Model preference:** Use Opus for all implementation agents.

**Goal:** Build a polished static single-page developer portfolio with an elevated dark aesthetic, deployed to GitHub Pages.

**Architecture:** Vite + React + TypeScript SPA. All project data lives in a config file. Tailwind CSS for styling with a custom dark palette. Framer Motion for scroll animations. Mermaid.js for ER diagrams. Single page with smooth-scroll navigation between sections.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, Framer Motion, Mermaid.js, prism-react-renderer

---

## File Structure

```
portfolio/
├── index.html                          # Vite entry HTML
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages deploy on push to main
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                        # React entry point
│   ├── App.tsx                         # Root component, section layout
│   ├── index.css                       # Tailwind directives + custom theme vars
│   ├── data/
│   │   ├── projects.ts                 # Project config array
│   │   ├── skills.ts                   # Skills config grouped by category
│   │   └── experience.ts              # Work experience entries
│   ├── types/
│   │   └── index.ts                   # Shared TypeScript interfaces
│   ├── components/
│   │   ├── Navbar.tsx                  # Fixed top nav with scroll links
│   │   ├── Hero.tsx                    # Landing section
│   │   ├── Projects.tsx               # Projects section container
│   │   ├── ProjectCard.tsx            # Individual project card
│   │   ├── ProjectDetail.tsx          # Expanded project view
│   │   ├── SchemaShowcase.tsx         # Mermaid diagram + SQL snippets
│   │   ├── Skills.tsx                 # Skills grouped by category
│   │   ├── Experience.tsx             # Vertical timeline
│   │   ├── Contact.tsx                # Contact links section
│   │   └── SectionReveal.tsx          # Framer Motion scroll reveal wrapper
```

Each component is focused on one section. Data files are separate from rendering. Types are shared.

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Create: `postcss.config.js`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize the project with Vite**

Run:
```bash
npm create vite@latest . -- --template react-ts
```

This scaffolds into the current directory with React + TypeScript template.

- [ ] **Step 2: Install core dependencies**

Run:
```bash
npm install framer-motion mermaid prism-react-renderer
```

- [ ] **Step 3: Install Tailwind CSS v4**

Run:
```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 4: Configure Vite with Tailwind**

Replace `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
});
```

Note: `base` is set to `/portfolio/` for GitHub Pages under `Tobynatoren/portfolio`. Adjust if the repo name differs.

- [ ] **Step 5: Set up the CSS with Tailwind and custom theme**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-accent: #6366f1;
  --color-accent-light: #a5b4fc;
  --color-border: #334155;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  background-attachment: fixed;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}
```

- [ ] **Step 6: Set up the root App component**

Replace `src/App.tsx`:

```tsx
function App() {
  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6">
        <p className="text-text-primary pt-20 text-2xl">Portfolio coming soon.</p>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 7: Clean up entry point**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Add a simple favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#6366f1"/>
  <text x="16" y="23" text-anchor="middle" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">T</text>
</svg>
```

Update the `<link>` tag in `index.html` to use it:

```html
<link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg" />
```

Also update the `<title>` in `index.html` to:

```html
<title>Toby | Software Engineer</title>
```

- [ ] **Step 9: Delete boilerplate files**

Remove the Vite template files we don't need:

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 10: Verify it runs**

Run:
```bash
npm run dev
```

Expected: Browser shows "Portfolio coming soon." on a dark gradient background at `http://localhost:5173/portfolio/`.

---

### Task 2: Types and Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`

- [ ] **Step 1: Define shared types**

Create `src/types/index.ts`:

```ts
export interface SqlSnippet {
  title: string;
  code: string;
  annotation: string;
}

export interface ProjectSchema {
  mermaidDiagram: string;
  sqlSnippets: SqlSnippet[];
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech: string[];
  github?: string;
  featured: boolean;
  category: "github" | "work";
  schema?: ProjectSchema;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}
```

- [ ] **Step 2: Create project data**

Create `src/data/projects.ts`:

```ts
import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "MLBELO",
    slug: "mlbelo",
    summary: "ELO rating engine for MLB teams",
    description:
      "A rating system that tracks and predicts MLB team performance using ELO-based algorithms. Processes historical game data to calculate team strength ratings and project outcomes.",
    tech: ["Java", "Python", "SQL"],
    github: "https://github.com/Tobynatoren/MLBELO",
    featured: true,
    category: "github",
  },
  {
    title: "JavaQuest",
    slug: "javaquest",
    summary: "Java-based adventure game engine",
    description:
      "A text-based adventure game built in Java demonstrating object-oriented design patterns, game state management, and modular architecture.",
    tech: ["Java"],
    github: "https://github.com/Tobynatoren/javaquest",
    featured: true,
    category: "github",
  },
  {
    title: "Godot Projects",
    slug: "godot-projects",
    summary: "Game development with the Godot engine",
    description:
      "A collection of game projects built with the Godot engine, exploring 2D/3D game mechanics, physics, and procedural generation.",
    tech: ["GDScript", "Godot"],
    github: "https://github.com/Tobynatoren/GODOTProjects",
    featured: true,
    category: "github",
  },
  {
    title: "TruckerBad v2",
    slug: "truckerbadv2",
    summary: "Full-stack trucking application",
    description:
      "A rebuilt version of a trucking logistics application with improved architecture and features.",
    tech: ["Java", "Spring Boot", "React"],
    github: "https://github.com/Tobynatoren/truckerbadv2",
    featured: true,
    category: "github",
  },
];
```

Note: Descriptions are placeholders — Toby should replace them with accurate descriptions of each project.

- [ ] **Step 3: Create skills data**

Create `src/data/skills.ts`:

```ts
import type { SkillGroup } from "../types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Java", "Python", "PHP", "C", "JavaScript", "TypeScript", "SQL", "GDScript"],
  },
  {
    category: "Frameworks",
    skills: ["Spring Boot", "React"],
  },
  {
    category: "Databases & Data",
    skills: ["PostgreSQL", "MySQL", "Database Design", "Schema Architecture", "Query Optimization"],
  },
  {
    category: "Tools",
    skills: ["Git", "Godot"],
  },
];
```

- [ ] **Step 4: Create experience data**

Create `src/data/experience.ts`:

```ts
import type { ExperienceEntry } from "../types";

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer",
    company: "Company Name",
    period: "20XX – Present",
    description:
      "Working across the full stack with a focus on backend services and database architecture. Building and maintaining Spring Boot APIs and React frontends.",
    tech: ["Java", "Spring Boot", "React", "SQL"],
  },
];
```

Note: Toby should fill in real company info and additional entries.

- [ ] **Step 5: Verify types compile**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

---

### Task 3: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Navbar**

Create `src/components/Navbar.tsx`:

```tsx
import { useState, useEffect } from "react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold text-text-primary">
          Toby
        </a>
        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to App**

Replace `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <section id="hero" className="pt-32 min-h-screen">
          <p className="text-2xl">Hero section placeholder</p>
        </section>
        <section id="projects" className="py-24">
          <p className="text-2xl">Projects placeholder</p>
        </section>
        <section id="skills" className="py-24">
          <p className="text-2xl">Skills placeholder</p>
        </section>
        <section id="experience" className="py-24">
          <p className="text-2xl">Experience placeholder</p>
        </section>
        <section id="contact" className="py-24">
          <p className="text-2xl">Contact placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify navbar renders and scrolls**

Run `npm run dev`. Expected: Dark page with fixed navbar at top showing "Toby" and navigation links. Clicking links smooth-scrolls to each section. Navbar gets a blur background on scroll.

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Hero component**

Create `src/components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-24 min-h-[90vh] flex items-center">
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative">
        <p className="text-sm font-medium uppercase tracking-widest text-accent-light mb-4">
          Software Engineer
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
          I build reliable systems
          <br />
          <span className="text-text-muted">and thoughtful databases.</span>
        </h1>
        <p className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed">
          Backend-focused full-stack developer with a passion for clean architecture,
          database design, and shipping software that works.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-accent/15 border border-accent/30 text-accent-light text-sm font-medium hover:bg-accent/25 transition-colors"
          >
            View Projects
          </a>
          <a
            href="/portfolio/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-border text-text-muted text-sm font-medium hover:text-text-primary hover:border-text-muted transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Hero into App**

Replace the hero placeholder section in `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
        <section id="projects" className="py-24">
          <p className="text-2xl">Projects placeholder</p>
        </section>
        <section id="skills" className="py-24">
          <p className="text-2xl">Skills placeholder</p>
        </section>
        <section id="experience" className="py-24">
          <p className="text-2xl">Experience placeholder</p>
        </section>
        <section id="contact" className="py-24">
          <p className="text-2xl">Contact placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify hero renders**

Run `npm run dev`. Expected: Full hero section with name, tagline, description, and two CTA buttons. Radial indigo glow in the top-right area. "View Projects" scrolls to projects section.

---

### Task 5: Project Cards

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Projects.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the ProjectCard component**

Create `src/components/ProjectCard.tsx`:

```tsx
import type { Project } from "../types";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-xl border border-border bg-bg-secondary/50 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]"
    >
      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-light transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs rounded-md bg-bg-primary/60 border border-border text-text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Create the Projects section**

Create `src/components/Projects.tsx`:

```tsx
import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const featured = projects.filter((p) => p.featured);
  const selected = projects.find((p) => p.slug === selectedSlug) ?? null;

  return (
    <section id="projects" className="py-24">
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <p className="mt-2 text-text-muted">A selection of things I've built.</p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onClick={() =>
              setSelectedSlug(
                selectedSlug === project.slug ? null : project.slug
              )
            }
          />
        ))}
      </div>

      {selected && (
        <ProjectDetail
          project={selected}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </section>
  );
}
```

Note: This references `ProjectDetail` which is created in the next task. For now, create a stub so it compiles.

- [ ] **Step 3: Create ProjectDetail stub**

Create `src/components/ProjectDetail.tsx`:

```tsx
import type { Project } from "../types";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-bg-secondary/50 p-8">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary text-sm"
        >
          Close
        </button>
      </div>
      <p className="mt-4 text-text-muted leading-relaxed">
        {project.description}
      </p>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-accent-light hover:text-accent transition-colors"
        >
          View on GitHub →
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Wire Projects into App**

Replace the projects placeholder in `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
        <Projects />
        <section id="skills" className="py-24">
          <p className="text-2xl">Skills placeholder</p>
        </section>
        <section id="experience" className="py-24">
          <p className="text-2xl">Experience placeholder</p>
        </section>
        <section id="contact" className="py-24">
          <p className="text-2xl">Contact placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 5: Verify project cards render**

Run `npm run dev`. Expected: Four project cards in a 2-column grid. Hovering a card shows a subtle glow. Clicking a card opens a detail panel below the grid with description and GitHub link. Clicking again (or Close) collapses it.

---

### Task 6: Schema Showcase (Mermaid + SQL)

**Files:**
- Create: `src/components/SchemaShowcase.tsx`
- Modify: `src/components/ProjectDetail.tsx`
- Modify: `src/data/projects.ts` (add schema to one project)

- [ ] **Step 1: Create the SchemaShowcase component**

Create `src/components/SchemaShowcase.tsx`:

```tsx
import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Highlight, themes } from "prism-react-renderer";
import type { ProjectSchema } from "../types";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#6366f1",
    primaryTextColor: "#f1f5f9",
    primaryBorderColor: "#334155",
    lineColor: "#94a3b8",
    secondaryColor: "#1e293b",
    tertiaryColor: "#0f172a",
  },
});

interface Props {
  schema: ProjectSchema;
}

export default function SchemaShowcase({ schema }: Props) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    const id = `mermaid-${Date.now()}`;
    mermaid.render(id, schema.mermaidDiagram).then(({ svg }) => {
      if (diagramRef.current) {
        diagramRef.current.innerHTML = svg;
      }
    });
  }, [schema.mermaidDiagram]);

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h4 className="text-sm font-medium uppercase tracking-widest text-accent-light mb-4">
          Schema Design
        </h4>
        <div
          ref={diagramRef}
          className="rounded-lg border border-border bg-bg-primary/60 p-6 overflow-x-auto [&_svg]:max-w-full"
        />
      </div>

      {schema.sqlSnippets.length > 0 && (
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-accent-light mb-4">
            Key Queries
          </h4>
          <div className="space-y-6">
            {schema.sqlSnippets.map((snippet) => (
              <div key={snippet.title}>
                <div className="flex items-baseline justify-between mb-2">
                  <h5 className="text-sm font-medium text-text-primary">
                    {snippet.title}
                  </h5>
                </div>
                <Highlight
                  theme={themes.oneDark}
                  code={snippet.code.trim()}
                  language="sql"
                >
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className="rounded-lg border border-border p-4 overflow-x-auto text-sm leading-relaxed"
                      style={{ ...style, background: "rgba(15,23,42,0.6)" }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                <p className="mt-2 text-sm text-text-muted italic">
                  {snippet.annotation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Integrate SchemaShowcase into ProjectDetail**

Replace `src/components/ProjectDetail.tsx`:

```tsx
import type { Project } from "../types";
import SchemaShowcase from "./SchemaShowcase";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-bg-secondary/50 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-md bg-bg-primary/60 border border-border text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary text-sm"
        >
          ✕
        </button>
      </div>

      <p className="mt-6 text-text-muted leading-relaxed">
        {project.description}
      </p>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-accent-light hover:text-accent transition-colors"
        >
          View on GitHub →
        </a>
      )}

      {project.schema && <SchemaShowcase schema={project.schema} />}
    </div>
  );
}
```

- [ ] **Step 3: Add sample schema data to MLBELO project**

In `src/data/projects.ts`, update the MLBELO entry to include a schema:

```ts
  {
    title: "MLBELO",
    slug: "mlbelo",
    summary: "ELO rating engine for MLB teams",
    description:
      "A rating system that tracks and predicts MLB team performance using ELO-based algorithms. Processes historical game data to calculate team strength ratings and project outcomes.",
    tech: ["Java", "Python", "SQL"],
    github: "https://github.com/Tobynatoren/MLBELO",
    featured: true,
    category: "github",
    schema: {
      mermaidDiagram: `erDiagram
    TEAM {
        int team_id PK
        string name
        string abbreviation
        string league
        string division
    }
    GAME {
        int game_id PK
        date game_date
        int home_team_id FK
        int away_team_id FK
        int home_score
        int away_score
    }
    ELO_RATING {
        int rating_id PK
        int team_id FK
        date rating_date
        float elo_score
        int games_played
    }
    TEAM ||--o{ GAME : "plays as home"
    TEAM ||--o{ GAME : "plays as away"
    TEAM ||--o{ ELO_RATING : "has ratings"`,
      sqlSnippets: [
        {
          title: "Current team rankings with win percentage",
          code: `
SELECT
    t.name,
    r.elo_score,
    COUNT(CASE WHEN g.home_score > g.away_score AND g.home_team_id = t.team_id
               OR g.away_score > g.home_score AND g.away_team_id = t.team_id
          THEN 1 END) AS wins,
    COUNT(g.game_id) AS games,
    ROUND(
      COUNT(CASE WHEN g.home_score > g.away_score AND g.home_team_id = t.team_id
                 OR g.away_score > g.home_score AND g.away_team_id = t.team_id
            THEN 1 END)::numeric / NULLIF(COUNT(g.game_id), 0), 3
    ) AS win_pct
FROM team t
JOIN elo_rating r ON r.team_id = t.team_id
LEFT JOIN game g ON g.home_team_id = t.team_id OR g.away_team_id = t.team_id
WHERE r.rating_date = (SELECT MAX(rating_date) FROM elo_rating WHERE team_id = t.team_id)
GROUP BY t.name, r.elo_score
ORDER BY r.elo_score DESC;`,
          annotation:
            "Joins the latest ELO rating with aggregated win/loss data. Uses conditional aggregation instead of subqueries for better performance on large game tables.",
        },
      ],
    },
  },
```

Note: This is a sample schema — Toby should update it to match the actual MLBELO project structure.

- [ ] **Step 4: Verify schema showcase renders**

Run `npm run dev`. Click the MLBELO project card. Expected: Expanded detail view shows an ER diagram (Mermaid rendered) with Team, Game, and ELO_Rating tables, plus a syntax-highlighted SQL query with annotation below it.

---

### Task 7: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Skills component**

Create `src/components/Skills.tsx`:

```tsx
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
      <p className="mt-2 text-text-muted">Technologies I work with.</p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-accent-light mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border bg-bg-secondary/50 text-text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Skills into App**

Update `src/App.tsx` — add the import and replace the skills placeholder:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
        <Projects />
        <Skills />
        <section id="experience" className="py-24">
          <p className="text-2xl">Experience placeholder</p>
        </section>
        <section id="contact" className="py-24">
          <p className="text-2xl">Contact placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify skills render**

Run `npm run dev`. Expected: Skills section shows four groups (Languages, Frameworks, Databases & Data, Tools) with pill badges for each skill.

---

### Task 8: Experience Timeline

**Files:**
- Create: `src/components/Experience.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Experience component**

Create `src/components/Experience.tsx`:

```tsx
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
      <p className="mt-2 text-text-muted">Where I've worked.</p>

      <div className="mt-12 relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-12">
          {experience.map((entry, i) => (
            <div key={i} className="relative pl-10">
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg-primary" />

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {entry.role}
                  </h3>
                  <span className="text-sm text-text-muted">{entry.period}</span>
                </div>
                <p className="text-sm text-accent-light mt-0.5">
                  {entry.company}
                </p>
                <p className="mt-3 text-text-muted leading-relaxed">
                  {entry.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-md bg-bg-primary/60 border border-border text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Experience into App**

Update `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <section id="contact" className="py-24">
          <p className="text-2xl">Contact placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify experience renders**

Run `npm run dev`. Expected: Vertical timeline with a line and accent-colored dots. Each entry shows role, company, period, description, and tech tags.

---

### Task 9: Contact Section

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Contact component**

Create `src/components/Contact.tsx`:

```tsx
const links = [
  {
    label: "GitHub",
    href: "https://github.com/Tobynatoren",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:your@email.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
      <p className="mt-2 text-text-muted">Get in touch.</p>

      <div className="mt-12 flex gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border bg-bg-secondary/50 text-text-muted hover:text-text-primary hover:border-accent/40 transition-all"
          >
            {link.icon}
            <span className="text-sm font-medium">{link.label}</span>
          </a>
        ))}
      </div>

      <p className="mt-16 pb-8 text-sm text-text-muted/50 text-center">
        Built with React & Tailwind CSS
      </p>
    </section>
  );
}
```

Note: Toby should update the LinkedIn and email URLs with real values.

- [ ] **Step 2: Wire Contact into App — final App.tsx**

Replace `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify contact renders**

Run `npm run dev`. Expected: Contact section shows GitHub, LinkedIn, and Email links as styled cards with icons. Footer text at the bottom.

---

### Task 10: Scroll Animations

**Files:**
- Create: `src/components/SectionReveal.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the SectionReveal wrapper**

Create `src/components/SectionReveal.tsx`:

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function SectionReveal({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap sections in App with SectionReveal**

Replace `src/App.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import SectionReveal from "./components/SectionReveal";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <Skills />
        </SectionReveal>
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify animations work**

Run `npm run dev`. Expected: Each section fades in and slides up smoothly as you scroll down the page. Animations trigger once and don't repeat on scroll-back.

---

### Task 11: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify build succeeds locally**

Run:
```bash
npm run build
```

Expected: Builds without errors, output in `dist/` directory.

- [ ] **Step 3: Verify dist output looks correct**

Run:
```bash
ls dist/
```

Expected: `index.html`, `assets/` directory with JS and CSS bundles.
