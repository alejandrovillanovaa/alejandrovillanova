import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { COOKIE_CONFIG } from "../config/cookies";
import { useCookieConsent } from "../hooks/useCookieConsent";

/**
 * Banner de consentimiento de cookies (RGPD / LSSI-CE).
 *
 * Características:
 * - No carga cookies antes del consentimiento.
 * - Persiste la decisión en localStorage durante 365 días.
 * - Panel de configuración con checkboxes controlados por state.
 * - Botón "Configurar cookies" del footer/página lo reabre.
 * - La X cierra sin decidir (el banner reaparece al recargar).
 */
const CookieBanner = () => {
  const {
    visible,
    expanded,
    setExpanded,
    toggles,
    toggle,
    acceptAll,
    rejectAll,
    saveCustom,
    dismiss,
  } = useCookieConsent();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100]"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-modal="false"
        >
          <div className="max-w-3xl mx-auto m-4 p-6 bg-background border border-border rounded-2xl shadow-2xl">
            {/* ── Cabecera ──────────────────────────────────── */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"
                aria-hidden="true"
              >
                <Cookie className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  id="cookie-banner-title"
                  className="font-display text-lg font-semibold text-foreground mb-1"
                >
                  Este sitio usa cookies
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Usamos cookies propias y de terceros para mejorar tu
                  experiencia y mostrar contenido externo. Puedes
                  aceptarlas, rechazar las no esenciales o configurar tus
                  preferencias.{" "}
                  <Link
                    to="/cookies"
                    className="text-accent underline hover:text-accent/80"
                  >
                    Política de cookies
                  </Link>
                </p>
              </div>
              <button
                onClick={dismiss}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar sin decidir"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* ── Panel de configuración ────────────────────── */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <fieldset className="space-y-3 mb-5 p-4 rounded-xl bg-muted/50 border-0">
                    <legend className="sr-only">
                      Configuración de cookies
                    </legend>
                    {COOKIE_CONFIG.categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={toggles[cat.id] ?? cat.required}
                          disabled={cat.required}
                          onChange={() => toggle(cat.id)}
                          className="mt-0.5 accent-accent"
                        />
                        <div>
                          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                            {cat.name}
                            {cat.required && (
                              <span className="ml-2 text-xs text-accent font-normal">
                                (siempre activas)
                              </span>
                            )}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {cat.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </fieldset>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Botones ───────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-muted"
                aria-expanded={expanded}
              >
                Configurar
                {expanded ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              <div className="flex-1" />
              {expanded && (
                <button
                  onClick={saveCustom}
                  className="text-sm font-medium border border-border bg-background text-foreground hover:bg-muted py-2.5 px-6 rounded-xl transition-colors"
                >
                  Guardar selección
                </button>
              )}
              <button
                onClick={rejectAll}
                className="text-sm font-medium border border-border bg-background text-foreground hover:bg-muted py-2.5 px-6 rounded-xl transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={acceptAll}
                className="text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-accent/25"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
