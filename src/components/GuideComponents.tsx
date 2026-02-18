import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ─── Rich text parser for <key>, <hl>, <green> tags in i18n strings ─── */
export function rich(text: string): ReactNode[] {
  const parts = text.split(/(<key>.*?<\/key>|<hl>.*?<\/hl>|<green>.*?<\/green>)/g);
  return parts.map((part, i) => {
    const keyMatch = part.match(/^<key>(.*)<\/key>$/);
    if (keyMatch)
      return (
        <kbd
          key={i}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 font-mono text-sm font-bold mx-0.5"
        >
          {keyMatch[1]}
        </kbd>
      );
    const hlMatch = part.match(/^<hl>(.*)<\/hl>$/);
    if (hlMatch)
      return (
        <span key={i} className="text-primary font-semibold">
          {hlMatch[1]}
        </span>
      );
    const greenMatch = part.match(/^<green>(.*)<\/green>$/);
    if (greenMatch)
      return (
        <span key={i} className="text-green-400 font-semibold">
          {greenMatch[1]}
        </span>
      );
    return part;
  });
}

/* ─── Animated Section Wrapper ─── */
export const Section = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Image with optional caption ─── */
export const Img = ({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) => (
  <figure className={`flex flex-col items-center ${className}`}>
    <img
      src={src}
      alt={alt}
      className="rounded-lg border border-primary/20 w-full object-contain"
      loading="lazy"
    />
    {caption && (
      <figcaption className="mt-2 text-xs text-muted-foreground/70 font-oswald uppercase tracking-wider text-center">
        {caption}
      </figcaption>
    )}
  </figure>
);

/* ─── Content Card ─── */
export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`glass-card-gold p-6 md:p-8 ${className}`}>{children}</div>
);

/* ─── Section Title ─── */
export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-gradient-gold mb-2">
    {children}
  </h2>
);

/* ─── Gear / List Slot Item ─── */
export const SlotItem = ({ name, desc }: { name: string; desc: string }) => (
  <li className="flex items-center gap-2 text-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
    <span className="text-primary font-semibold">{name}</span>
    <span className="text-muted-foreground">({desc})</span>
  </li>
);
