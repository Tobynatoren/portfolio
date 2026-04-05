import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectItem from "./ProjectItem";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const featured = projects.filter((p) => p.featured);
  const selected = projects.find((p) => p.slug === selectedSlug) ?? null;

  function handleClick(slug: string) {
    const next = selectedSlug === slug ? null : slug;
    setSelectedSlug(next);
    if (next) {
      setTimeout(() => {
        itemRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  return (
    <section id="projects" className="pt-16 pb-20">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-12">
        Projects
      </p>

      <div className="border-t border-border">
        {featured.map((project, i) => (
          <div key={project.slug} ref={(el) => { itemRefs.current[project.slug] = el; }}>
            <ProjectItem
              project={project}
              index={i}
              isSelected={selectedSlug === project.slug}
              onClick={() => handleClick(project.slug)}
            />
            <AnimatePresence>
              {selectedSlug === project.slug && selected && (
                <ProjectDetail
                  project={selected}
                  onClose={() => setSelectedSlug(null)}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
