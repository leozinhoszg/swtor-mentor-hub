import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Map } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MidGamePage = () => {
  const sectionsRef = useRef(null);
  const sectionsInView = useInView(sectionsRef, { once: true, margin: "-50px" });
  const { t } = useTranslation("midGame");

  const sections = t("sections", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Map className="w-8 h-8 text-primary" />
            <h1 className="font-cinzel font-bold text-4xl md:text-5xl text-gradient-gold">
              {t("pageTitle")}
            </h1>
          </motion.div>
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

      {/* Sections Grid */}
      <section className="py-16 md:py-24" ref={sectionsRef}>
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="glass-card-gold p-6 transition-all duration-300"
              >
                <h3 className="font-cinzel font-bold text-base text-primary mb-2">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm">{section.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="font-cinzel font-bold text-xl text-primary mb-3">
                {t("comingSoon")}
              </h3>
              <p className="text-muted-foreground">
                {t("comingSoonDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MidGamePage;
