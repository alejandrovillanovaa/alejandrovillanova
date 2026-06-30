import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BUSINESS } from "../config/business";
import { hasValue } from "../utils/render-field";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Plantilla reutilizable para páginas legales.
 * Usa la fecha de `BUSINESS.lastUpdated` automáticamente.
 * El nombre de la marca en el footer también viene de BUSINESS.
 */
const LegalLayout = ({ title, children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          {title}
        </h1>
        {hasValue(BUSINESS.lastUpdated) && (
          <p className="text-sm text-muted-foreground mb-10">
            Última actualización: {BUSINESS.lastUpdated}
          </p>
        )}

        <div
          className="prose prose-neutral max-w-none
            prose-headings:font-display prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground prose-li:leading-relaxed
            prose-strong:text-foreground
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-th:text-left prose-th:font-semibold prose-th:text-foreground
            prose-td:text-muted-foreground
          "
        >
          {children}
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} {BUSINESS.brandName}. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LegalLayout;
