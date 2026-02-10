import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-cinzel font-bold text-3xl md:text-4xl text-gradient-gold mb-4"
        >
          Sobre Nós
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="divider-gold mx-auto max-w-xs mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          Bem-vindo ao <span className="text-primary font-semibold">The SWTOR Mentor</span>, o melhor lugar para aprender tudo sobre Star Wars: The Old Republic (SWTOR). Nós somos um grupo de jogadores experientes e apaixonados por SWTOR, e estamos aqui para compartilhar nossos conhecimentos com jogadores novos e antigos.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="divider-gold mx-auto max-w-xs mt-8"
        />
      </div>
    </section>
  );
};

export default AboutSection;
