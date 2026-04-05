import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionReveal({ children, delay = 0 }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 80, damping: 20, delay }
      }
    >
      {children}
    </motion.div>
  );
}
