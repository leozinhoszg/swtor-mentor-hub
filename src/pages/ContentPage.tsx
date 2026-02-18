import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Map, Crown, ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const phaseIcons = [
  <Rocket className="w-10 h-10" />,
  <Map className="w-10 h-10" />,
  <Crown className="w-10 h-10" />,
];

const ContentPage = () => {
  const { t } = useTranslation("content");

  const phases = (t("pagePhases", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    topics: Array<{ name: string; desc: string; href?: string }>;
  }>).map((p, i) => ({
    ...p,
    icon: phaseIcons[i],
  }));

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

      {/* Phases */}
      {phases.map((phase, phaseIdx) => {
        const PhaseSection = () => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <section
              key={phase.title}
              className={`py-16 md:py-24 ${phaseIdx % 2 === 1 ? "bg-muted/5" : ""}`}
              ref={ref}
            >
              <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center gap-4 mb-4"
                >
                  <div className="text-primary">{phase.icon}</div>
                  <h2 className="font-cinzel font-bold text-3xl text-gradient-gold">
                    {phase.title}
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-muted-foreground mb-10 max-w-3xl mx-auto text-center"
                >
                  {phase.desc}
                </motion.p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto justify-items-center">
                  {phase.topics.map((topic, i) => {
                    const inner = (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-cinzel font-bold text-base ${topic.href ? "text-primary" : "text-muted-foreground/60"}`}>
                            {topic.name}
                          </h3>
                          {topic.href ? (
                            <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
                          )}
                        </div>
                        <p className={`text-sm ${topic.href ? "text-muted-foreground" : "text-muted-foreground/40"}`}>{topic.desc}</p>
                        {!topic.href && (
                          <span className="inline-block mt-2 text-xs font-oswald uppercase tracking-wider text-muted-foreground/30">
                            Coming Soon
                          </span>
                        )}
                      </>
                    );

                    return topic.href ? (
                      <motion.div
                        key={topic.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                      >
                        <Link
                          to={topic.href}
                          className="glass-card-gold p-5 group cursor-pointer transition-all duration-300 block h-full hover:border-primary/30"
                        >
                          {inner}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={topic.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                        className="glass-card-gold p-5 opacity-50 transition-all duration-300"
                      >
                        {inner}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        };

        return <PhaseSection key={phase.title} />;
      })}

      <Footer />
    </main>
  );
};

export default ContentPage;
