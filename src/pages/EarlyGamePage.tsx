import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Swords, ChevronDown, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AdvancedClass {
  name: string;
  role: string;
  desc: string;
}

interface ClassData {
  name: string;
  desc: string;
  advanced: AdvancedClass[];
}

const ClassCard = ({
  cls,
  index,
  inView,
  faction,
}: {
  cls: ClassData;
  index: number;
  inView: boolean;
  faction: "empire" | "republic";
}) => {
  const factionColors = {
    empire: {
      roleBg: "bg-red-900/20",
      roleText: "text-red-400",
      roleBorder: "border-red-800/30",
      advBg: "bg-red-950/20",
      advBorder: "border-red-900/20",
    },
    republic: {
      roleBg: "bg-blue-900/20",
      roleText: "text-blue-400",
      roleBorder: "border-blue-800/30",
      advBg: "bg-blue-950/20",
      advBorder: "border-blue-900/20",
    },
  };

  const colors = factionColors[faction];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="glass-card-gold p-6 transition-all duration-300"
    >
      <h3 className="font-cinzel font-bold text-xl text-primary mb-2">
        {cls.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-5">{cls.desc}</p>

      <div className="space-y-3">
        {cls.advanced.map((adv) => (
          <div
            key={adv.name}
            className={`rounded-lg p-4 ${colors.advBg} border ${colors.advBorder}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-cinzel font-bold text-base text-foreground">
                {adv.name}
              </h4>
              <span
                className={`text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded ${colors.roleBg} ${colors.roleText} border ${colors.roleBorder}`}
              >
                {adv.role}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {adv.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EarlyGamePage = () => {
  const repRef = useRef(null);
  const impRef = useRef(null);
  const noteRef = useRef(null);
  const repInView = useInView(repRef, { once: true, margin: "-50px" });
  const impInView = useInView(impRef, { once: true, margin: "-50px" });
  const noteInView = useInView(noteRef, { once: true, margin: "-50px" });
  const { t } = useTranslation("earlyGame");

  const republicClasses = t("republicClasses", {
    returnObjects: true,
  }) as ClassData[];

  const imperialClasses = t("imperialClasses", {
    returnObjects: true,
  }) as ClassData[];

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
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Rocket className="w-8 h-8 text-primary" />
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4"
          >
            {t("pageDescription")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-base max-w-3xl mx-auto"
          >
            {t("introText")}
          </motion.p>
        </div>
      </section>

      {/* Republica Galactica */}
      <section className="py-16 md:py-24 bg-muted/5" ref={repRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={repInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <Shield className="w-8 h-8 text-blue-500" />
            <h2 className="font-cinzel font-bold text-3xl text-gradient-gold">
              {t("galacticRepublic")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={repInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl"
          >
            {t("republicDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
            {republicClasses.map((cls, i) => (
              <ClassCard
                key={cls.name}
                cls={cls}
                index={i}
                inView={repInView}
                faction="republic"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Imperio Sith */}
      <section className="py-16 md:py-24" ref={impRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={impInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <Swords className="w-8 h-8 text-red-500" />
            <h2 className="font-cinzel font-bold text-3xl text-gradient-gold">
              {t("empireSith")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={impInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-3xl"
          >
            {t("empireDesc")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
            {imperialClasses.map((cls, i) => (
              <ClassCard
                key={cls.name}
                cls={cls}
                index={i}
                inView={impInView}
                faction="empire"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines Note */}
      <section className="py-16 md:py-20 bg-muted/5" ref={noteRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={noteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-card-gold p-8 max-w-4xl mx-auto text-center"
          >
            <ChevronDown className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {t("disciplinesNote")}
            </p>
            <Link
              to="/guias"
              className="inline-block font-oswald uppercase tracking-wider text-sm px-6 py-3 bg-gradient-gold text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              {t("advancedGuideLink")}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EarlyGamePage;
