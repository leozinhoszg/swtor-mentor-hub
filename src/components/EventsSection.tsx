import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";

const EventsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("events");

  const events = t("sectionEvents", { returnObjects: true }) as Array<{
    name: string;
    status: string;
    dates: string;
    rewards: string;
    active: boolean;
  }>;

  return (
    <section id="eventos" className="py-24 md:py-32 bg-muted/5 relative" ref={ref}>
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

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="glass-card-gold p-6 group cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-cinzel font-bold text-base text-foreground">
                  {event.name}
                </h3>
                <span
                  className={`text-xs font-oswald uppercase px-2 py-1 rounded ${
                    event.active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {event.active ? t("statusActive") : t("statusUpcoming")}
                </span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {event.dates}
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  {event.rewards}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
