import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Skull,
  Users,
  MapPin,
  ArrowLeft,
  Shield,
  Swords,
  Crown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  OPERATION_META,
  type OperationSlug,
  type OperationDetailData,
} from "@/data/operationMeta";

const difficultyColor: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10 border-green-800/30",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-800/30",
  hard: "text-orange-400 bg-orange-500/10 border-orange-800/30",
  veryHard: "text-red-400 bg-red-500/10 border-red-800/30",
};

const OperationDetailPage = () => {
  const { operationSlug } = useParams<{ operationSlug: string }>();
  const { t } = useTranslation("operations");

  const meta = OPERATION_META[operationSlug as OperationSlug];
  if (!meta) return <Navigate to="/operations" replace />;

  const { dataKey } = meta;

  const opData = t(`operationDetails.${dataKey}`, {
    returnObjects: true,
  }) as OperationDetailData;

  const tierLabel = t(`tiers.${opData.expansion}`);

  const overviewRef = useRef(null);
  const bossesRef = useRef(null);
  const overviewInView = useInView(overviewRef, { once: true, margin: "-50px" });
  const bossesInView = useInView(bossesRef, { once: true, margin: "-50px" });

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
            <Skull className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cinzel font-bold text-4xl md:text-5xl text-gradient-gold mb-4"
          >
            {opData.name}
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
            {opData.desc}
          </motion.p>
        </div>
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/operations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-oswald uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToOperations")}
        </Link>
      </div>

      {/* Overview Section */}
      <section className="pb-16 md:pb-24" ref={overviewRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={overviewInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Skull className="w-7 h-7 text-primary" />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
                {t("overviewTitle")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={overviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card-gold p-6"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-1 block">
                    {t("difficulty.label", { defaultValue: t(`difficulty.${opData.difficulty}`) })}
                  </span>
                  <span
                    className={`inline-block text-xs font-oswald uppercase px-3 py-1.5 rounded border ${difficultyColor[opData.difficulty]}`}
                  >
                    {t(`difficulty.${opData.difficulty}`)}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-1 block">
                    {t("playersLabel")}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Users className="w-4 h-4" /> {opData.players}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-1 block">
                    {t("planetLabel")}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" /> {opData.planet}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-1 block">
                    {t("expansionLabel")}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {tierLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Boss Guide Section */}
      <section className="py-16 md:py-24 bg-muted/5" ref={bossesRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={bossesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Crown className="w-7 h-7 text-primary" />
              <h2 className="font-cinzel font-bold text-2xl text-gradient-gold">
                {t("bossGuideTitle")} ({opData.bosses.length})
              </h2>
            </motion.div>

            <div className="space-y-6">
              {opData.bosses.map((boss, i) => (
                <motion.div
                  key={boss.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={bossesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass-card-gold p-6"
                >
                  {/* Boss Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-sm font-bold font-oswald">
                      {i + 1}
                    </span>
                    <h3 className="font-cinzel font-bold text-lg text-foreground">
                      {boss.name}
                    </h3>
                  </div>

                  {/* Boss Description */}
                  <p className="text-muted-foreground text-sm mb-5 pl-11">
                    {boss.desc}
                  </p>

                  {/* Difficulty Tabs */}
                  <div className="pl-11">
                    <Tabs defaultValue="storyMode" className="w-full">
                      <TabsList className="bg-muted/30 border border-border/30">
                        <TabsTrigger
                          value="storyMode"
                          className="font-oswald text-xs uppercase tracking-wider gap-1.5 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                        >
                          <Users className="w-3.5 h-3.5" />
                          Story Mode
                        </TabsTrigger>
                        <TabsTrigger
                          value="veteran"
                          className="font-oswald text-xs uppercase tracking-wider gap-1.5 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Veteran
                        </TabsTrigger>
                        <TabsTrigger
                          value="master"
                          className="font-oswald text-xs uppercase tracking-wider gap-1.5 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
                        >
                          <Swords className="w-3.5 h-3.5" />
                          Master
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="storyMode" className="mt-4">
                        <div className="p-4 rounded-lg bg-green-500/5 border border-green-800/20">
                          <p className="text-muted-foreground text-sm">
                            {boss.storyMode}
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="veteran" className="mt-4">
                        <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-800/20">
                          <p className="text-muted-foreground text-sm">
                            {boss.veteran}
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="master" className="mt-4">
                        <div className="p-4 rounded-lg bg-red-500/5 border border-red-800/20">
                          <p className="text-muted-foreground text-sm">
                            {boss.master}
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OperationDetailPage;
