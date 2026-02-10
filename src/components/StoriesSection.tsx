import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Swords } from "lucide-react";

const factions = [
  {
    name: "Império",
    icon: <Swords className="w-10 h-10 text-primary" />,
    classes: ["Sith Warrior", "Sith Inquisitor", "Bounty Hunter", "Imperial Agent"],
    color: "from-red-900/20 to-card/40",
  },
  {
    name: "República",
    icon: <Shield className="w-10 h-10 text-primary" />,
    classes: ["Jedi Knight", "Jedi Consular", "Trooper", "Smuggler"],
    color: "from-blue-900/20 to-card/40",
  },
];

const StoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="historias" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold text-center mb-4"
        >
          Histórias
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
              className="glass-card-gold p-8 text-center group cursor-pointer transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{faction.icon}</div>
              <h3 className="font-cinzel font-bold text-2xl text-primary mb-6">
                {faction.name}
              </h3>
              <div className="space-y-3">
                {faction.classes.map((cls, j) => (
                  <motion.div
                    key={cls}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + j * 0.1 }}
                    className="py-2 px-4 rounded bg-muted/30 text-muted-foreground text-sm font-oswald uppercase tracking-wider hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {cls}
                  </motion.div>
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
