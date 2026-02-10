import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StoriesSection from "@/components/StoriesSection";
import ContentSection from "@/components/ContentSection";
import OperationsSection from "@/components/OperationsSection";
import EventsSection from "@/components/EventsSection";
import UpdatesSection from "@/components/UpdatesSection";
import GuidesSection from "@/components/GuidesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <StoriesSection />
      <ContentSection />
      <OperationsSection />
      <EventsSection />
      <UpdatesSection />
      <GuidesSection />
      <Footer />
    </main>
  );
};

export default Index;
