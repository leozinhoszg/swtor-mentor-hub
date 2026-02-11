import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen } from "lucide-react";
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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMPERIAL_SLUGS, REPUBLIC_SLUGS } from "@/data/classStoryMeta";

const IMPERIAL_ICONS = [sithWarriorIcon, sithInquisitorIcon, bountyHunterIcon, imperialAgentIcon];
const REPUBLIC_ICONS = [jediKnightIcon, jediConsularIcon, trooperIcon, smugglerIcon];

const StoriesPage = () => {
  const impRef = useRef(null);
  const repRef = useRef(null);
  const impInView = useInView(impRef, { once: true, margin: "-50px" });
  const repInView = useInView(repRef, { once: true, margin: "-50px" });
  const { t } = useTranslation("stories");

  const imperialClasses = t("imperialClasses", { returnObjects: true }) as Array<{
    name: string;
    advanced: string[];
    desc: string;
    storyHook: string;
  }>;

  const republicClasses = t("republicClasses", { returnObjects: true }) as Array<{
    name: string;
    advanced: string[];
    desc: string;
    storyHook: string;
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-3"
          >
            {t("pageDescription")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-yellow-500/70 text-sm max-w-2xl mx-auto italic"
          >
            {t("pageSubtext")}
          </motion.p>
        </div>
      </section>

      {/* Império */}
      <section className="py-16 md:py-24 relative overflow-hidden" ref={impRef}>
        {/* Red background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 via-red-950/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-transparent" />

        {/* Lightsaber divider top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={impInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{
            background: "linear-gradient(90deg, transparent, #ef4444, #ff6b6b, #ef4444, transparent)",
            boxShadow: "0 0 15px #ef4444, 0 0 30px #ef444480, 0 0 60px #ef444440",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={impInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <motion.img
              src={impLogo}
              alt="Império"
              animate={impInView ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 2, delay: 0.5 }}
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            />
            <h2 className="font-cinzel font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-300 to-red-500">
              {t("empireSith")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={impInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl mx-auto text-center"
          >
            {t("empireDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {imperialClasses.map((cls, i) => (
              <Link to={`/historias/${IMPERIAL_SLUGS[i]}`} key={cls.name} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={impInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative p-6 group cursor-pointer transition-all duration-300 h-full rounded-lg border border-red-800/30 bg-gradient-to-br from-red-950/40 via-black/60 to-black/80 backdrop-blur-sm hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.2),inset_0_0_30px_rgba(239,68,68,0.05)]"
                >
                  {/* Lightsaber glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/80 transition-all duration-500" style={{ boxShadow: "0 0 0px transparent" }} />
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 10px #ef4444, 0 0 20px #ef444480" }} />

                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={IMPERIAL_ICONS[i]}
                      alt={cls.name}
                      className="w-12 h-12 object-contain flex-shrink-0 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all duration-300"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <h3 className="font-cinzel font-bold text-xl text-red-400 group-hover:text-red-300 transition-colors">
                        {cls.name}
                      </h3>
                      <BookOpen className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{cls.desc}</p>
                  <p className="text-red-300/70 text-sm italic leading-relaxed">
                    {cls.storyHook}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lightsaber divider bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={impInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-right"
          style={{
            background: "linear-gradient(90deg, transparent, #ef4444, #ff6b6b, #ef4444, transparent)",
            boxShadow: "0 0 15px #ef4444, 0 0 30px #ef444480, 0 0 60px #ef444440",
          }}
        />
      </section>

      {/* República */}
      <section className="py-16 md:py-24 relative overflow-hidden" ref={repRef}>
        {/* Blue background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-950/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 via-transparent to-transparent" />

        {/* Lightsaber divider top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={repInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-right"
          style={{
            background: "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
            boxShadow: "0 0 15px #3b82f6, 0 0 30px #3b82f680, 0 0 60px #3b82f640",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={repInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <motion.img
              src={pubLogo}
              alt="República"
              animate={repInView ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ duration: 2, delay: 0.5 }}
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
            <h2 className="font-cinzel font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
              {t("galacticRepublic")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={repInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl mx-auto text-center"
          >
            {t("republicDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {republicClasses.map((cls, i) => (
              <Link to={`/historias/${REPUBLIC_SLUGS[i]}`} key={cls.name} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={repInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative p-6 group cursor-pointer transition-all duration-300 h-full rounded-lg border border-blue-800/30 bg-gradient-to-br from-blue-950/40 via-black/60 to-black/80 backdrop-blur-sm hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.2),inset_0_0_30px_rgba(59,130,246,0.05)]"
                >
                  {/* Lightsaber glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/80 transition-all duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 10px #3b82f6, 0 0 20px #3b82f680" }} />

                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={REPUBLIC_ICONS[i]}
                      alt={cls.name}
                      className="w-12 h-12 object-contain flex-shrink-0 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-300"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <h3 className="font-cinzel font-bold text-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                        {cls.name}
                      </h3>
                      <BookOpen className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{cls.desc}</p>
                  <p className="text-blue-300/70 text-sm italic leading-relaxed">
                    {cls.storyHook}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lightsaber divider bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={repInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            background: "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
            boxShadow: "0 0 15px #3b82f6, 0 0 30px #3b82f680, 0 0 60px #3b82f640",
          }}
        />
      </section>

      <Footer />
    </main>
  );
};

export default StoriesPage;
