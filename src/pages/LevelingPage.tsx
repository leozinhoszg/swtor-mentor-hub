import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rich, Section, Card, SectionTitle, SlotItem } from "@/components/GuideComponents";

const LevelingPage = () => {
  const { t } = useTranslation("leveling");

  const fpModes = t("flashpoints.modes", { returnObjects: true }) as Array<{
    name: string;
    desc: string;
  }>;

  const boosts = t("xpBoosts.boosts", { returnObjects: true }) as Array<{
    name: string;
    desc: string;
  }>;

  const tips = t("tips.tipsList", { returnObjects: true }) as string[];

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
            <TrendingUp className="w-8 h-8 text-primary" />
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
            <SectionTitle>{t("heroics.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("heroics.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("heroics.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("heroics.text3"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("flashpoints.title")}</SectionTitle>
            <p className="text-muted-foreground mb-4">{rich(t("flashpoints.text1"))}</p>
            <ul className="space-y-2 mb-4">
              {fpModes.map((mode) => (
                <SlotItem key={mode.name} name={mode.name} desc={mode.desc} />
              ))}
            </ul>
            <p className="text-muted-foreground">{rich(t("flashpoints.text2"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("pvp.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("pvp.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("pvp.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("pvp.text3"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("xpBoosts.title")}</SectionTitle>
            <p className="text-muted-foreground mb-4">{rich(t("xpBoosts.text1"))}</p>
            <ul className="space-y-2">
              {boosts.map((boost) => (
                <SlotItem key={boost.name} name={boost.name} desc={boost.desc} />
              ))}
            </ul>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("planetaryMissions.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("planetaryMissions.text1"))}</p>
            <p className="text-muted-foreground">{rich(t("planetaryMissions.text2"))}</p>
          </Card>
        </Section>

        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("tips.title")}</SectionTitle>
            <ul className="space-y-3 mt-4">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </Section>
      </div>

      <Footer />
    </main>
  );
};

export default LevelingPage;
