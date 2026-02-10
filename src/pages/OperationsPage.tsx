import { motion, useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { Skull, Users, Shield, Swords, LayoutGrid, List, MapPin, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const difficultyColor: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10 border-green-800/30",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-800/30",
  hard: "text-orange-400 bg-orange-500/10 border-orange-800/30",
  veryHard: "text-red-400 bg-red-500/10 border-red-800/30",
};

const modeTabMap: Record<string, string> = {
  story: "storyMode",
  veteran: "veteran",
  master: "master",
};

type ViewMode = "cards" | "list";

interface Operation {
  name: string;
  slug: string;
  difficulty: string;
  players: string;
  desc: string;
  bosses: string[];
  planet: string;
}

const OperationCard = ({
  op,
  i,
  inView,
  t,
}: {
  op: Operation;
  i: number;
  inView: boolean;
  t: (key: string, opts?: object) => string;
}) => (
  <Link to={`/operations/${op.slug}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
      className="glass-card-gold p-6 group cursor-pointer transition-all duration-300 hover:border-primary/50 h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Skull className="w-6 h-6 text-primary" />
          <h3 className="font-cinzel font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {op.name}
          </h3>
        </div>
        <span
          className={`text-xs font-oswald uppercase px-2 py-1 rounded border ${difficultyColor[op.difficulty]}`}
        >
          {t(`difficulty.${op.difficulty}`)}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-4">{op.desc}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> {op.players} {t("playersLabel")}
        </span>
        <span>
          {t("planetLabel")}: {op.planet}
        </span>
      </div>

      <div>
        <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-2 block">
          {t("bossesLabel")} ({op.bosses.length})
        </span>
        <div className="flex flex-wrap gap-1.5">
          {op.bosses.map((boss) => (
            <span
              key={boss}
              className="text-xs px-2 py-1 rounded bg-muted/40 text-muted-foreground"
            >
              {boss}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </Link>
);

const OperationListItem = ({
  op,
  i,
  inView,
  t,
}: {
  op: Operation;
  i: number;
  inView: boolean;
  t: (key: string, opts?: object) => string;
}) => (
  <Link to={`/operations/${op.slug}`}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 + i * 0.03 }}
      className="glass-card-gold p-4 group cursor-pointer transition-all duration-300 hover:border-primary/50 flex items-center gap-4"
    >
      <Skull className="w-5 h-5 text-primary flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-cinzel font-bold text-base text-foreground group-hover:text-primary transition-colors">
            {op.name}
          </h3>
          <span
            className={`text-[10px] font-oswald uppercase px-1.5 py-0.5 rounded border ${difficultyColor[op.difficulty]}`}
          >
            {t(`difficulty.${op.difficulty}`)}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {op.planet}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {op.players}
          </span>
          <span>
            {op.bosses.length} {t("bossesLabel").toLowerCase()}
          </span>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </motion.div>
  </Link>
);

const OperationsPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation("operations");
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const modeParam = searchParams.get("mode") || "story";
  const defaultTab = modeTabMap[modeParam] || "storyMode";

  const operations = t("pageOperations", { returnObjects: true }) as Operation[];

  const difficultyModes = t("difficultyModes", { returnObjects: true }) as Array<{
    mode: string;
    desc: string;
  }>;

  const modeConfig = useMemo(
    () => [
      {
        key: "storyMode",
        label: difficultyModes[0]?.mode || "Story Mode",
        desc: difficultyModes[0]?.desc || "",
        icon: <Users className="w-4 h-4" />,
        color: "data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400",
      },
      {
        key: "veteran",
        label: difficultyModes[1]?.mode || "Veteran",
        desc: difficultyModes[1]?.desc || "",
        icon: <Shield className="w-4 h-4" />,
        color: "data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400",
      },
      {
        key: "master",
        label: difficultyModes[2]?.mode || "Master",
        desc: difficultyModes[2]?.desc || "",
        icon: <Swords className="w-4 h-4" />,
        color: "data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400",
      },
    ],
    [difficultyModes]
  );

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

      {/* Tabbed Operations */}
      <section className="py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue={defaultTab} className="w-full">
              {/* Tabs + View Toggle Row */}
              <div className="flex items-center gap-4 mb-8">
                <TabsList className="flex-1 flex justify-center bg-muted/30 border border-border/30">
                  {modeConfig.map((mode) => (
                    <TabsTrigger
                      key={mode.key}
                      value={mode.key}
                      className={`font-oswald text-sm uppercase tracking-wider gap-2 flex-1 ${mode.color}`}
                    >
                      {mode.icon}
                      {mode.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* View Toggle */}
                <div className="flex items-center bg-muted/30 border border-border/30 rounded-md p-1">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "cards"
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {modeConfig.map((mode) => (
                <TabsContent key={mode.key} value={mode.key}>
                  {/* Mode Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="glass-card-gold p-4 mb-8 text-center"
                  >
                    <p className="text-muted-foreground text-sm">{mode.desc}</p>
                  </motion.div>

                  {/* Card View */}
                  {viewMode === "cards" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {operations.map((op, i) => (
                        <OperationCard
                          key={op.name}
                          op={op}
                          i={i}
                          inView={inView}
                          t={t}
                        />
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="flex flex-col gap-3">
                      {operations.map((op, i) => (
                        <OperationListItem
                          key={op.name}
                          op={op}
                          i={i}
                          inView={inView}
                          t={t}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OperationsPage;
