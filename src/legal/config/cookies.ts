/**
 * ─── CONFIGURACIÓN DE COOKIES ───────────────────────────────────
 *
 * Define las cookies y tecnologías que usa el sitio.
 *
 * Para añadir una cookie nueva: añade una entrada en el array
 * `items` de la categoría correspondiente.
 *
 * Para añadir una categoría nueva: añade un objeto al array
 * `categories`. El banner y la página de cookies se actualizan
 * automáticamente.
 */

import type { CookieConfig } from "./types";

export const COOKIE_CONFIG: CookieConfig = {
  storageKey: "cookie-consent",
  consentDurationDays: 365,

  categories: [
    {
      id: "essential",
      name: "Técnicas",
      required: true,
      description:
        "Cookies necesarias para que el sitio web funcione correctamente. No almacenan información personal identificable.",
      items: [
        {
          name: "cookie-consent",
          duration: "365 días",
          purpose:
            "Almacena tu configuración de consentimiento de cookies en localStorage. No se envía al servidor.",
        },
      ],
    },
    {
      id: "external-fonts",
      name: "Fuentes externas",
      required: false,
      description:
        "Google Fonts carga las tipografías del sitio desde servidores externos. Tu dirección IP se envía a Google LLC en Estados Unidos.",
      items: [
        {
          name: "Google Fonts (fonts.googleapis.com)",
          duration: "Persistente (la fuente se almacena en caché del navegador)",
          purpose:
            "Carga de las fuentes tipográficas Inter y Space Grotesk necesarias para la visualización del sitio.",
          provider: "Google LLC",
        },
      ],
    },
  ],
};
