import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Swords, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMPERIAL_SLUGS, REPUBLIC_SLUGS } from "@/data/classStoryMeta";

const StoriesPage = () => {
  const impRef = useRef(null);
  const repRef = useRef(null);
  const impInView = useInView(impRef, { once: true, margin: "-50px" });
  const repInView = useInView(repRef, { once: true, margin: "-50px" });
  const { t } = useTranslation("stories");

  const imperialClasses = t("imperialClasses", { returnObjects: true }) as Array<{
    name: string;
    advanced: string[];
    desc: string;
  }>;

  const republicClasses = t("republicClasses", { returnObjects: true }) as Array<{
    name: string;
    advanced: string[];
    desc: string;
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

      {/* Império */}
      <section className="py-16 md:py-24" ref={impRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={impInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <Swords className="w-8 h-8 text-red-500" />
            <h2 className="font-cinzel font-bold text-3xl text-gradient-gold">
              {t("empireSith")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={impInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl"
          >
            {t("empireDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {imperialClasses.map((cls, i) => (
              <Link to={`/historias/${IMPERIAL_SLUGS[i]}`} key={cls.name} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={impInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-card-gold p-6 group cursor-pointer transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-cinzel font-bold text-xl text-primary">
                      {cls.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{cls.desc}</p>
                  <div className="flex gap-2">
                    {cls.advanced.map((adv) => (
                      <span
                        key={adv}
                        className="text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded bg-red-900/20 text-red-400 border border-red-800/30"
                      >
                        {adv}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* República */}
      <section className="py-16 md:py-24 bg-muted/5" ref={repRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={repInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <Shield className="w-8 h-8 text-blue-500" />
            <h2 className="font-cinzel font-bold text-3xl text-gradient-gold">
              {t("galacticRepublic")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={repInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl"
          >
            {t("republicDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {republicClasses.map((cls, i) => (
              <Link to={`/historias/${REPUBLIC_SLUGS[i]}`} key={cls.name} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={repInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-card-gold p-6 group cursor-pointer transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-cinzel font-bold text-xl text-primary">
                      {cls.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{cls.desc}</p>
                  <div className="flex gap-2">
                    {cls.advanced.map((adv) => (
                      <span
                        key={adv}
                        className="text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded bg-blue-900/20 text-blue-400 border border-blue-800/30"
                      >
                        {adv}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StoriesPage;
