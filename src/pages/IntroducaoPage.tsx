import { motion } from "framer-motion";
import { ArrowLeft, Keyboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rich, Section, Img, Card, SectionTitle, SlotItem } from "@/components/GuideComponents";

import img1 from "@/assets/intro/1.png";
import img2 from "@/assets/intro/2.png";
import img3 from "@/assets/intro/3.png";
import img4 from "@/assets/intro/4.png";
import img5 from "@/assets/intro/5.png";
import img6 from "@/assets/intro/6.png";
import img7 from "@/assets/intro/7.png";
import img8 from "@/assets/intro/8.png";
import img9 from "@/assets/intro/9.png";
import img10 from "@/assets/intro/10.png";
import img11 from "@/assets/intro/11.png";
import img12 from "@/assets/intro/12.png";
import img13 from "@/assets/intro/13.png";
import img14 from "@/assets/intro/14.png";
import img15 from "@/assets/intro/15.png";
import img16 from "@/assets/intro/16.png";
import img17 from "@/assets/intro/17.png";
import img18 from "@/assets/intro/18.png";
import img19 from "@/assets/intro/19.png";
import img20 from "@/assets/intro/20.png";
import img21 from "@/assets/intro/21.png";
import img22 from "@/assets/intro/22.png";

/* ─── Main Page ─── */
const IntroducaoPage = () => {
  const { t } = useTranslation("intro");

  const combatItems = t("combatStyle.items", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const gearSlots = t("characterPane.gearSlots", { returnObjects: true }) as Array<{
    name: string;
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
            className="flex justify-center mb-4"
          >
            <Keyboard className="w-12 h-12 text-primary" />
          </motion.div>
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
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-oswald uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backLink")}
        </Link>
      </div>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-10 max-w-5xl">
          {/* ── Primeira Missão ── */}
          <Section>
            <Card>
              <SectionTitle>{t("firstMission.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img src={img1} alt={t("firstMission.imgAlt")} className="mb-6" />
              <p className="text-muted-foreground leading-relaxed text-center text-lg">
                {t("firstMission.text")}
              </p>
            </Card>
          </Section>

          {/* ── Missões ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("missions.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <div className="grid md:grid-cols-[1fr,auto] gap-6 items-center">
                <p className="text-muted-foreground leading-relaxed">
                  {t("missions.text")}
                </p>
                <Img
                  src={img2}
                  alt={t("missions.imgAlt")}
                  caption={t("missions.imgCaption")}
                  className="max-w-[280px]"
                />
              </div>
            </Card>
          </Section>

          {/* ── Mapa ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("map.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Img src={img3} alt={t("map.imgAlt1")} caption={t("map.imgCaption1")} />
                <Img src={img4} alt={t("map.imgAlt2")} caption={t("map.imgCaption2")} />
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("map.text1"))}</p>
                <p>{t("map.text2")}</p>
                <p>{t("map.text3")}</p>
                <p>{rich(t("map.text4"))}</p>
              </div>
            </Card>
          </Section>

          {/* ── System Alert / Holocommunicator / Rewards ── */}
          <Section delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <Img src={img5} alt={t("systemAlert.imgAlt")} className="mb-4" />
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
                  {t("systemAlert.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("systemAlert.text")}
                </p>
              </Card>

              <Card>
                <Img src={img6} alt={t("holocommunicator.imgAlt")} className="mb-4" />
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
                  {t("holocommunicator.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("holocommunicator.text")}
                </p>
              </Card>

              <Card>
                <Img src={img7} alt={t("rewards.imgAlt")} className="mb-4" />
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
                  {t("rewards.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("rewards.text")}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  {rich(t("rewards.text2"))}
                </p>
              </Card>
            </div>
          </Section>

          {/* ── Personal Phases & Escolhas ── */}
          <Section delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <Img src={img8} alt={t("personalPhases.imgAlt")} className="mb-4" />
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
                  {t("personalPhases.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("personalPhases.text")}
                </p>
              </Card>

              <Card>
                <Img src={img9} alt={t("choices.imgAlt")} className="mb-4" />
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
                  {t("choices.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("choices.text")}
                </p>
              </Card>
            </div>
          </Section>

          {/* ── Habilidades & Progressão ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("abilities.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Img src={img10} alt={t("abilities.imgAlt1")} caption={t("abilities.imgCaption1")} />
                <Img src={img11} alt={t("abilities.imgAlt2")} caption={t("abilities.imgCaption2")} />
                <Img src={img12} alt={t("abilities.imgAlt3")} caption={t("abilities.imgCaption3")} />
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("abilities.text1"))}</p>
                <p className="italic text-sm">{t("abilities.text2")}</p>
                <p>{rich(t("abilities.text3"))}</p>
                <p>{t("abilities.text4")}</p>
                <p>{rich(t("abilities.text5"))}</p>
              </div>
            </Card>
          </Section>

          {/* ── Character Pane & Gear ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("characterPane.title")}</SectionTitle>
              <div className="divider-gold my-4" />

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Img src={img13} alt={t("characterPane.imgAlt1")} caption={t("characterPane.imgCaption1")} />
                <Img src={img14} alt={t("characterPane.imgAlt2")} caption={t("characterPane.imgCaption2")} />
              </div>

              <div className="space-y-3 text-muted-foreground leading-relaxed mb-6">
                <p>{rich(t("characterPane.text1"))}</p>
                <p>{rich(t("characterPane.text2"))}</p>
                <p>{rich(t("characterPane.text3"))}</p>
              </div>

              <Img
                src={img15}
                alt={t("characterPane.imgAlt3")}
                caption={t("characterPane.imgCaption3")}
                className="max-w-md mx-auto mb-6"
              />

              <div className="bg-black/30 rounded-lg border border-primary/10 p-6">
                <h3 className="font-cinzel font-bold text-lg text-primary mb-4">
                  {t("characterPane.gearTitle")}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {gearSlots.map((slot) => (
                    <SlotItem key={slot.name} name={slot.name} desc={slot.desc} />
                  ))}
                </ul>
              </div>
            </Card>
          </Section>

          {/* ── Outfitter ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("outfitter.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Img src={img16} alt={t("outfitter.imgAlt1")} caption={t("outfitter.imgCaption1")} />
                <Img src={img17} alt={t("outfitter.imgAlt2")} caption={t("outfitter.imgCaption2")} />
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("outfitter.text1"))}</p>
                <p>{rich(t("outfitter.text2"))}</p>
                <p className="italic text-sm">{t("outfitter.text3")}</p>
              </div>
            </Card>
          </Section>

          {/* ── Combat Style ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("combatStyle.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img
                src={img18}
                alt={t("combatStyle.imgAlt")}
                caption={t("combatStyle.imgCaption")}
                className="mb-6"
              />
              <div className="space-y-3 text-muted-foreground leading-relaxed mb-6">
                <p>{rich(t("combatStyle.intro"))}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {combatItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-black/30 rounded-lg border border-primary/10 p-4"
                  >
                    <span className="text-primary font-cinzel font-bold text-sm block mb-1">
                      {item.title}
                    </span>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{t("combatStyle.text1")}</p>
                <p>{rich(t("combatStyle.text2"))}</p>
              </div>
            </Card>
          </Section>

          {/* ── Loadouts ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("loadouts.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img
                src={img19}
                alt={t("loadouts.imgAlt")}
                caption={t("loadouts.imgCaption")}
                className="mb-6"
              />
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("loadouts.text1"))}</p>
                <p>{rich(t("loadouts.text2"))}</p>
                <p>{rich(t("loadouts.text3"))}</p>
                <p className="italic text-sm">{t("loadouts.text4")}</p>
              </div>
            </Card>
          </Section>

          {/* ── Mission Log ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("missionLog.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img
                src={img20}
                alt={t("missionLog.imgAlt")}
                caption={t("missionLog.imgCaption")}
                className="mb-6"
              />
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("missionLog.text1"))}</p>
                <p>{t("missionLog.text2")}</p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>{rich(t("missionLog.dailies"))}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>{rich(t("missionLog.weeklies"))}</span>
                  </li>
                </ul>
              </div>
            </Card>
          </Section>

          {/* ── Legacy & Achievements ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("legacy.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img
                src={img21}
                alt={t("legacy.imgAlt")}
                caption={t("legacy.imgCaption")}
                className="mb-6"
              />
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{rich(t("legacy.text1"))}</p>
                <p>{t("legacy.text2")}</p>
                <p>{rich(t("legacy.text3"))}</p>
              </div>
            </Card>
          </Section>

          {/* ── Character Perks ── */}
          <Section delay={0.1}>
            <Card>
              <SectionTitle>{t("perks.title")}</SectionTitle>
              <div className="divider-gold my-4" />
              <Img
                src={img22}
                alt={t("perks.imgAlt")}
                caption={t("perks.imgCaption")}
                className="mb-6"
              />
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{t("perks.text1")}</p>
              </div>
            </Card>
          </Section>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IntroducaoPage;
