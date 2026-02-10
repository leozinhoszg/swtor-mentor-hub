import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Gift, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EventsPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation("events");

  const events = t("pageEvents", { returnObjects: true }) as Array<{
    name: string;
    status: string;
    dates: string;
    rewards: string;
    active: boolean;
    desc: string;
    tips: string[];
  }>;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cinzel font-bold text-4xl md:text-5xl text-gradient-gold mb-4"
          >
            {t("pageTitle")}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="divider-gold mx-auto max-w-xs mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("pageDescription")}
          </motion.p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={`glass-card-gold p-6 transition-all duration-300 ${
                  event.active ? "ring-1 ring-green-500/30" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {event.active && <Star className="w-5 h-5 text-green-400 fill-green-400" />}
                    <h3 className="font-cinzel font-bold text-xl text-foreground">
                      {event.name}
                    </h3>
                  </div>
                  <span
                    className={`self-start text-xs font-oswald uppercase px-3 py-1 rounded ${
                      event.active
                        ? "bg-green-500/20 text-green-400 border border-green-800/30"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {event.active ? t("statusActive") : t("statusUpcoming")}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{event.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{event.dates}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Gift className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{event.rewards}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-2 block">
                    {t("tipsLabel")}
                  </span>
                  <ul className="space-y-1">
                    {event.tips.map((tip) => (
                      <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EventsPage;
