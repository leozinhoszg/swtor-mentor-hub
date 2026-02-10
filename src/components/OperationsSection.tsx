import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skull } from "lucide-react";

const operations = [
  { name: "Eternity Vault", difficulty: "Fácil", players: "8/16", desc: "A primeira operation, perfeita para iniciantes." },
  { name: "Karagga's Palace", difficulty: "Fácil", players: "8/16", desc: "Enfrente Karagga e seus capangas no palácio Hutt." },
  { name: "Explosive Conflict", difficulty: "Médio", players: "8/16", desc: "Batalha intensa em Denova contra mercenários." },
  { name: "Terror From Beyond", difficulty: "Médio", players: "8/16", desc: "Explore os mistérios do Gree Hypergate." },
  { name: "Scum and Villainy", difficulty: "Médio", players: "8/16", desc: "Persiga o Dread Masters em Darvannis." },
  { name: "Dread Fortress", difficulty: "Difícil", players: "8/16", desc: "Confronte os Dread Masters em Oricon." },
  { name: "Dread Palace", difficulty: "Difícil", players: "8/16", desc: "O confronto final contra os Dread Masters." },
  { name: "Gods of the Machine", difficulty: "Muito Difícil", players: "8/16", desc: "A operation mais desafiadora do SWTOR." },
];

const difficultyColor: Record<string, string> = {
  "Fácil": "text-green-400",
  "Médio": "text-yellow-400",
  "Difícil": "text-orange-400",
  "Muito Difícil": "text-red-400",
};

const OperationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="operations" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold text-center mb-4"
        >
          Operations
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
                  {op.difficulty}
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
