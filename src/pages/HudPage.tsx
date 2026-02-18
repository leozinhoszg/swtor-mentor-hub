import { motion } from "framer-motion";
import { ArrowLeft, Monitor, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rich, Section, Img, Card, SectionTitle } from "@/components/GuideComponents";

import img1 from "@/assets/hud-interface/1.png";
import img2 from "@/assets/hud-interface/2.png";
import img3 from "@/assets/hud-interface/3.png";
import img4 from "@/assets/hud-interface/4.png";
import img5 from "@/assets/hud-interface/5.png";
import img6 from "@/assets/hud-interface/6.png";
import img7 from "@/assets/hud-interface/7.png";
import img8 from "@/assets/hud-interface/8.png";
import img9 from "@/assets/hud-interface/9.png";
import img10 from "@/assets/hud-interface/10.png";
import img11 from "@/assets/hud-interface/11.png";
import img12 from "@/assets/hud-interface/12.png";
import img13 from "@/assets/hud-interface/13.png";
import img14 from "@/assets/hud-interface/14.png";
import img15 from "@/assets/hud-interface/15.png";
import img17 from "@/assets/hud-interface/17.png";
import img18 from "@/assets/hud-interface/18.png";
import img19 from "@/assets/hud-interface/19.png";
import img20 from "@/assets/hud-interface/20.png";
import img21 from "@/assets/hud-interface/21.png";
import img22 from "@/assets/hud-interface/22.png";
import img23 from "@/assets/hud-interface/23.png";
import img24 from "@/assets/hud-interface/24.png";
import img25 from "@/assets/hud-interface/25.png";
import img26 from "@/assets/hud-interface/26.png";

const HudPage = () => {
  const { t } = useTranslation("hud");

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
            <Monitor className="w-8 h-8 text-primary" />
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

      {/* Content */}
      <div className="container mx-auto px-4 pb-24 max-w-4xl space-y-12">
        {/* Preferences */}
        <Section>
          <Card>
            <SectionTitle>{t("preferences.title")}</SectionTitle>
            <p className="text-muted-foreground mb-4">{rich(t("preferences.text1"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("preferences.text2"))}</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Img src={img1} alt={t("preferences.imgAlt1")} caption={t("preferences.imgCaption1")} />
              <Img src={img2} alt={t("preferences.imgAlt2")} caption={t("preferences.imgCaption2")} />
            </div>
            <p className="text-muted-foreground">{rich(t("preferences.text3"))}</p>
          </Card>
        </Section>

        {/* Combat Logging */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("combatLogging.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("combatLogging.text1"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("combatLogging.text2"))}</p>
            <Img src={img3} alt={t("combatLogging.imgAlt")} caption={t("combatLogging.imgCaption")} className="max-w-md mx-auto" />
          </Card>
        </Section>

        {/* Subtitles */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("subtitles.title")}</SectionTitle>
            <p className="text-muted-foreground mb-6">{rich(t("subtitles.text1"))}</p>
            <Img src={img4} alt={t("subtitles.imgAlt")} caption={t("subtitles.imgCaption")} className="max-w-md mx-auto" />
          </Card>
        </Section>

        {/* Tooltips */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("tooltips.title")}</SectionTitle>
            <p className="text-muted-foreground mb-6">{rich(t("tooltips.text1"))}</p>
            <Img src={img5} alt={t("tooltips.imgAlt")} caption={t("tooltips.imgCaption")} className="max-w-md mx-auto" />
          </Card>
        </Section>

        {/* Crucial Settings */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("crucialSettings.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2 font-semibold">{rich(t("crucialSettings.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("crucialSettings.text2"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("crucialSettings.text3"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("crucialSettings.text4"))}</p>
            <Img src={img6} alt={t("crucialSettings.imgAlt")} caption={t("crucialSettings.imgCaption")} />
          </Card>
        </Section>

        {/* Interface Editor */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("interfaceEditor.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("interfaceEditor.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("interfaceEditor.text2"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("interfaceEditor.text3"))}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Img src={img7} alt={t("interfaceEditor.imgAlt1")} caption={t("interfaceEditor.imgCaption1")} />
              <Img src={img8} alt={t("interfaceEditor.imgAlt2")} caption={t("interfaceEditor.imgCaption2")} />
            </div>
          </Card>
        </Section>

        {/* Operation Frame */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("operationFrame.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("operationFrame.text1"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("operationFrame.text2"))}</p>
            <div className="grid md:grid-cols-3 gap-4">
              <Img src={img9} alt={t("operationFrame.imgAlt1")} caption={t("operationFrame.imgCaption1")} />
              <Img src={img10} alt={t("operationFrame.imgAlt2")} caption={t("operationFrame.imgCaption2")} />
              <Img src={img11} alt={t("operationFrame.imgAlt3")} caption={t("operationFrame.imgCaption3")} />
            </div>
          </Card>
        </Section>

        {/* Target Frame */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("targetFrame.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("targetFrame.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("targetFrame.text2"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("targetFrame.text3"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("targetFrame.text4"))}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Img src={img12} alt={t("targetFrame.imgAlt1")} caption={t("targetFrame.imgCaption1")} />
              <Img src={img13} alt={t("targetFrame.imgAlt2")} caption={t("targetFrame.imgCaption2")} />
              <Img src={img14} alt={t("targetFrame.imgAlt3")} caption={t("targetFrame.imgCaption3")} />
              <Img src={img15} alt={t("targetFrame.imgAlt4")} caption={t("targetFrame.imgCaption4")} />
            </div>
          </Card>
        </Section>

        {/* Target of Target */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("targetOfTarget.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("targetOfTarget.text1"))}</p>
            <p className="text-muted-foreground">{rich(t("targetOfTarget.text2"))}</p>
          </Card>
        </Section>

        {/* Focus Target */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("focusTarget.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("focusTarget.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("focusTarget.text2"))}</p>
            <p className="text-muted-foreground">{rich(t("focusTarget.text3"))}</p>
          </Card>
        </Section>

        {/* Debuff Tray */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("debuffTray.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("debuffTray.text1"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("debuffTray.text2"))}</p>
            <Img src={img17} alt={t("debuffTray.imgAlt")} caption={t("debuffTray.imgCaption")} />
          </Card>
        </Section>

        {/* Buff Tray */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("buffTray.title")}</SectionTitle>
            <p className="text-muted-foreground mb-6">{rich(t("buffTray.text1"))}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Img src={img18} alt={t("buffTray.imgAlt1")} caption={t("buffTray.imgCaption1")} />
              <Img src={img19} alt={t("buffTray.imgAlt2")} caption={t("buffTray.imgCaption2")} />
            </div>
          </Card>
        </Section>

        {/* System Messages */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("systemMessages.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("systemMessages.text1"))}</p>
            <p className="text-muted-foreground mb-2">{rich(t("systemMessages.text2"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("systemMessages.text3"))}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Img src={img20} alt={t("systemMessages.imgAlt1")} caption={t("systemMessages.imgCaption1")} />
              <Img src={img21} alt={t("systemMessages.imgAlt2")} caption={t("systemMessages.imgCaption2")} />
              <Img src={img22} alt={t("systemMessages.imgAlt3")} caption={t("systemMessages.imgCaption3")} />
              <Img src={img23} alt={t("systemMessages.imgAlt4")} caption={t("systemMessages.imgCaption4")} />
            </div>
          </Card>
        </Section>

        {/* Quickbars */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("quickbars.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("quickbars.text1"))}</p>
            <p className="text-muted-foreground">{rich(t("quickbars.text2"))}</p>
          </Card>
        </Section>

        {/* Preset Interfaces */}
        <Section delay={0.1}>
          <Card>
            <SectionTitle>{t("presetInterfaces.title")}</SectionTitle>
            <p className="text-muted-foreground mb-2">{rich(t("presetInterfaces.text1"))}</p>
            <p className="text-muted-foreground mb-6">{rich(t("presetInterfaces.text2"))}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Img src={img24} alt={t("presetInterfaces.imgAlt1")} caption={t("presetInterfaces.imgCaption1")} />
              <Img src={img25} alt={t("presetInterfaces.imgAlt2")} caption={t("presetInterfaces.imgCaption2")} />
              <Img src={img26} alt={t("presetInterfaces.imgAlt3")} caption={t("presetInterfaces.imgCaption3")} />
            </div>
            <a
              href={t("presetInterfaces.downloadUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-oswald uppercase tracking-wider text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              {t("presetInterfaces.downloadLabel")}
            </a>
          </Card>
        </Section>
      </div>

      <Footer />
    </main>
  );
};

export default HudPage;
