import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skull } from "lucide-react";
import { useTranslation } from "react-i18next";

const difficultyColor: Record<string, string> = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-orange-400",
  veryHard: "text-red-400",
};

const OperationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("operations");

  const operations = t("sectionOperations", { returnObjects: true }) as Array<{
    name: string;
    difficulty: string;
    players: string;
    desc: string;
  }>;

  return (
    <section id="operations" className="py-24 md:py-32 relative" ref={ref}>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {operations.map((op, i) => (
            <motion.div
              key={op.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="glass-card-gold p-5 group cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <Skull className="w-5 h-5 text-primary" />
                <h3 className="font-cinzel font-bold text-sm text-foreground">
                  {op.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-xs mb-3">{op.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-oswald uppercase ${difficultyColor[op.difficulty]}`}>
                  {t(`difficulty.${op.difficulty}`)}
                </span>
                <span className="text-muted-foreground">{op.players}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
