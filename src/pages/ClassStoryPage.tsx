import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Users,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Crosshair,
  GitBranch,
  Swords,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import impLogo from "@/assets/empire.svg";
import pubLogo from "@/assets/republic.svg";
import sithWarriorIcon from "@/assets/sith_warrior.svg";
import sithInquisitorIcon from "@/assets/sith_inquisitor.svg";
import bountyHunterIcon from "@/assets/bonty_hunter.svg";
import imperialAgentIcon from "@/assets/imperial_agent.svg";
import jediKnightIcon from "@/assets/Jedi_knight.svg";
import jediConsularIcon from "@/assets/jedi_consular.svg";
import trooperIcon from "@/assets/trooper.svg";
import smugglerIcon from "@/assets/smuggler.svg";
import juggernautIcon from "@/assets/juggernaut.svg";
import assassinIcon from "@/assets/assassin.svg";
import {
  CLASS_META,
  getClassArrayKey,
  type ClassSlug,
  type ClassStoryData,
} from "@/data/classStoryMeta";

const CLASS_ICONS: Partial<Record<ClassSlug, string>> = {
  "sith-warrior": sithWarriorIcon,
  "sith-inquisitor": sithInquisitorIcon,
  "bounty-hunter": bountyHunterIcon,
  "imperial-agent": imperialAgentIcon,
  "jedi-knight": jediKnightIcon,
  "jedi-consular": jediConsularIcon,
  "trooper": trooperIcon,
  "smuggler": smugglerIcon,
};

const ADVANCED_CLASS_ICONS: Partial<Record<ClassSlug, Record<number, string>>> = {
  "sith-warrior": { 0: juggernautIcon },
  "sith-inquisitor": { 1: assassinIcon },
};

const storyChapters = ["prologue", "act1", "act2", "act3"] as const;

const ClassStoryPage = () => {
  const { classSlug } = useParams<{ classSlug: string }>();
  const { t } = useTranslation("stories");

  const meta = CLASS_META[classSlug as ClassSlug];
  if (!meta) return <Navigate to="/historias" replace />;

  const { faction, index, storyKey } = meta;
  const isEmpire = faction === "empire";

  const classArrayKey = getClassArrayKey(faction);
  const classSummary = (
    t(classArrayKey, { returnObjects: true }) as Array<{
      name: string;
      advanced: string[];
      desc: string;
    }>
  )[index];

  const storyData = t(`classStories.${storyKey}`, {
    returnObjects: true,
  }) as ClassStoryData;
  const labels = t("classStoryLabels", { returnObjects: true }) as Record<
    string,
    string
  >;

  // Faction theming
  const factionLogo = isEmpire ? impLogo : pubLogo;
  const classIcon = CLASS_ICONS[classSlug as ClassSlug];
  const accentBorder = isEmpire ? "border-red-800/30" : "border-blue-800/30";
  const accentBg = isEmpire ? "bg-red-900/20" : "bg-blue-900/20";
  const accentText = isEmpire ? "text-red-400" : "text-blue-400";
  const accentLeft = isEmpire ? "border-l-red-500" : "border-l-blue-500";
  const iconColor = isEmpire ? "text-red-500" : "text-blue-500";

  const lightsaberColor = isEmpire ? "#ef4444" : "#3b82f6";
  const lightsaberColorLight = isEmpire ? "#ff6b6b" : "#60a5fa";
  const lightsaberGradient = `linear-gradient(90deg, transparent, ${lightsaberColor}, ${lightsaberColorLight}, ${lightsaberColor}, transparent)`;
  const lightsaberShadow = `0 0 15px ${lightsaberColor}, 0 0 30px ${lightsaberColor}80, 0 0 60px ${lightsaberColor}40`;

  const bgGradient1 = isEmpire
    ? "bg-gradient-to-b from-red-950/50 via-red-950/15 to-background"
    : "bg-gradient-to-b from-blue-950/50 via-blue-950/15 to-background";
  const bgGradient2 = isEmpire
    ? "bg-gradient-to-r from-red-900/20 via-transparent to-transparent"
    : "bg-gradient-to-l from-blue-900/20 via-transparent to-transparent";

  const cardClass = isEmpire
    ? "rounded-lg border border-red-800/30 bg-gradient-to-br from-red-950/30 via-black/60 to-black/80 backdrop-blur-sm hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all duration-300"
    : "rounded-lg border border-blue-800/30 bg-gradient-to-br from-blue-950/30 via-black/60 to-black/80 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300";

  const sectionBg = isEmpire
    ? "bg-red-950/10"
    : "bg-blue-950/10";

  const titleGradient = isEmpire
    ? "bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-300 to-red-500"
    : "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500";

  const storyRef = useRef(null);
  const companionsRef = useRef(null);
  const planetsRef = useRef(null);
  const advancedRef = useRef(null);
  const choicesRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-50px" });
  const companionsInView = useInView(companionsRef, { once: true, margin: "-50px" });
  const planetsInView = useInView(planetsRef, { once: true, margin: "-50px" });
  const advancedInView = useInView(advancedRef, { once: true, margin: "-50px" });
  const choicesInView = useInView(choicesRef, { once: true, margin: "-50px" });

  const LightsaberDivider = ({ inView, origin = "left", delay = 0 }: { inView: boolean; origin?: string; delay?: number }) => (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`absolute left-0 right-0 h-[2px] origin-${origin}`}
      style={{ background: lightsaberGradient, boxShadow: lightsaberShadow }}
    />
  );

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className={`absolute inset-0 ${bgGradient1}`} />
        <div className={`absolute inset-0 ${bgGradient2}`} />

        {/* Lightsaber bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: lightsaberGradient, boxShadow: lightsaberShadow }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            {classIcon ? (
              <motion.img
                src={classIcon}
                alt={classSummary.name}
                animate={{
                  filter: [
                    `drop-shadow(0 0 8px ${lightsaberColor}40)`,
                    `drop-shadow(0 0 20px ${lightsaberColor}70)`,
                    `drop-shadow(0 0 8px ${lightsaberColor}40)`,
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            ) : (
              <motion.img
                src={factionLogo}
                alt={isEmpire ? "Império" : "República"}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, delay: 0.5 }}
                className="w-14 h-14 md:w-16 md:h-16 object-contain"
                style={{ filter: `drop-shadow(0 0 12px ${lightsaberColor}80)` }}
              />
            )}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-cinzel font-bold text-4xl md:text-5xl mb-4 ${titleGradient}`}
          >
            {classSummary.name}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-xs mb-6 h-[1px]"
            style={{ background: lightsaberGradient, boxShadow: `0 0 8px ${lightsaberColor}60` }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {classSummary.desc}
          </motion.p>
        </div>
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8 mt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/historias"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:${accentText.replace("text-", "text-")} transition-colors font-oswald uppercase tracking-wider`}
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.backToStories}
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link
            to="/conteudo/early-game/classes"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:${accentText.replace("text-", "text-")} transition-colors font-oswald uppercase tracking-wider`}
          >
            <Swords className="w-4 h-4" />
            {labels.classOverview}
          </Link>
        </div>
      </div>

      {/* Story Section */}
      <section className="pb-16 md:pb-24 relative overflow-hidden" ref={storyRef}>
        <div className={`absolute inset-0 ${bgGradient2} opacity-50`} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <BookOpen className={`w-7 h-7 ${iconColor}`} />
              <h2 className={`font-cinzel font-bold text-2xl ${titleGradient}`}>
                {classSummary.name}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {storyChapters.map((chapter, i) => (
                <motion.div
                  key={chapter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`${cardClass} p-6 border-l-2 ${accentLeft}`}
                >
                  <h3 className={`font-cinzel font-bold text-lg mb-2 ${accentText}`}>
                    {labels[chapter]}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {storyData.story[chapter]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companions Section */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${sectionBg}`} ref={companionsRef}>
        <div className="absolute top-0 left-0 right-0">
          <LightsaberDivider inView={companionsInView} origin="left" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={companionsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Users className={`w-7 h-7 ${iconColor}`} />
              <h2 className={`font-cinzel font-bold text-2xl ${titleGradient}`}>
                {labels.companions}
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storyData.companions.map((companion, i) => (
                <motion.div
                  key={companion.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={companionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`${cardClass} p-5`}
                >
                  <h3 className={`font-cinzel font-bold text-base mb-2 ${accentText}`}>
                    {companion.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {companion.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <LightsaberDivider inView={companionsInView} origin="right" delay={0.3} />
        </div>
      </section>

      {/* Planets Section */}
      <section className="py-16 md:py-24 relative overflow-hidden" ref={planetsRef}>
        <div className={`absolute inset-0 ${bgGradient2} opacity-30`} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={planetsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <MapPin className={`w-7 h-7 ${iconColor}`} />
              <h2 className={`font-cinzel font-bold text-2xl ${titleGradient}`}>
                {labels.planets}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={planetsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2"
            >
              {storyData.planets.map((planet, i) => (
                <div key={planet} className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-oswald uppercase tracking-wider ${accentBg} ${accentText} border ${accentBorder} transition-all duration-300 hover:shadow-[0_0_12px_${lightsaberColor}30]`}
                  >
                    <MapPin className="w-3 h-3" />
                    {planet}
                  </span>
                  {i < storyData.planets.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Classes Section */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${sectionBg}`} ref={advancedRef}>
        <div className="absolute top-0 left-0 right-0">
          <LightsaberDivider inView={advancedInView} origin="right" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={advancedInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Crosshair className={`w-7 h-7 ${iconColor}`} />
              <h2 className={`font-cinzel font-bold text-2xl ${titleGradient}`}>
                {labels.advancedClasses}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {storyData.advancedClasses.map((ac, i) => (
                <motion.div
                  key={ac.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={advancedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`${cardClass} p-6`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    {ADVANCED_CLASS_ICONS[classSlug as ClassSlug]?.[i] && (
                      <img
                        src={ADVANCED_CLASS_ICONS[classSlug as ClassSlug]![i]}
                        alt={ac.name}
                        className="w-12 h-12 object-contain flex-shrink-0"
                        style={{ filter: `drop-shadow(0 0 6px ${lightsaberColor}50)` }}
                      />
                    )}
                    <h3 className={`font-cinzel font-bold text-xl ${accentText}`}>
                      {ac.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-block text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded ${accentBg} ${accentText} border ${accentBorder} mb-3`}
                  >
                    {ac.role}
                  </span>
                  <div
                    className="my-3 h-[1px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${lightsaberColor}40, transparent)` }}
                  />
                  <div>
                    <span className={`text-xs font-oswald uppercase tracking-wider mb-1 block ${accentText} opacity-70`}>
                      {labels.combatStyle}
                    </span>
                    <p className="text-muted-foreground text-sm">
                      {ac.combatStyle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <LightsaberDivider inView={advancedInView} origin="left" delay={0.3} />
        </div>
      </section>

      {/* Key Choices Section */}
      <section className="py-16 md:py-24 relative overflow-hidden" ref={choicesRef}>
        <div className={`absolute inset-0 ${bgGradient2} opacity-30`} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={choicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <GitBranch className={`w-7 h-7 ${iconColor}`} />
              <h2 className={`font-cinzel font-bold text-2xl ${titleGradient}`}>
                {labels.keyChoices}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={choicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${cardClass} p-6`}
            >
              <div className="space-y-0">
                {storyData.keyChoices.map((choice, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 ${
                      i < storyData.keyChoices.length - 1
                        ? `border-b border-${isEmpire ? "red" : "blue"}-900/20`
                        : ""
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full ${accentBg} ${accentText} border ${accentBorder} flex items-center justify-center text-xs font-bold`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground text-sm pt-1">
                      {choice}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ClassStoryPage;
