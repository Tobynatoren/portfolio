import { motion } from "framer-motion";
import type { Project } from "../types";
import SchemaShowcase from "./SchemaShowcase";

const accentBorders: Record<string, string> = {
  mlbelo: "border-l-gold",
  javaquest: "border-l-coral",
  "godot-projects": "border-l-teal",
  truckerbadv2: "border-l-lavender",
};

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  const borderClass = accentBorders[project.slug] ?? "border-l-gold";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="overflow-hidden"
    >
      <div className={`pl-6 border-l-2 ${borderClass} py-6 mb-4`}>
        <p className="text-text-secondary leading-relaxed max-w-lg">
          {project.description}
        </p>

        <div className="mt-4 flex items-center gap-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              View on GitHub &rarr;
            </a>
          )}
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>

        {project.schema && <SchemaShowcase schema={project.schema} />}
      </div>
    </motion.div>
  );
}
