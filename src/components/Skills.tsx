import { motion } from "framer-motion";
import { skills } from "../data/skills";

const colors = ["text-gold", "text-coral", "text-teal", "text-lavender", "text-text-primary"];

export default function Skills() {
  const allSkills = skills.flatMap((g) => g.skills);

  return (
    <section id="skills" className="pt-16 pb-20">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-10">
        Skills
      </p>

      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 leading-loose">
        {allSkills.map((skill, i) => (
          <span key={skill} className="inline-flex items-baseline">
            <motion.span
              className={`font-display text-base sm:text-lg font-medium ${colors[i % colors.length]}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: i * 0.04,
              }}
            >
              {skill}
            </motion.span>
            {i < allSkills.length - 1 && (
              <span className="text-border mx-2 select-none">/</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
