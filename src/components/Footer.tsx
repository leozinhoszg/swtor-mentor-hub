import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div>
            <span className="font-cinzel font-bold text-lg text-gradient-gold">
              THE MENTOR
            </span>
            <p className="text-muted-foreground text-sm mt-2">
              O melhor lugar para guias de SWTOR.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {["Home", "Conteúdo", "Histórias", "Operations", "Eventos", "Guias"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors font-oswald uppercase tracking-wider text-xs"
                >
                  {link}
                </a>
              )
            )}
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
                className="px-3 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground border border-border rounded hover:border-primary hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="divider-gold mt-8 mb-6" />

        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>© 2025 The SWTOR Mentor. Todos os direitos reservados.</p>
          <p>Este site não é afiliado à BioWare ou Electronic Arts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
