/**
 * ─── Tipos compartidos del sistema SEO ───────────────────────────
 *
 * 📌 Reutilizable entre proyectos sin cambios.
 */

export interface SEOHeadProps {
  /** Título de la página (se añade el sufijo del sitio) */
  title?: string;
  /** Meta description única para la página */
  description: string;
  /** URL canónica (absoluta) */
  canonicalUrl?: string;
  /** Ruta relativa para OG (sin dominio) */
  ogPath?: string;
  /** Imagen OG específica (sobrescribe la default) */
  ogImage?: string;
  /** Tipo OG: website, article, profile... */
  ogType?: "website" | "article" | "profile" | "product";
  /** Si la página debe indexarse */
  noIndex?: boolean;
  /** Si los enlaces de la página deben seguirse */
  noFollow?: boolean;
  /** Schema.org JSON-LD adicional por página */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface SiteSEOConfig {
  /** Nombre del sitio / marca */
  siteName: string;
  /** URL base (sin barra final) */
  siteUrl: string;
  /** Descripción por defecto del sitio */
  defaultDescription: string;
  /** Título por defecto (home) */
  defaultTitle: string;
  /** Separador título | sitio */
  titleSeparator: string;
  /** Idioma (es, en, ca...) */
  language: string;
  /** Región opcional (ES, MX, US...) */
  region?: string;
  /** Twitter handle (sin @) */
  twitterHandle: string;
  /** Imagen OG por defecto (URL absoluta) */
  ogImageDefault: string;
  /** Color del tema (hex) */
  themeColor: string;
  /** Rutas del sitio para sitemap */
  routes: SEOSiteRoute[];
}

export interface SEOSiteRoute {
  path: string;
  /** Prioridad 0.0 – 1.0 */
  priority: number;
  /** Frecuencia de cambio */
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Fecha de última modificación ISO */
  lastmod?: string;
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization" | "LocalBusiness" | "Person";
  name: string;
  url: string;
  description?: string;
  email?: string;
  telephone?: string;
  image?: string;
  sameAs?: string[];
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
  };
  /** Solo para LocalBusiness */
  priceRange?: string;
  /** Solo para Person */
  jobTitle?: string;
  knowsAbout?: string[];
}
