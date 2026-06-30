# 🔍 Sistema SEO reutilizable

Sistema completo de SEO on-page para webs React + Vite. Diseñado para copiar y pegar entre proyectos.

**Carpeta autocontenida.** Copias `src/seo/` a cualquier proyecto,
editas un archivo de configuración y listo.

---

## 📁 Estructura

```
src/seo/
├── config/
│   ├── seo-config.ts       ← ⚠️ ÚNICO archivo a editar por cliente
│   └── types.ts            ← Tipos TypeScript
├── components/
│   ├── SEOHead.tsx          ← Meta tags dinámicos por página
│   └── StructuredData.tsx   ← JSON-LD (Organization, Breadcrumbs, FAQ)
├── index.ts                 ← Barrel export
└── README.md                ← Este archivo
```

---

## 🚀 Cómo usar en un proyecto nuevo

### 1. Copia la carpeta

```bash
cp -r ruta-origen/src/seo ruta-destino/src/seo
```

Asegúrate de que el proyecto tenga:

```json
"react-helmet-async": "^2"
```

### 2. Configura el sitio

Edita **solo** `src/seo/config/seo-config.ts`:

```ts
export const SEO_CONFIG: SiteSEOConfig = {
  siteName: "Nombre del Cliente",
  siteUrl: "https://cliente.com",
  defaultDescription: "...",
  defaultTitle: "...",
  language: "es",
  themeColor: "#color",
  routes: [ /* rutas para el sitemap */ ],
};

export const ORGANIZATION_SCHEMA: OrganizationSchema = {
  "@type": "Person", // o "Organization" o "LocalBusiness"
  name: "...",
  // ...
};
```

### 3. Envuelve tu App con HelmetProvider

```tsx
import { HelmetProvider } from "react-helmet-async";

<HelmetProvider>
  <App />
</HelmetProvider>
```

### 4. Usa SEOHead en cada página

```tsx
import { SEOHead, BreadcrumbJsonLd } from "@/seo";

const AvisoLegal = () => (
  <>
    <SEOHead
      title="Aviso Legal"
      description="..."
      canonicalUrl="https://cliente.com/aviso-legal"
    />
    <BreadcrumbJsonLd items={[
      { name: "Inicio", url: "https://cliente.com" },
      { name: "Aviso Legal", url: "https://cliente.com/aviso-legal" },
    ]} />
    {/* contenido */}
  </>
);
```

### 5. Añade datos estructurados en la home

```tsx
import { OrganizationJsonLd, WebSiteJsonLd } from "@/seo";

// En tu página principal:
<OrganizationJsonLd />
<WebSiteJsonLd />
```

---

## 📋 Checklist de auditoría SEO

Usa esta checklist para cada proyecto de cliente:

### 🔴 Obligatorio (sin esto Google no te indexa bien)

- [x] `sitemap.xml` accesible en `/sitemap.xml`
- [x] `robots.txt` con referencia al sitemap
- [x] `<title>` único y descriptivo por página (50-60 chars)
- [x] `<meta name="description">` único por página (150-160 chars)
- [x] `<link rel="canonical">` en cada página
- [x] `<meta name="robots">` explícito
- [x] Datos estructurados: Organization/Person + WebSite + BreadcrumbList
- [x] `<html lang="es">`

### 🟠 Muy recomendable

- [x] Open Graph completo (og:title, og:description, og:image, og:url, og:type)
- [x] Twitter Card (summary_large_image)
- [x] `webmanifest` para PWA básica
- [x] `<meta name="theme-color">`
- [x] `favicon.ico` < 4KB
- [x] `preconnect` para Google Fonts
- [x] Imagen OG con URL permanente (no preview/temporal)
- [x] Lazy loading en imágenes (`loading="lazy"`)
- [x] `aria-label` en elementos interactivos

### 🟡 Deseable

- [ ] Prerenderizado de páginas clave (para crawlers que no ejecutan JS)
- [ ] Content-Security-Policy
- [ ] `<noscript>` fallback
- [ ] ETag / Cache-Control en hosting
- [ ] Google Search Console verificada
- [ ] Google Analytics / Search Console integrados
- [ ] hreflang si hay múltiples idiomas
- [ ] Optimización Core Web Vitals (LCP, FID, CLS)

### 🔧 Post-lanzamiento

- [ ] Subir sitemap a Google Search Console
- [ ] Inspeccionar URL en GSC
- [ ] Solicitar indexación
- [ ] Revisar cobertura (errores, páginas válidas, excluidas)
- [ ] Monitorear Core Web Vitals
- [ ] Revisar en PageSpeed Insights
- [ ] Comprobar rich snippets en Google

---

## ⚠️ Limitación importante: SPA sin SSR

Esta web es una **Single Page Application** con React. El HTML que
llega al navegador es `<div id="root"></div>` vacío.

**Googlebot SÍ ejecuta JavaScript** (desde 2019), pero en una segunda
pasada (two-wave indexing). Esto significa:

- La indexación es más lenta (días en vez de horas)
- El contenido puede tardar en aparecer en Google
- Crawlers de redes sociales (Facebook, Twitter, LinkedIn, WhatsApp)
  **NO ejecutan JavaScript** → solo ven las meta tags del `<head>`
  estático en `index.html`

**Soluciones (de menor a mayor complejidad):**

1. ✅ **Ya implementado**: Meta tags estáticos en `index.html` +
   `react-helmet-async` para Googlebot
2. ✅ **Ya implementado**: Prerender script con Playwright para generar
   HTML estático de páginas clave post-build
3. 🚀 **Recomendado**: Migrar a Next.js / Remix / Astro con SSR/SSG
4. 💰 **Alternativa**: Usar servicio de prerendering (prerender.io)

---

## 📚 Referencias

- [Google Search Central — Conceptos básicos de SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
