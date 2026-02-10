import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Logo */}
          <div>
            <Link to="/">
              <span className="font-cinzel font-bold text-lg text-gradient-gold">
                THE MENTOR
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4 md:justify-end">
            {[
              { label: "Discord", href: "#" },
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground border border-border rounded hover:border-primary hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="divider-gold mt-8 mb-6" />

        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
