import { motion } from "framer-motion";

const links = [
  { label: "GitHub", href: "https://github.com/Tobynatoren" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile" },
  { label: "Email", href: "mailto:your@email.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-16 pb-28">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary mb-10">
        Contact
      </p>

      <div className="flex gap-8 sm:gap-10">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-display text-base sm:text-lg font-medium text-text-tertiary hover:text-text-primary transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: i * 0.08,
            }}
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
