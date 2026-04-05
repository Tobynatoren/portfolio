import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectItem from "./ProjectItem";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const featured = projects.filter((p) => p.featured);
  const selected = projects.find((p) => p.slug === selectedSlug) ?? null;

  return (
    <section id="projects" className="pt-16 pb-20">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-12">
        Projects
      </p>

      <div className="border-t border-border">
        {featured.map((project, i) => (
          <div key={project.slug}>
            <ProjectItem
              project={project}
              index={i}
              isSelected={selectedSlug === project.slug}
              onClick={() =>
                setSelectedSlug(
                  selectedSlug === project.slug ? null : project.slug
                )
              }
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
