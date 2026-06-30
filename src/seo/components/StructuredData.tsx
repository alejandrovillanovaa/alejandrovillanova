/**
 * ─── StructuredData — JSON-LD reutilizables ──────────────────────
 *
 * Componentes que inyectan datos estructurados Schema.org
 * para rich snippets, panel de conocimiento, migas de pan, etc.
 *
 * 📦 Uso:
 *   <OrganizationJsonLd />       ← en la homepage
 *   <BreadcrumbJsonLd items={...} /> ← en páginas interiores
 *   <WebSiteJsonLd />            ← en la homepage
 */

import { SEO_CONFIG, ORGANIZATION_SCHEMA } from "../config/seo-config";

interface BreadcrumbItem {
  name: string;
  url: string;
}

/* ── Organization / Person ──────────────────────────────────────── */
export const OrganizationJsonLd = () => {
  const json = JSON.stringify(ORGANIZATION_SCHEMA);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

/* ── WebSite (con SearchAction) ──────────────────────────────────── */
export const WebSiteJsonLd = () => {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: SEO_CONFIG.language,
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

/* ── BreadcrumbList ──────────────────────────────────────────────── */
export const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

/* ── FAQ (si tienes preguntas frecuentes) ────────────────────────── */
export const FAQJsonLd = ({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) => {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};
