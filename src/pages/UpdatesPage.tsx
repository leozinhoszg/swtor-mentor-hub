import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UpdatesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation("updates");

  const updates = t("pageUpdates", { returnObjects: true }) as Array<{
    date: string;
    title: string;
    summary: string;
    changes: string[];
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("pageDescription")}
          </motion.p>
        </div>
      </section>

      {/* Updates Timeline */}
      <section className="py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {updates.map((update, i) => (
                <motion.div
                  key={update.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="md:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-background border-2 border-primary hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-card-gold p-6">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-primary font-oswald uppercase tracking-wider">
                          {update.date}
                        </span>
                        <h3 className="font-cinzel font-bold text-xl text-foreground mt-1 mb-2">
                          {update.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{update.summary}</p>

                        <div className="divider-gold my-4" />

                        <span className="text-xs font-oswald uppercase tracking-wider text-primary mb-3 block">
                          {t("changesLabel")}
                        </span>
                        <ul className="space-y-2">
                          {update.changes.map((change) => (
                            <li key={change} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

export default UpdatesPage;
