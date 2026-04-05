import { motion } from "framer-motion";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="border-b border-border">
      <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-bold text-text-primary">
          Toby
        </a>
        <div className="hidden sm:flex gap-7">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm text-text-tertiary hover:text-text-primary transition-colors py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 + i * 0.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  );
}
