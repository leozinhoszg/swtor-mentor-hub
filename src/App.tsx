import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import StoriesPage from "./pages/StoriesPage";
import ContentPage from "./pages/ContentPage";
import OperationsPage from "./pages/OperationsPage";
import OperationDetailPage from "./pages/OperationDetailPage";
import EventsPage from "./pages/EventsPage";
import GuidesPage from "./pages/GuidesPage";
import UpdatesPage from "./pages/UpdatesPage";
import ClassStoryPage from "./pages/ClassStoryPage";
import EarlyGamePage from "./pages/EarlyGamePage";
import MidGamePage from "./pages/MidGamePage";
import EndgamePage from "./pages/EndgamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DocumentHead = () => {
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    document.title = t("meta.title");
    document.documentElement.lang = i18n.language;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));
  }, [i18n.language, t]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DocumentHead />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/historias" element={<StoriesPage />} />
          <Route path="/historias/:classSlug" element={<ClassStoryPage />} />
          <Route path="/conteudo" element={<ContentPage />} />
          <Route path="/conteudo/early-game/classes" element={<EarlyGamePage />} />
          <Route path="/conteudo/mid-game" element={<MidGamePage />} />
          <Route path="/conteudo/endgame" element={<EndgamePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/operations/:operationSlug" element={<OperationDetailPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/guias" element={<GuidesPage />} />
          <Route path="/atualizacoes" element={<UpdatesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
