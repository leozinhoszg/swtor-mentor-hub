import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IMPERIAL_SLUGS, REPUBLIC_SLUGS } from "@/data/classStoryMeta";
import impLogo from "@/assets/empire.svg";
import pubLogo from "@/assets/republic.svg";

const factionIcons = [
  <img src={impLogo} alt="Império" className="w-10 h-10 object-contain" />,
  <img src={pubLogo} alt="República" className="w-10 h-10 object-contain" />,
];

const StoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("stories");

  const factionSlugs = [IMPERIAL_SLUGS, REPUBLIC_SLUGS];
  const factions = (t("factions", { returnObjects: true }) as Array<{ name: string; classes: string[] }>).map((f, i) => ({
    ...f,
    icon: factionIcons[i],
    slugs: factionSlugs[i],
  }));

  const factionStyles = [
    {
      bg: "from-red-900/30 via-red-950/10 to-transparent",
      border: "border-red-800/40 hover:border-red-500/60",
      hoverBg: "hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]",
      classBg: "hover:bg-red-900/20 hover:text-red-400",
      classBorder: "border-red-900/20",
    },
    {
      bg: "from-blue-900/30 via-blue-950/10 to-transparent",
      border: "border-blue-800/40 hover:border-blue-500/60",
      hoverBg: "hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
      classBg: "hover:bg-blue-900/20 hover:text-blue-400",
      classBorder: "border-blue-900/20",
    },
  ];

  return (
    <section id="historias" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gradient-to-r from-red-950/40 via-red-950/15 to-transparent" />
        <div className="w-1/2 bg-gradient-to-l from-blue-950/40 via-blue-950/15 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {factions.map((faction, i) => (
            <motion.div
              key={faction.name}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              className={`relative p-8 text-center group cursor-pointer transition-all duration-500 rounded-lg border bg-gradient-to-b ${factionStyles[i].bg} ${factionStyles[i].border} ${factionStyles[i].hoverBg} backdrop-blur-sm`}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                {faction.icon}
                <h3 className="font-cinzel font-bold text-2xl text-primary">
                  {faction.name}
                </h3>
              </div>
              <div className="space-y-3">
                {faction.classes.map((cls, j) => (
                  <Link to={`/historias/${faction.slugs[j]}`} key={cls}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + j * 0.1 }}
                      className={`py-2 px-4 rounded bg-muted/20 text-muted-foreground text-sm font-oswald uppercase tracking-wider transition-colors ${factionStyles[i].classBg}`}
                    >
                      {cls}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
