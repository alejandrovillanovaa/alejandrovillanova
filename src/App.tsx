import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Páginas legales desde la plantilla (carga diferida)
const AvisoLegal = lazy(
  () => import("@/legal").then((m) => ({ default: m.AvisoLegalPage })),
);
const Privacidad = lazy(
  () => import("@/legal").then((m) => ({ default: m.PrivacidadPage })),
);
const Cookies = lazy(
  () => import("@/legal").then((m) => ({ default: m.CookiesPage })),
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
