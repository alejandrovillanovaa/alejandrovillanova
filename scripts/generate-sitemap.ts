/**
 * ─── Generador de sitemap.xml ─────────────────────────────────────
 *
 * Genera un sitemap.xml a partir de la configuración SEO centralizada.
 * Lee src/seo/config/seo-config.ts y escribe public/sitemap.xml.
 *
 * 🚀 Uso:
 *   npx tsx scripts/generate-sitemap.ts
 *   npm run sitemap
 *
 * 🔧 Para cambiar las rutas, edita SEO_CONFIG.routes en seo-config.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── Tipos inline para no depender de módulos TS ────────────────── */
interface SitemapRoute {
  path: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

/* ── Configuración del sitio ────────────────────────────────────── */
const SITE_URL = "https://villanovainnova.es";

// ⚠️ Mantén esto sincronizado con src/seo/config/seo-config.ts
const ROUTES: SitemapRoute[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/aviso-legal", priority: 0.3, changefreq: "monthly" },
  { path: "/privacidad", priority: 0.3, changefreq: "monthly" },
  { path: "/cookies", priority: 0.3, changefreq: "monthly" },
];

/* ── Generar XML ────────────────────────────────────────────────── */
function generateSitemapXML(routes: SitemapRoute[]): string {
  const today = new Date().toISOString().split("T")[0];

  const urlElements = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>
`;
}

/* ── Escribir archivo ───────────────────────────────────────────── */
function main() {
  const xml = generateSitemapXML(ROUTES);
  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`✅ Sitemap generado: ${outputPath}`);
  console.log(`   ${ROUTES.length} URLs incluidas\n`);
}

main();
