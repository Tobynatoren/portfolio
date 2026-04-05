import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workProjects } from "../data/work";
import MermaidDiagram from "./MermaidDiagram";
import type { ShowcaseSection } from "../types";

const featureColors = [
  "border-l-gold",
  "border-l-coral",
  "border-l-teal",
  "border-l-lavender",
  "border-l-gold",
  "border-l-coral",
];

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15, delay: i * 0.06 },
  }),
};

function FeatureDiagram({ showcase }: { showcase: ShowcaseSection }) {
  return (
    <div className="mt-4">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold mb-3">
        {showcase.title}
      </p>
      <MermaidDiagram diagram={showcase.diagram} />
      <p className="mt-2 text-xs text-text-tertiary italic">{showcase.annotation}</p>
    </div>
  );
}

export default function Work() {
  const [expanded, setExpanded] = useState<string | null>(null);
  let colorIndex = 0;

  return (
    <section id="work" className="pt-20 pb-20">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-12">
        Professional Work
      </p>

      {workProjects.map((project, pi) => (
        <div key={project.product} className={pi > 0 ? "mt-16" : ""}>
          <div className="mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {project.product}
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">
              <span className="text-gold">{project.company}</span>
              <span className="mx-2">&middot;</span>
              {project.role}
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-lg">
              {project.summary}
            </p>
          </div>

          <div className="border-t border-border">
            {project.features.map((feature) => {
              const ci = colorIndex++;
              return (
                <div key={feature.title}>
                  <motion.button
                    custom={ci}
                    variants={item}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    onClick={() =>
                      setExpanded(expanded === feature.title ? null : feature.title)
                    }
                    className="group w-full text-left py-5 border-b border-border"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <h4 className="font-display text-base sm:text-lg font-semibold tracking-tight group-hover:text-gold transition-colors">
                      {feature.title}
                    </h4>
                  </motion.button>

                  <AnimatePresence>
                    {expanded === feature.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 80, damping: 18 }}
                        className="overflow-hidden"
                      >
                        <div className={`pl-6 border-l-2 ${featureColors[ci % featureColors.length]} py-5 mb-2`}>
                          <p className="text-text-secondary leading-relaxed max-w-lg text-sm">
                            {feature.description}
                          </p>
                          {feature.showcase && (
                            <FeatureDiagram showcase={feature.showcase} />
                          )}
                          <button
                            onClick={() => setExpanded(null)}
                            aria-label="Close details"
                            className="mt-4 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
