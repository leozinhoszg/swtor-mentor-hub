import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, Gift } from "lucide-react";

const events = [
  {
    name: "Rakghoul Resurgence",
    status: "Ativo",
    dates: "10–17 Fev 2026",
    rewards: "Rakghoul DNA Canisters, Títulos exclusivos",
    active: true,
  },
  {
    name: "Bounty Contract Week",
    status: "Próximo",
    dates: "3–10 Mar 2026",
    rewards: "Bounty Contract, Companion customization",
    active: false,
  },
  {
    name: "Swoop Rally",
    status: "Próximo",
    dates: "24–31 Mar 2026",
    rewards: "Swoop Tokens, Mounts exclusivos",
    active: false,
  },
  {
    name: "Double XP Event",
    status: "Próximo",
    dates: "14–21 Abr 2026",
    rewards: "Experiência dobrada em todas atividades",
    active: false,
  },
];

const EventsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="eventos" className="py-24 md:py-32 bg-muted/5 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold text-center mb-4"
        >
          Eventos
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
                  {event.status}
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
