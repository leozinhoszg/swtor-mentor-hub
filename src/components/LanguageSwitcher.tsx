import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-oswald uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors border border-border rounded hover:border-primary"
      aria-label={i18n.language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe size={14} />
      <span>{i18n.language === 'pt-BR' ? 'EN' : 'PT'}</span>
    </button>
  );
};

export default LanguageSwitcher;
