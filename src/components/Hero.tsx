import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const word = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

function AnimatedLine({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {children.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-[0.3em]">
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.p
          variants={word}
          className="font-display text-sm font-medium uppercase tracking-[0.2em] text-gold mb-6"
        >
          Software Developer
        </motion.p>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          <AnimatedLine>I like making machines</AnimatedLine>
          <AnimatedLine className="text-text-tertiary">do stuff.</AnimatedLine>
        </h1>

        <motion.p
          variants={word}
          className="mt-6 text-base sm:text-lg text-text-secondary max-w-md leading-relaxed"
        >
          Backend developer with a soft spot for database design.
          I like building things across different domains.
        </motion.p>

        <motion.div variants={word} className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="font-display text-sm font-medium px-5 py-2.5 rounded-lg bg-gold text-bg-deep hover:bg-gold-hover transition-colors"
          >
            View Projects
          </a>
          <a
            href="/portfolio/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm font-medium px-5 py-2.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
          >
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
