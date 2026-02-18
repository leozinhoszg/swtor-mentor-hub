import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logoImg from "@/assets/the_mentor_logo.png";
import impLogo from "@/assets/empire.svg";
import pubLogo from "@/assets/republic.svg";

interface DropdownItem {
  label: string;
  href: string;
  type?: "link" | "header";
  children?: DropdownItem[];
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { t } = useTranslation("common");

  const factionMeta: Record<string, { icon: string; color: string; hoverBg: string; hoverText: string; submenuBorder: string }> = {
    [t("nav.storiesDropdown.empire")]: {
      icon: impLogo,
      color: "text-red-400",
      hoverBg: "hover:bg-red-900/20",
      hoverText: "hover:text-red-400",
      submenuBorder: "border-red-800/40",
    },
    [t("nav.storiesDropdown.republic")]: {
      icon: pubLogo,
      color: "text-blue-400",
      hoverBg: "hover:bg-blue-900/20",
      hoverText: "hover:text-blue-400",
      submenuBorder: "border-blue-800/40",
    },
  };

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.content"),
      href: "/conteudo",
      dropdown: [
        {
          label: t("nav.contentDropdown.earlyGame"),
          href: "/conteudo",
          children: [
            { label: t("nav.contentDropdown.classes"), href: "/conteudo/early-game/classes" },
            { label: t("nav.contentDropdown.introduction"), href: "/conteudo/early-game/introducao" },
          ],
        },
        {
          label: t("nav.contentDropdown.midGame"),
          href: "/conteudo/mid-game",
          children: [
            { label: t("nav.contentDropdown.hud"), href: "/conteudo/mid-game/hud" },
            { label: t("nav.contentDropdown.storyArc"), href: "/conteudo/mid-game/story-arc" },
            { label: t("nav.contentDropdown.classStoryGuide"), href: "/conteudo/mid-game/class-story" },
            { label: t("nav.contentDropdown.leveling"), href: "/conteudo/mid-game/leveling" },
          ],
        },
        { label: t("nav.contentDropdown.endgame"), href: "/conteudo/endgame" },
      ],
    },
    {
      label: t("nav.stories"),
      href: "/historias",
      dropdown: [
        {
          label: t("nav.storiesDropdown.empire"),
          href: "/historias",
          children: [
            { label: t("nav.storiesDropdown.sithWarrior"), href: "/historias/sith-warrior" },
            { label: t("nav.storiesDropdown.sithInquisitor"), href: "/historias/sith-inquisitor" },
            { label: t("nav.storiesDropdown.bountyHunter"), href: "/historias/bounty-hunter" },
            { label: t("nav.storiesDropdown.imperialAgent"), href: "/historias/imperial-agent" },
          ],
        },
        {
          label: t("nav.storiesDropdown.republic"),
          href: "/historias",
          children: [
            { label: t("nav.storiesDropdown.jediKnight"), href: "/historias/jedi-knight" },
            { label: t("nav.storiesDropdown.jediConsular"), href: "/historias/jedi-consular" },
            { label: t("nav.storiesDropdown.trooper"), href: "/historias/trooper" },
            { label: t("nav.storiesDropdown.smuggler"), href: "/historias/smuggler" },
          ],
        },
      ],
    },
    {
      label: t("nav.operations"),
      href: "/operations",
      dropdown: [
        { label: t("nav.operationsDropdown.storyMode"), href: "/operations?mode=story" },
        { label: t("nav.operationsDropdown.veteran"), href: "/operations?mode=veteran" },
        { label: t("nav.operationsDropdown.master"), href: "/operations?mode=master" },
      ],
    },
    {
      label: t("nav.others"),
      href: "/guias",
      dropdown: [
        { label: t("nav.othersDropdown.guides"), href: "/guias" },
        { label: t("nav.othersDropdown.updates"), href: "/atualizacoes" },
      ],
    },
    {
      label: t("nav.events"),
      href: "/eventos",
    },
  ];

  const toggleMobileExpanded = (label: string) => {
    setMobileExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpandedItems([]);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Gold lightsaber bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(48 85% 53% / 0.6), hsl(50 92% 65%), hsl(48 85% 53% / 0.6), transparent)",
          boxShadow: "0 0 8px hsl(48 92% 55% / 0.4), 0 0 20px hsl(48 92% 55% / 0.2)",
        }}
      />
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logoImg}
            alt="The Mentor"
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(48_92%_55%_/_0.6)]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => { setActiveDropdown(item.href); setActiveSubmenu(null); }}
              onMouseLeave={() => { setActiveDropdown(null); setActiveSubmenu(null); }}
            >
              <Link
                to={item.href}
                className={`relative px-4 py-2 font-oswald text-sm uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1 group/nav ${
                  (item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href))
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} />}
                {/* Lightsaber underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-300 group-hover/nav:w-4/5 ${
                    (item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href))
                      ? "w-4/5"
                      : "w-0"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(48 85% 53%), transparent)",
                    boxShadow: "0 0 6px hsl(48 92% 55% / 0.5), 0 0 12px hsl(48 92% 55% / 0.2)",
                  }}
                />
              </Link>
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 min-w-[220px] bg-card/95 backdrop-blur-xl border border-primary/20 rounded-lg p-2 z-50"
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 15px hsl(48 92% 55% / 0.1)" }}
                  >
                    {item.dropdown.map((sub, subIdx) => (
                      sub.type === "header" ? (
                        <div
                          key={sub.label}
                          className={`px-4 py-1.5 text-xs font-oswald uppercase tracking-wider text-primary/60 ${subIdx > 0 ? "border-t border-border/30 mt-1" : ""}`}
                        >
                          {sub.label}
                        </div>
                      ) : sub.children ? (
                        <div
                          key={sub.label}
                          className="relative"
                          onMouseEnter={() => setActiveSubmenu(sub.label)}
                          onMouseLeave={() => setActiveSubmenu(null)}
                        >
                          {(() => {
                            const meta = factionMeta[sub.label];
                            return (
                              <>
                                <button
                                  className={`w-full flex items-center justify-between px-4 py-2 text-sm text-muted-foreground rounded transition-colors ${meta ? `${meta.hoverBg} ${meta.hoverText}` : "hover:text-primary hover:bg-muted"}`}
                                >
                                  <span className="flex items-center gap-2">
                                    {meta && <img src={meta.icon} alt="" className="w-4 h-4 object-contain" />}
                                    {sub.label}
                                  </span>
                                  <ChevronRight size={14} />
                                </button>
                                <AnimatePresence>
                                  {activeSubmenu === sub.label && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -8 }}
                                      transition={{ duration: 0.15 }}
                                      className={`absolute left-full top-0 ml-1 min-w-[200px] bg-card border rounded-lg p-2 shadow-xl z-50 ${meta ? meta.submenuBorder : "border-border"}`}
                                    >
                                      {sub.children.map((child) => (
                                        <Link
                                          key={child.label}
                                          to={child.href}
                                          className={`block px-4 py-2 text-sm text-muted-foreground rounded transition-colors ${meta ? `${meta.hoverBg} ${meta.hoverText}` : "hover:text-primary hover:bg-muted"}`}
                                        >
                                          {child.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                          {sub.label}
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Search + Language + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_hsl(48_92%_55%_/_0.5)]">
            <Search size={20} />
          </button>
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className={`py-2 font-oswald text-sm uppercase tracking-wider transition-colors block ${
                      (item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href))
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 flex flex-col gap-1">
                      {item.dropdown.map((sub) => (
                        sub.type === "header" ? (
                          <div
                            key={sub.label}
                            className="py-1 text-xs font-oswald uppercase tracking-wider text-primary/60"
                          >
                            {sub.label}
                          </div>
                        ) : sub.children ? (
                          <div key={sub.label}>
                            {(() => {
                              const meta = factionMeta[sub.label];
                              return (
                                <>
                                  <button
                                    onClick={() => toggleMobileExpanded(sub.label)}
                                    className={`py-1.5 text-xs font-oswald uppercase tracking-wider transition-colors flex items-center gap-1 ${meta ? `text-muted-foreground ${meta.hoverText}` : "text-muted-foreground hover:text-primary"}`}
                                  >
                                    {meta && <img src={meta.icon} alt="" className="w-4 h-4 object-contain" />}
                                    {sub.label}
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileExpandedItems.includes(sub.label) ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <AnimatePresence>
                                    {mobileExpandedItems.includes(sub.label) && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-4 flex flex-col gap-1 overflow-hidden"
                                      >
                                        {sub.children.map((child) => (
                                          <Link
                                            key={child.label}
                                            to={child.href}
                                            className={`py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground transition-colors ${meta ? meta.hoverText : "hover:text-primary"}`}
                                          >
                                            {child.label}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              );
                            })()}
                          </div>
                        ) : (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                          >
                            {sub.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
