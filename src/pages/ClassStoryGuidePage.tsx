import { motion } from "framer-motion";
import { ArrowLeft, Swords, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rich, Section, Card, SectionTitle } from "@/components/GuideComponents";

const classLinks = [
  { label: "Sith Warrior", slug: "sith-warrior", faction: "empire" },
  { label: "Sith Inquisitor", slug: "sith-inquisitor", faction: "empire" },
  { label: "Bounty Hunter", slug: "bounty-hunter", faction: "empire" },
  { label: "Imperial Agent", slug: "imperial-agent", faction: "empire" },
  { label: "Jedi Knight", slug: "jedi-knight", faction: "republic" },
  { label: "Jedi Consular", slug: "jedi-consular", faction: "republic" },
  { label: "Trooper", slug: "trooper", faction: "republic" },
  { label: "Smuggler", slug: "smuggler", faction: "republic" },
];

const ClassStoryGuidePage = () => {
  const { t } = useTranslation("classStoryGuide");

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Swords className="w-8 h-8 text-primary" />
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

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/conteudo/mid-game"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-oswald uppercase text-sm tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backLink")}
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24 max-w-4xl space-y-12">
        <Section>
          <Card>
            <SectionTitle>{t("whatAre.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("whatAre.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("whatAre.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("whatAre.text3"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("progression.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("progression.text1"))}</p>
            <p className="text-muted-foreground">{rich(t("progression.text2"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("companions.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("companions.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("companions.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("companions.text3"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("choices.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("choices.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("choices.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("choices.text3"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("classLinks.title")}</SectionTitle>
            <p className="text-muted-foreground mb-6">{t("classLinks.text")}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {classLinks.map((cls) => (
                <Link
                  key={cls.slug}
                  to={`/historias/${cls.slug}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors group ${
                    cls.faction === "empire"
                      ? "border-red-800/30 hover:bg-red-900/20 hover:border-red-800/50"
                      : "border-blue-800/30 hover:bg-blue-900/20 hover:border-blue-800/50"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      cls.faction === "empire" ? "text-red-400" : "text-blue-400"
                    }`}
                  >
                    {cls.label}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                      cls.faction === "empire" ? "text-red-400" : "text-blue-400"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </Card>
        </Section>
      </div>

      <Footer />
    </main>
  );
};

export default ClassStoryGuidePage;
