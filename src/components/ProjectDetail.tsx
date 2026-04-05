import { motion } from "framer-motion";
import type { Project } from "../types";
import SchemaShowcase from "./SchemaShowcase";

const accentBorders: Record<string, string> = {
  mlbelo: "border-l-gold",
  javaquest: "border-l-coral",
  "godot-projects": "border-l-teal",
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

        <button
          onClick={onClose}
          aria-label="Close project details"
          className="mt-4 text-sm text-text-tertiary hover:text-text-primary transition-colors"
        >
          Close
        </button>

        {project.schema && <SchemaShowcase schema={project.schema} />}
      </div>
    </motion.div>
  );
}
