/**
 * ─── Script de prerenderizado ────────────────────────────────────
 *
 * Genera HTML estático de cada página después del build.
 * Soluciona el problema de SPA para crawlers que no ejecutan JS
 * (Facebook, Twitter, LinkedIn, WhatsApp) y acelera la indexación.
 *
 * 🚀 Uso:
 *   npx tsx scripts/prerender.ts
 *
 * 📋 Requisitos:
 *   - Ejecutar después de `npm run build`
 *   - Tener el servidor de preview corriendo (npm run preview)
 *   - O alternativamente leer los archivos del dist/
 *
 * 🔧 Personaliza las rutas abajo según el proyecto.
 */

import { chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── Configuración ──────────────────────────────────────────────── */
const BASE_URL = "http://localhost:4173"; // Puerto de vite preview
const DIST_DIR = path.resolve(__dirname, "../dist");
const ROUTES = ["/", "/aviso-legal", "/privacidad", "/cookies"];

/* ── Espera a que no haya peticiones pendientes ─────────────────── */
async function waitForNetworkIdle(page: any, timeout = 5000) {
  await page.waitForLoadState("networkidle", { timeout }).catch(() => {
    console.warn("⚠️  Network no alcanzó idle, continuando...");
  });
  // Tiempo extra para animaciones y renderizado JS
  await page.waitForTimeout(2000);
}

/* ── Prerenderiza una ruta ──────────────────────────────────────── */
async function prerenderRoute(browser: any, route: string) {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  });
  const page = await context.newPage();

  try {
    console.log(`  🔍 Prerenderizando: ${route}`);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
    await waitForNetworkIdle(page);

    // Extraer HTML completo tras renderizado JS
    const html = await page.content();

    // Determinar ruta de salida
    const outputDir =
      route === "/"
        ? DIST_DIR
        : path.join(DIST_DIR, route.replace(/^\//, ""));
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, "index.html");
    fs.writeFileSync(outputPath, html, "utf-8");
    console.log(`  ✅ ${route} → ${path.relative(process.cwd(), outputPath)}`);
  } catch (err) {
    console.error(`  ❌ Error en ${route}:`, err);
  } finally {
    await context.close();
  }
}

/* ── Principal ──────────────────────────────────────────────────── */
async function main() {
  console.log("\n🚀 Iniciando prerenderizado de páginas...\n");

  const browser = await chromium.launch({ headless: true });

  for (const route of ROUTES) {
    await prerenderRoute(browser, route);
  }

  await browser.close();
  console.log("\n✨ Prerenderizado completado.\n");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
