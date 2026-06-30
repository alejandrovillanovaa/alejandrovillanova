import { Link } from "react-router-dom";
import { BUSINESS } from "../config/business";
import CookieSettings from "./CookieSettings";

/**
 * Footer legal reutilizable. Se inserta en el footer principal
 * de la web y muestra los enlaces obligatorios + copyright.
 *
 * Para usarlo en cualquier proyecto:
 *   import { LegalFooter } from "@/legal";
 *   <LegalFooter />
 */
const LegalFooter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Copyright */}
      <p className="text-section-dark-foreground/40 text-sm">
        &copy; {new Date().getFullYear()} {BUSINESS.brandName}. Todos los
        derechos reservados.
      </p>

      {/* Enlaces legales */}
      <nav
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-section-dark-foreground/50"
        aria-label="Enlaces legales"
      >
        <Link to="/aviso-legal" className="hover:text-accent transition-colors">
          Aviso Legal
        </Link>
        <Link to="/privacidad" className="hover:text-accent transition-colors">
          Privacidad
        </Link>
        <Link to="/cookies" className="hover:text-accent transition-colors">
          Cookies
        </Link>
        <CookieSettings className="text-section-dark-foreground/50" />
      </nav>
    </div>
  );
};

export default LegalFooter;
