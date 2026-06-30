/**
 * ─── SEOHead — Gestión dinámica de <head> por página ─────────────
 *
 * Usa react-helmet-async para inyectar meta tags, links canónicos,
 * Open Graph, Twitter Cards y datos estructurados.
 *
 * 📦 Uso:
 *   <SEOHead title="Servicios" description="Lo que ofrezco..." />
 *
 * 🔧 Requiere <HelmetProvider> en el árbol (se añade en App.tsx).
 */

import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "../config/seo-config";
import type { SEOHeadProps } from "../config/types";

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogPath,
  ogImage,
  ogType = "website",
  noIndex = false,
  noFollow = false,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title
    ? `${title} ${SEO_CONFIG.titleSeparator} ${SEO_CONFIG.siteName}`
    : `${SEO_CONFIG.defaultTitle} ${SEO_CONFIG.titleSeparator} ${SEO_CONFIG.siteName}`;

  const desc = description || SEO_CONFIG.defaultDescription;

  const canonical = canonicalUrl || SEO_CONFIG.siteUrl + (ogPath || "/");

  const ogImg = ogImage || SEO_CONFIG.ogImageDefault;

  const robotsContent = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow",
  ].join(", ");

  return (
    <Helmet>
      {/* ── Básicos ─────────────────────────────────────────── */}
      <html lang={SEO_CONFIG.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* ── Open Graph ──────────────────────────────────────── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.language} />

      {/* ── Twitter Card ────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImg} />
      {SEO_CONFIG.twitterHandle && (
        <>
          <meta name="twitter:site" content={`@${SEO_CONFIG.twitterHandle}`} />
          <meta
            name="twitter:creator"
            content={`@${SEO_CONFIG.twitterHandle}`}
          />
        </>
      )}

      {/* ── Datos estructurados (JSON-LD) ───────────────────── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
