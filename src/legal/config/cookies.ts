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
  ],
};
