/* ─── Legal Template — Barrel export ─────────────────────────────
 *
 * Para usar en cualquier proyecto:
 *
 *   1. Copia la carpeta src/legal/ a tu proyecto.
 *   2. Edita src/legal/config/business.ts con los datos del cliente.
 *   3. Edita src/legal/config/cookies.ts con las cookies del sitio.
 *   4. Añade las rutas en tu App.tsx (ver README.md).
 *   5. Importa y usa los componentes donde necesites:
 *
 *      import { LegalFooter, CookieBanner } from "@/legal";
 */

// ── Configuración ──────────────────────────────────────────────
export { BUSINESS } from "./config/business";
export { COOKIE_CONFIG } from "./config/cookies";
export type * from "./config/types";

// ── Componentes ────────────────────────────────────────────────
export { default as LegalLayout } from "./components/LegalLayout";
export { default as CookieBanner } from "./components/CookieBanner";
export { default as CookieSettings } from "./components/CookieSettings";
export { default as LegalFooter } from "./components/LegalFooter";

// ── Páginas ────────────────────────────────────────────────────
export { default as AvisoLegalPage } from "./pages/AvisoLegal";
export { default as PrivacidadPage } from "./pages/Privacidad";
export { default as CookiesPage } from "./pages/Cookies";

// ── Hooks ──────────────────────────────────────────────────────
export { useCookieConsent } from "./hooks/useCookieConsent";

// ── Utilidades ─────────────────────────────────────────────────
export { IfPresent, LegalField, If, hasValue } from "./utils/render-field";
