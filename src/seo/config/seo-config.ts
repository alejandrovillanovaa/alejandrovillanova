/**
 * ─── CONFIGURACIÓN SEO DEL SITIO ─────────────────────────────────
 *
 * 📌 ÚNICO ARCHIVO QUE NECESITAS EDITAR para adaptar el SEO
 *    a un nuevo cliente o proyecto.
 *
 * 🎯 Define: metadatos globales, rutas del sitemap, y datos
 *    para Schema.org Organization/Person.
 */

import type { SiteSEOConfig, OrganizationSchema } from "./types";

/* ── Configuración global de SEO ────────────────────────────────── */
export const SEO_CONFIG: SiteSEOConfig = {
  siteName: "Alejandro Villanova",
  siteUrl: "https://villanovainnova.es",
  defaultDescription:
    "Ayudo a negocios a atraer más clientes y ahorrar tiempo con tecnología. Presencia online, automatización e inteligencia artificial.",
  defaultTitle: "Tecnología para tu negocio",
  titleSeparator: "—",
  language: "es",
  region: "ES",
  twitterHandle: "",
  ogImageDefault:
    "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c5b0d83a-b11f-4b25-958c-f56da002435b/id-preview-76ec3c85--a8651892-36e7-4c60-83bd-9cc2836298e6.lovable.app-1774529154106.png",
  themeColor: "#0d9488",

  /* ── Rutas para el sitemap ──────────────────────────────────── */
  routes: [
    { path: "/", priority: 1.0, changefreq: "weekly" },
    { path: "/aviso-legal", priority: 0.3, changefreq: "monthly" },
    { path: "/privacidad", priority: 0.3, changefreq: "monthly" },
    { path: "/cookies", priority: 0.3, changefreq: "monthly" },
  ],
};

/* ── Schema.org Organization / Person ───────────────────────────── */
export const ORGANIZATION_SCHEMA: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alejandro Villanova",
  url: "https://villanovainnova.es",
  description:
    "Ayudo a negocios a atraer más clientes y ahorrar tiempo con tecnología. Consultoría tecnológica, automatización e inteligencia artificial para negocios locales.",
  email: "",
  telephone: "+34622568843",
  image:
    "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c5b0d83a-b11f-4b25-958c-f56da002435b/id-preview-76ec3c85--a8651892-36e7-4c60-83bd-9cc2836298e6.lovable.app-1774529154106.png",
  jobTitle: "Consultor tecnológico para negocios",
  knowsAbout: [
    "Automatización de procesos",
    "Inteligencia Artificial",
    "Presencia online",
    "Google Maps SEO",
    "Desarrollo web",
    "Marketing digital",
  ],
  sameAs: ["https://wa.me/34622568843"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ES",
  },
};
