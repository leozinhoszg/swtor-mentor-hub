import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg.jpg";
import logoSvg from "@/assets/svgviewer-output.svg";

const HeroSection = () => {
  const { t } = useTranslation("home");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt={t("hero.bgAlt")}
          className="w-full h-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto mb-8 relative"
        >
          {/* Glow pulse behind logo */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 blur-2xl bg-primary/20 rounded-full"
          />
          <motion.img
            src={logoSvg}
            alt="The Mentor"
            animate={{
              y: [0, -10, 0],
              filter: [
                "drop-shadow(0 0 20px hsl(48 92% 55% / 0.3))",
                "drop-shadow(0 0 40px hsl(48 92% 55% / 0.6))",
                "drop-shadow(0 0 20px hsl(48 92% 55% / 0.3))",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative w-[80vw] max-w-[600px] md:max-w-[700px] object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="font-oswald text-lg md:text-2xl tracking-[0.3em] uppercase text-primary text-glow-gold"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/guias"
            className="inline-block px-8 py-3 font-oswald uppercase tracking-wider text-sm bg-gradient-gold text-primary-foreground rounded glow-gold hover:glow-gold-lg transition-shadow duration-300"
          >
            {t("hero.cta")}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
