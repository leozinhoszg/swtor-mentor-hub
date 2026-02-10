import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Swords, Hammer, Target, Trophy, Lightbulb } from "lucide-react";

const guides = [
  { title: "Guia para Iniciantes", icon: <BookOpen className="w-7 h-7" />, desc: "Tudo que você precisa saber para começar no SWTOR." },
  { title: "Builds e Classes", icon: <Swords className="w-7 h-7" />, desc: "Builds otimizadas para todas as classes e specs." },
  { title: "Crafting e Economia", icon: <Hammer className="w-7 h-7" />, desc: "Domine o sistema de crafting e faça créditos." },
  { title: "PvP", icon: <Target className="w-7 h-7" />, desc: "Estratégias e dicas para Warzones e Arenas." },
  { title: "Conquistas", icon: <Trophy className="w-7 h-7" />, desc: "Guia completo de achievements e conquistas." },
  { title: "Dicas e Truques", icon: <Lightbulb className="w-7 h-7" />, desc: "Segredos e macetes que todo jogador deveria saber." },
];

const GuidesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guias" className="py-24 md:py-32 bg-muted/5 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold text-center mb-4"
        >
          Guias
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="divider-gold mx-auto max-w-xs mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card-gold p-6 text-center group cursor-pointer transition-all duration-300"
            >
              <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {guide.icon}
              </div>
              <h3 className="font-cinzel font-bold text-base text-foreground mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-muted-foreground">{guide.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
