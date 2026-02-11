import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImg from "@/assets/the_mentor_logo.png";
import discordIcon from "@/assets/discord.png";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Gold lightsaber top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(48 85% 53% / 0.6), hsl(50 92% 65%), hsl(48 85% 53% / 0.6), transparent)",
          boxShadow: "0 0 8px hsl(48 92% 55% / 0.4), 0 0 20px hsl(48 92% 55% / 0.2)",
        }}
      />

      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Logo */}
          <div>
            <Link to="/" className="inline-block group">
              <img
                src={logoImg}
                alt="The Mentor"
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(48_92%_55%_/_0.6)]"
              />
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4 md:justify-end items-center">
            <a
              href="https://discord.gg/dPG93NGE7C"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground border border-primary/20 rounded hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_12px_hsl(48_92%_55%_/_0.15)]"
            >
              <img src={discordIcon} alt="" className="h-4 w-4 object-contain" />
              Discord
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground border border-primary/20 rounded hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_12px_hsl(48_92%_55%_/_0.15)]"
            >
              Facebook
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground border border-primary/20 rounded hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_12px_hsl(48_92%_55%_/_0.15)]"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Gold lightsaber divider */}
        <div className="mt-8 mb-6 relative">
          <div
            className="h-[1px] w-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(48 85% 53% / 0.4), hsl(50 92% 65% / 0.6), hsl(48 85% 53% / 0.4), transparent)",
              boxShadow: "0 0 6px hsl(48 92% 55% / 0.3), 0 0 12px hsl(48 92% 55% / 0.1)",
            }}
          />
        </div>

        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
