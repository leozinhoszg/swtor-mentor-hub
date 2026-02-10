import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const UpdatesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("updates");

  const updates = t("sectionUpdates", { returnObjects: true }) as Array<{
    date: string;
    title: string;
    summary: string;
  }>;

  return (
    <section id="atualizacoes" className="py-24 md:py-32 relative" ref={ref}>
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

        <div className="max-w-3xl mx-auto space-y-4">
          {updates.map((update, i) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="glass-card-gold p-5 flex gap-4 group cursor-pointer transition-all duration-300"
            >
              <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-primary font-oswald uppercase tracking-wider">
                  {update.date}
                </span>
                <h3 className="font-cinzel font-bold text-base text-foreground mt-1">
                  {update.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{update.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
