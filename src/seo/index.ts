/* ─── SEO Template — Barrel export ──────────────────────────────
 *
 * Para usar en cualquier proyecto:
 *
 *   1. Copia la carpeta src/seo/ a tu proyecto.
 *   2. Edita src/seo/config/seo-config.ts con los datos del cliente.
 *   3. Envuelve tu App con <HelmetProvider>.
 *   4. Usa <SEOHead /> en cada página.
 *   5. Añade <OrganizationJsonLd /> y <WebSiteJsonLd /> en la home.
 */

// ── Configuración ──────────────────────────────────────────────
export { SEO_CONFIG, ORGANIZATION_SCHEMA } from "./config/seo-config";
export type * from "./config/types";

// ── Componentes ────────────────────────────────────────────────
export { default as SEOHead } from "./components/SEOHead";
export {
  OrganizationJsonLd,
  WebSiteJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
} from "./components/StructuredData";
