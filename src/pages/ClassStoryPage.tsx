import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Swords,
  Shield,
  BookOpen,
  Users,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Crosshair,
  GitBranch,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CLASS_META,
  getClassArrayKey,
  type ClassSlug,
  type ClassStoryData,
} from "@/data/classStoryMeta";

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

  const accentBorder = isEmpire ? "border-red-800/30" : "border-blue-800/30";
  const accentBg = isEmpire ? "bg-red-900/20" : "bg-blue-900/20";
  const accentText = isEmpire ? "text-red-400" : "text-blue-400";
  const accentLeft = isEmpire ? "border-l-red-500" : "border-l-blue-500";
  const FactionIcon = isEmpire ? Swords : Shield;
  const factionIconColor = isEmpire ? "text-red-500" : "text-blue-500";

  const storyRef = useRef(null);
  const companionsRef = useRef(null);
  const planetsRef = useRef(null);
  const advancedRef = useRef(null);
  const choicesRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-50px" });
  const companionsInView = useInView(companionsRef, {
    once: true,
    margin: "-50px",
  });
  const planetsInView = useInView(planetsRef, {
    once: true,
    margin: "-50px",
  });
  const advancedInView = useInView(advancedRef, {
    once: true,
    margin: "-50px",
  });
  const choicesInView = useInView(choicesRef, {
    once: true,
    margin: "-50px",
  });

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
            <FactionIcon className={`w-12 h-12 ${factionIconColor}`} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cinzel font-bold text-4xl md:text-5xl text-gradient-gold mb-4"
          >
            {classSummary.name}
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
            {classSummary.desc}
          </motion.p>
        </div>
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/historias"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-oswald uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          {labels.backToStories}
        </Link>
      </div>

      {/* Story Section */}
      <section className="pb-16 md:pb-24" ref={storyRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <BookOpen className={`w-7 h-7 ${factionIconColor}`} />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
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
                  className={`glass-card-gold p-6 border-l-2 ${accentLeft}`}
                >
                  <h3 className="font-cinzel font-bold text-lg text-primary mb-2">
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
      <section className="py-16 md:py-24 bg-muted/5" ref={companionsRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={companionsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Users className={`w-7 h-7 ${factionIconColor}`} />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
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
                  className="glass-card-gold p-5"
                >
                  <h3 className="font-cinzel font-bold text-base text-primary mb-2">
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
      </section>

      {/* Planets Section */}
      <section className="py-16 md:py-24" ref={planetsRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={planetsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <MapPin className={`w-7 h-7 ${factionIconColor}`} />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-oswald uppercase tracking-wider ${accentBg} ${accentText} border ${accentBorder}`}
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
      <section className="py-16 md:py-24 bg-muted/5" ref={advancedRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={advancedInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Crosshair className={`w-7 h-7 ${factionIconColor}`} />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
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
                  className="glass-card-gold p-6"
                >
                  <h3 className="font-cinzel font-bold text-xl text-primary mb-3">
                    {ac.name}
                  </h3>
                  <span
                    className={`inline-block text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded ${accentBg} ${accentText} border ${accentBorder} mb-3`}
                  >
                    {ac.role}
                  </span>
                  <div className="divider-gold my-3" />
                  <div>
                    <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-1 block">
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
      </section>

      {/* Key Choices Section */}
      <section className="py-16 md:py-24" ref={choicesRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={choicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <GitBranch className={`w-7 h-7 ${factionIconColor}`} />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
                {labels.keyChoices}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={choicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card-gold p-6"
            >
              <div className="space-y-0">
                {storyData.keyChoices.map((choice, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 ${
                      i < storyData.keyChoices.length - 1
                        ? "border-b border-border/30"
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
