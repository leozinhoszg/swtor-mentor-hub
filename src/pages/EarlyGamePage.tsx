import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { BookOpen, ArrowRight, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMPERIAL_SLUGS, REPUBLIC_SLUGS } from "@/data/classStoryMeta";

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

import dpsIcon from "@/assets/DPSIcon.png";
import healIcon from "@/assets/HealIcon.png";
import tankIcon from "@/assets/tankicon.png";

const IMPERIAL_ICONS = [sithWarriorIcon, sithInquisitorIcon, bountyHunterIcon, imperialAgentIcon];
const REPUBLIC_ICONS = [jediKnightIcon, jediConsularIcon, trooperIcon, smugglerIcon];

const ROLE_ICONS: Record<string, string> = {
  Tank: tankIcon,
  DPS: dpsIcon,
  Healer: healIcon,
};

function parseRoles(roleString: string): string[] {
  return roleString.split(/\s*\/\s*/).map((r) => r.trim());
}

function getUniqueRoles(advanced: Array<{ name: string; role: string }>): string[] {
  const roles = new Set<string>();
  for (const adv of advanced) {
    for (const r of parseRoles(adv.role)) {
      roles.add(r);
    }
  }
  return Array.from(roles);
}

interface AdvancedClass {
  name: string;
  role: string;
}

interface ClassData {
  name: string;
  desc: string;
  playstyleTip: string;
  advanced: AdvancedClass[];
}

type Faction = "republic" | "empire";

/* ─── Faction Selection Screen ─── */
const FactionSelector = ({
  onSelect,
}: {
  onSelect: (faction: Faction) => void;
}) => {
  const { t } = useTranslation("earlyGame");
  const [hovered, setHovered] = useState<Faction | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-40 flex bg-black"
    >
      {/* Republic Side */}
      <motion.div
        animate={{ opacity: hovered === "empire" ? 0.35 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-1/2 h-full"
      >
        <button
          onClick={() => onSelect("republic")}
          onMouseEnter={() => setHovered("republic")}
          onMouseLeave={() => setHovered(null)}
          className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Black base */}
          <div className="absolute inset-0 bg-black" />

          {/* Blue smoke/nebula clouds */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 35% 40%, rgba(30,64,175,0.55) 0%, transparent 70%),
                radial-gradient(ellipse 60% 50% at 60% 65%, rgba(37,99,235,0.35) 0%, transparent 65%),
                radial-gradient(ellipse 50% 40% at 25% 70%, rgba(59,130,246,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 70% 30%, rgba(29,78,216,0.25) 0%, transparent 55%)
              `,
            }}
          />
          {/* Subtle blue fog layer */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 90% 70% at 40% 50%, rgba(59,130,246,0.2) 0%, transparent 60%),
                radial-gradient(ellipse 50% 60% at 20% 30%, rgba(96,165,250,0.15) 0%, transparent 50%)
              `,
            }}
          />
          {/* Drifting smoke wisps */}
          <motion.div
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -10, 5, 0],
              opacity: [0.2, 0.4, 0.25, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 40% 35% at 55% 45%, rgba(59,130,246,0.35) 0%, transparent 70%),
                radial-gradient(ellipse 35% 30% at 30% 55%, rgba(37,99,235,0.25) 0%, transparent 65%)
              `,
            }}
          />

          {/* Blue flame from center — horizontal flare going left */}
          <motion.div
            animate={{
              opacity: [0.5, 0.75, 0.5],
              scaleX: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 60% 12% at 100% 50%, rgba(59,130,246,0.9) 0%, rgba(37,99,235,0.5) 30%, transparent 70%),
                radial-gradient(ellipse 45% 8% at 100% 50%, rgba(147,197,253,0.6) 0%, transparent 50%),
                radial-gradient(ellipse 80% 20% at 100% 50%, rgba(30,64,175,0.4) 0%, transparent 65%)
              `,
            }}
          />
          {/* Flame wisps — blue */}
          <motion.div
            animate={{
              x: [0, -8, 4, 0],
              opacity: [0.3, 0.55, 0.35, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 35% 6% at 95% 46%, rgba(96,165,250,0.7) 0%, transparent 70%),
                radial-gradient(ellipse 30% 5% at 90% 54%, rgba(59,130,246,0.5) 0%, transparent 65%)
              `,
            }}
          />

          {/* Edge darkening vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Hover glow */}
          <motion.div
            animate={{ opacity: hovered === "republic" ? 0.7 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.5) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            <motion.img
              src={pubLogo}
              alt="Republic"
              animate={{
                scale: hovered === "republic" ? 1.08 : 1,
                filter: hovered === "republic"
                  ? "drop-shadow(0 0 40px rgba(59,130,246,0.9)) drop-shadow(0 0 80px rgba(59,130,246,0.4))"
                  : "drop-shadow(0 0 20px rgba(59,130,246,0.6)) drop-shadow(0 0 50px rgba(59,130,246,0.2))",
              }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
            />
            <h2 className="font-oswald uppercase tracking-[0.25em] text-sm md:text-base lg:text-lg text-blue-400/80 text-center leading-relaxed">
              {t("theGalacticRepublic")}
            </h2>
          </div>
        </button>
      </motion.div>

      {/* Center Divider + Title */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {/* Vertical lightsaber line */}
        <div
          className="absolute top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.4) 15%, #ffffff 35%, #ffffff 65%, rgba(255,255,255,0.4) 85%, transparent 95%)",
            boxShadow: "0 0 8px rgba(200,230,255,0.8), 0 0 20px rgba(150,200,255,0.5), 0 0 40px rgba(100,160,255,0.3), 0 0 80px rgba(60,130,246,0.15)",
          }}
        />
        {/* Wider glow behind the line */}
        <div
          className="absolute top-0 bottom-0 w-[6px]"
          style={{
            background: "linear-gradient(180deg, transparent 10%, rgba(200,230,255,0.15) 25%, rgba(200,230,255,0.25) 50%, rgba(200,230,255,0.15) 75%, transparent 90%)",
          }}
        />
        {/* Title bar */}
        <div
          className="relative px-8 md:px-12 py-2.5 md:py-3"
          style={{
            background: "linear-gradient(90deg, rgba(30,64,175,0.4) 0%, rgba(20,20,20,0.95) 25%, rgba(20,20,20,0.95) 75%, rgba(153,27,27,0.4) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1 className="font-oswald uppercase tracking-[0.3em] text-xs md:text-sm lg:text-base text-white/90 whitespace-nowrap font-medium">
            {t("chooseAllegiance")}
          </h1>
        </div>
      </div>

      {/* Empire Side */}
      <motion.div
        animate={{ opacity: hovered === "republic" ? 0.35 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-1/2 h-full"
      >
        <button
          onClick={() => onSelect("empire")}
          onMouseEnter={() => setHovered("empire")}
          onMouseLeave={() => setHovered(null)}
          className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Black base */}
          <div className="absolute inset-0 bg-black" />

          {/* Red smoke/nebula clouds */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 65% 40%, rgba(153,27,27,0.55) 0%, transparent 70%),
                radial-gradient(ellipse 60% 50% at 40% 60%, rgba(220,38,38,0.35) 0%, transparent 65%),
                radial-gradient(ellipse 50% 40% at 75% 65%, rgba(239,68,68,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 30% 35%, rgba(185,28,28,0.25) 0%, transparent 55%)
              `,
            }}
          />
          {/* Subtle red fog layer */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 90% 70% at 60% 50%, rgba(239,68,68,0.2) 0%, transparent 60%),
                radial-gradient(ellipse 50% 60% at 80% 70%, rgba(248,113,113,0.15) 0%, transparent 50%)
              `,
            }}
          />
          {/* Drifting smoke wisps */}
          <motion.div
            animate={{
              x: [0, -12, 8, 0],
              y: [0, 8, -12, 0],
              opacity: [0.2, 0.4, 0.25, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 40% 35% at 45% 50%, rgba(239,68,68,0.35) 0%, transparent 70%),
                radial-gradient(ellipse 35% 30% at 70% 40%, rgba(220,38,38,0.25) 0%, transparent 65%)
              `,
            }}
          />

          {/* Red flame from center — horizontal flare going right */}
          <motion.div
            animate={{
              opacity: [0.5, 0.75, 0.5],
              scaleX: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 60% 12% at 0% 50%, rgba(239,68,68,0.9) 0%, rgba(220,38,38,0.5) 30%, transparent 70%),
                radial-gradient(ellipse 45% 8% at 0% 50%, rgba(252,165,165,0.6) 0%, transparent 50%),
                radial-gradient(ellipse 80% 20% at 0% 50%, rgba(153,27,27,0.4) 0%, transparent 65%)
              `,
            }}
          />
          {/* Flame wisps — red */}
          <motion.div
            animate={{
              x: [0, 8, -4, 0],
              opacity: [0.3, 0.55, 0.35, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 35% 6% at 5% 46%, rgba(248,113,113,0.7) 0%, transparent 70%),
                radial-gradient(ellipse 30% 5% at 10% 54%, rgba(239,68,68,0.5) 0%, transparent 65%)
              `,
            }}
          />

          {/* Edge darkening vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Hover glow */}
          <motion.div
            animate={{ opacity: hovered === "empire" ? 0.7 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,68,68,0.5) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            <motion.img
              src={impLogo}
              alt="Empire"
              animate={{
                scale: hovered === "empire" ? 1.08 : 1,
                filter: hovered === "empire"
                  ? "drop-shadow(0 0 40px rgba(239,68,68,0.9)) drop-shadow(0 0 80px rgba(239,68,68,0.4))"
                  : "drop-shadow(0 0 20px rgba(239,68,68,0.6)) drop-shadow(0 0 50px rgba(239,68,68,0.2))",
              }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
            />
            <h2 className="font-oswald uppercase tracking-[0.25em] text-sm md:text-base lg:text-lg text-red-400/80 text-center leading-relaxed">
              {t("theSithEmpire")}
            </h2>
          </div>
        </button>
      </motion.div>
    </motion.section>
  );
};

/* ─── Class Card ─── */
const ClassCard = ({
  cls,
  index,
  inView,
  faction,
  slug,
}: {
  cls: ClassData;
  index: number;
  inView: boolean;
  faction: Faction;
  slug: string;
}) => {
  const { t } = useTranslation("earlyGame");
  const icon = faction === "empire" ? IMPERIAL_ICONS[index] : REPUBLIC_ICONS[index];
  const uniqueRoles = getUniqueRoles(cls.advanced);
  const isEmpire = faction === "empire";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className={`relative p-6 group transition-all duration-300 h-full rounded-lg border backdrop-blur-sm ${
        isEmpire
          ? "border-red-800/30 bg-gradient-to-br from-red-950/40 via-black/60 to-black/80 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.2),inset_0_0_30px_rgba(239,68,68,0.05)]"
          : "border-blue-800/30 bg-gradient-to-br from-blue-950/40 via-black/60 to-black/80 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.2),inset_0_0_30px_rgba(59,130,246,0.05)]"
      }`}
    >
      {/* Lightsaber glow line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: isEmpire ? "0 0 10px #ef4444, 0 0 20px #ef444480" : "0 0 10px #3b82f6, 0 0 20px #3b82f680" }}
      />

      {/* Header: Icon + Name + Role badges */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={icon}
          alt={cls.name}
          className={`w-14 h-14 object-contain flex-shrink-0 ${
            isEmpire
              ? "drop-shadow-[0_0_6px_rgba(239,68,68,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              : "drop-shadow-[0_0_6px_rgba(59,130,246,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          } transition-all duration-300`}
        />
        <div className="flex-1">
          <h3 className={`font-cinzel font-bold text-xl mb-2 ${isEmpire ? "text-red-400 group-hover:text-red-300" : "text-blue-400 group-hover:text-blue-300"} transition-colors`}>
            {cls.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {uniqueRoles.map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 text-xs font-oswald uppercase tracking-wider px-2.5 py-1 rounded bg-black/40 text-muted-foreground border border-white/10"
              >
                {ROLE_ICONS[role] && (
                  <img src={ROLE_ICONS[role]} alt={role} className="w-4 h-4 object-contain" />
                )}
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4">{cls.desc}</p>

      <div className={`rounded-lg p-3 mb-4 ${isEmpire ? "bg-red-950/20 border border-red-900/20" : "bg-blue-950/20 border border-blue-900/20"}`}>
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          {cls.playstyleTip}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {cls.advanced.map((adv) => (
          <span
            key={adv.name}
            className={`text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded ${
              isEmpire
                ? "bg-red-900/30 text-red-400 border border-red-800/40"
                : "bg-blue-900/30 text-blue-400 border border-blue-800/40"
            }`}
          >
            {adv.name} — {adv.role}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to={`/historias/${slug}`}
          className={`flex items-center gap-1.5 text-xs font-oswald uppercase tracking-wider px-4 py-2 rounded hover:brightness-125 transition-all ${
            isEmpire
              ? "bg-red-900/30 text-red-400 border border-red-800/40"
              : "bg-blue-900/30 text-blue-400 border border-blue-800/40"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          {t("storyLink")}
        </Link>
        <Link
          to="/guias"
          className="flex items-center gap-1.5 text-xs font-oswald uppercase tracking-wider px-4 py-2 rounded bg-primary/10 text-primary border border-primary/20 hover:brightness-125 transition-all"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          {t("guideLink")}
        </Link>
      </div>
    </motion.div>
  );
};

/* ─── Faction Content ─── */
const FactionContent = ({
  faction,
  classes,
  slugs,
  onSwitch,
}: {
  faction: Faction;
  classes: ClassData[];
  slugs: readonly string[];
  onSwitch: () => void;
}) => {
  const { t } = useTranslation("earlyGame");
  const sectionRef = useRef(null);
  const mirrorRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const mirrorInView = useInView(mirrorRef, { once: true, margin: "-50px" });

  const isEmpire = faction === "empire";
  const factionLogo = isEmpire ? impLogo : pubLogo;
  const factionTitle = isEmpire ? t("empireSith") : t("galacticRepublic");
  const factionDesc = isEmpire ? t("empireDesc") : t("republicDesc");

  const mirrorClasses = t("mirrorClasses", { returnObjects: true }) as {
    title: string;
    desc: string;
    pairs: Array<{ republic: string; empire: string }>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Hero Banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className={`absolute inset-0 ${
          isEmpire
            ? "bg-gradient-to-b from-red-950/30 via-transparent to-transparent"
            : "bg-gradient-to-b from-blue-950/30 via-transparent to-transparent"
        }`} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.img
            src={factionLogo}
            alt={factionTitle}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 ${
              isEmpire
                ? "drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                : "drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            }`}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`font-cinzel font-bold text-4xl md:text-5xl mb-4 bg-clip-text text-transparent ${
              isEmpire
                ? "bg-gradient-to-r from-red-400 via-red-300 to-red-500"
                : "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500"
            }`}
          >
            {factionTitle}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-xs mb-6 h-[2px] origin-center"
            style={{
              background: isEmpire
                ? "linear-gradient(90deg, transparent, #ef4444, #ff6b6b, #ef4444, transparent)"
                : "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
              boxShadow: isEmpire
                ? "0 0 10px #ef4444, 0 0 20px #ef444480"
                : "0 0 10px #3b82f6, 0 0 20px #3b82f680",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6"
          >
            {factionDesc}
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={onSwitch}
            className={`inline-flex items-center gap-2 text-xs font-oswald uppercase tracking-wider px-5 py-2.5 rounded-lg border transition-all hover:brightness-125 ${
              isEmpire
                ? "bg-red-900/20 text-red-400 border-red-800/40 hover:border-red-500/60"
                : "bg-blue-900/20 text-blue-400 border-blue-800/40 hover:border-blue-500/60"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t("switchFaction")}
          </motion.button>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
        {/* Faction background gradient */}
        {isEmpire ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 via-red-950/20 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-950/20 to-background" />
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 via-transparent to-transparent" />
          </>
        )}

        {/* Lightsaber divider top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={sectionInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute top-0 left-0 right-0 h-[2px] ${isEmpire ? "origin-left" : "origin-right"}`}
          style={{
            background: isEmpire
              ? "linear-gradient(90deg, transparent, #ef4444, #ff6b6b, #ef4444, transparent)"
              : "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
            boxShadow: isEmpire
              ? "0 0 15px #ef4444, 0 0 30px #ef444480, 0 0 60px #ef444440"
              : "0 0 15px #3b82f6, 0 0 30px #3b82f680, 0 0 60px #3b82f640",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl mx-auto text-center"
          >
            {t("introText")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {classes.map((cls, i) => (
              <ClassCard
                key={cls.name}
                cls={cls}
                index={i}
                inView={sectionInView}
                faction={faction}
                slug={slugs[i]}
              />
            ))}
          </div>
        </div>

        {/* Lightsaber divider bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={sectionInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className={`absolute bottom-0 left-0 right-0 h-[2px] ${isEmpire ? "origin-right" : "origin-left"}`}
          style={{
            background: isEmpire
              ? "linear-gradient(90deg, transparent, #ef4444, #ff6b6b, #ef4444, transparent)"
              : "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
            boxShadow: isEmpire
              ? "0 0 15px #ef4444, 0 0 30px #ef444480, 0 0 60px #ef444440"
              : "0 0 15px #3b82f6, 0 0 30px #3b82f680, 0 0 60px #3b82f640",
          }}
        />
      </section>

      {/* Mirror Classes Section */}
      <section className="py-16 md:py-20" ref={mirrorRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mirrorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-card-gold p-8 max-w-4xl mx-auto text-center"
          >
            <RefreshCw className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-cinzel font-bold text-2xl text-gradient-gold mb-3">
              {mirrorClasses.title}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {mirrorClasses.desc}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {mirrorClasses.pairs.map((pair) => (
                <div
                  key={pair.republic}
                  className="flex items-center justify-center gap-2 text-sm rounded-lg py-2 px-3 bg-black/20 border border-white/10"
                >
                  <span className="text-blue-400 font-oswald">{pair.republic}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-red-400 font-oswald">{pair.empire}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

/* ─── Main Page ─── */
const EarlyGamePage = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const { t } = useTranslation("earlyGame");

  const republicClasses = t("republicClasses", { returnObjects: true }) as ClassData[];
  const imperialClasses = t("imperialClasses", { returnObjects: true }) as ClassData[];

  const handleSelect = (faction: Faction) => {
    setSelectedFaction(faction);
  };

  const handleSwitch = () => {
    setSelectedFaction(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <AnimatePresence mode="wait">
        {!selectedFaction ? (
          <FactionSelector key="selector" onSelect={handleSelect} />
        ) : (
          <motion.div
            key={selectedFaction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FactionContent
              faction={selectedFaction}
              classes={selectedFaction === "empire" ? imperialClasses : republicClasses}
              slugs={selectedFaction === "empire" ? IMPERIAL_SLUGS : REPUBLIC_SLUGS}
              onSwitch={handleSwitch}
            />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default EarlyGamePage;
