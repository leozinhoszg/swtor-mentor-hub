import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Map, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";

const phaseIcons = [
  <Rocket className="w-8 h-8" />,
  <Map className="w-8 h-8" />,
  <Crown className="w-8 h-8" />,
];

const ContentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("content");

  const phases = (t("sectionPhases", { returnObjects: true }) as Array<{ title: string; desc: string; items: string[] }>).map((p, i) => ({
    ...p,
    icon: phaseIcons[i],
  }));

  return (
    <section id="conteudo" className="py-24 md:py-32 bg-muted/5 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold text-center mb-4"
        >
          {t("sectionTitle")}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="divider-gold mx-auto max-w-xs mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="glass-card-gold p-6 group cursor-pointer transition-all duration-300"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {phase.icon}
              </div>
              <h3 className="font-cinzel font-bold text-xl text-primary mb-2">
                {phase.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{phase.desc}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
