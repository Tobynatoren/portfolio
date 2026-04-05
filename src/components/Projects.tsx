import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { projects } from "../data/projects";
import ProjectItem from "./ProjectItem";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const featured = projects.filter((p) => p.featured);
  const selected = projects.find((p) => p.slug === selectedSlug) ?? null;

  function handleClick(slug: string) {
    if (selectedSlug === slug) {
      setSelectedSlug(null);
      return;
    }

    // Snapshot where the clicked item is on screen
    const el = itemRefs.current[slug];
    const topBefore = el?.getBoundingClientRect().top ?? 0;

    // Force synchronous DOM update so we can measure immediately after
    flushSync(() => setSelectedSlug(slug));

    // Correct scroll to keep the clicked item in the same visual spot
    if (el) {
      const topAfter = el.getBoundingClientRect().top;
      const drift = topAfter - topBefore;
      if (Math.abs(drift) > 1) {
        window.scrollBy({ top: drift, behavior: "instant" });
      }
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
            {selectedSlug === project.slug && selected && (
              <ProjectDetail
                project={selected}
                onClose={() => setSelectedSlug(null)}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
