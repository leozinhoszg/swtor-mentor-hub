import { motion } from "framer-motion";
import { ArrowLeft, Monitor, BookOpen, Swords, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/components/GuideComponents";

const cardIcons = [
  <Monitor className="w-8 h-8" />,
  <BookOpen className="w-8 h-8" />,
  <Swords className="w-8 h-8" />,
  <TrendingUp className="w-8 h-8" />,
];

const MidGamePage = () => {
  const { t } = useTranslation("midGame");

  const cards = t("cards", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    href: string;
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

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/conteudo"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-oswald uppercase text-sm tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backLink")}
        </Link>
      </div>

      {/* Cards Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {cards.map((card, i) => (
              <Section key={card.title} delay={0.1 + i * 0.1}>
                <Link to={card.href} className="block group">
                  <div className="glass-card-gold p-6 md:p-8 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(48_92%_55%_/_0.15)]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-primary">{cardIcons[i]}</div>
                      <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-cinzel font-bold text-xl text-primary mb-2">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MidGamePage;
