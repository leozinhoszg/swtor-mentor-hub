import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Swords, Hammer, Target, Trophy, Lightbulb, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categoryIcons = [
  <BookOpen className="w-8 h-8" />,
  <Swords className="w-8 h-8" />,
  <Hammer className="w-8 h-8" />,
  <Target className="w-8 h-8" />,
  <Trophy className="w-8 h-8" />,
  <Lightbulb className="w-8 h-8" />,
];

const GuidesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation("guides");

  const guideCategories = (t("pageCategories", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    articles: string[];
  }>).map((cat, i) => ({
    ...cat,
    icon: categoryIcons[i],
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

      {/* Guides Grid */}
      <section className="py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="space-y-12 max-w-6xl mx-auto">
            {guideCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.1 }}
                className="glass-card-gold p-6 md:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-primary">{cat.icon}</div>
                  <div>
                    <h2 className="font-cinzel font-bold text-2xl text-primary">
                      {cat.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">{cat.desc}</p>
                  </div>
                </div>

                <div className="divider-gold my-4" />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.articles.map((article) => (
                    <div
                      key={article}
                      className="flex items-center gap-2 px-4 py-3 rounded bg-muted/20 hover:bg-primary/10 cursor-pointer transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {article}
                      </span>
                    </div>
                  ))}
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

export default GuidesPage;
