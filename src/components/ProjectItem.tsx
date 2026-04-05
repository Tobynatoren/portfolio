import { motion } from "framer-motion";
import type { Project } from "../types";

const accentColors: Record<string, string> = {
  mlbelo: "group-hover:text-gold",
  javaquest: "group-hover:text-coral",
  "godot-projects": "group-hover:text-teal",
};

interface Props {
  project: Project;
  onClick: () => void;
  isSelected: boolean;
  index: number;
}

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15, delay: i * 0.08 },
  }),
};

export default function ProjectItem({ project, onClick, isSelected, index }: Props) {
  const hoverColor = accentColors[project.slug] ?? "group-hover:text-gold";

  return (
    <motion.button
      custom={index}
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onClick={onClick}
      className={`group w-full text-left py-7 border-b border-border transition-colors ${
        isSelected ? "border-border-hover" : ""
      }`}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3
          className={`font-display text-xl sm:text-2xl font-semibold tracking-tight transition-colors ${hoverColor}`}
        >
          {project.title}
        </h3>
        <div className="hidden sm:flex gap-2 flex-shrink-0">
          {project.tech.map((t, i) => (
            <span key={t} className="text-xs font-display text-text-tertiary">
              {i > 0 && <span className="mr-2">/</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-text-tertiary leading-relaxed max-w-lg">
        {project.summary}
      </p>
    </motion.button>
  );
}
