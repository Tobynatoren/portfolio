import { motion } from "framer-motion";
import { experience } from "../data/experience";

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

const work = experience.filter((e) => e.type === "work");
const education = experience.filter((e) => e.type === "education");

export default function Experience() {
  return (
    <section id="experience" className="pt-16 pb-20">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-12">
        Experience
      </p>

      <div className="space-y-10">
        {work.map((entry, i) => (
          <motion.div
            key={i}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="pl-6 border-l border-border"
          >
            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">
              <span className="text-gold">{entry.company}</span>
              <span className="mx-2">&middot;</span>
              {entry.period}
            </p>
            <p className="mt-3 text-text-secondary leading-relaxed max-w-lg">
              {entry.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
              {entry.tech.map((t, j) => (
                <span key={t} className="text-xs font-display text-text-tertiary">
                  {j > 0 && <span className="mr-2">/</span>}
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mt-20 mb-12">
        Education
      </p>

      <div className="space-y-10">
        {education.map((entry, i) => (
          <motion.div
            key={i}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="pl-6 border-l border-border"
          >
            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">
              <span className="text-teal">{entry.company}</span>
              <span className="mx-2">&middot;</span>
              {entry.period}
            </p>
            <p className="mt-3 text-text-secondary leading-relaxed max-w-lg">
              {entry.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
              {entry.tech.map((t, j) => (
                <span key={t} className="text-xs font-display text-text-tertiary">
                  {j > 0 && <span className="mr-2">/</span>}
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
