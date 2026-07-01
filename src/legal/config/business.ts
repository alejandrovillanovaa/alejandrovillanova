/**
 * ─── CONFIGURACIÓN DEL NEGOCIO ──────────────────────────────────
 *
 * 📌 ÚNICO ARCHIVO QUE NECESITAS EDITAR para adaptar todo el
 *    sistema legal a un nuevo cliente o proyecto.
 *
 * 🧹 Los campos vacíos ("") simplemente no se muestran en las
 *    páginas legales. Sin placeholders, sin "[PENDIENTE]".
 *
 * 🔒 Cumple con: LSSI-CE, RGPD, LOPDGDD.
 */

import type { BusinessConfig } from "./types";

export const BUSINESS: BusinessConfig = {
  /* ── Identidad ──────────────────────────────────────────────── */
  brandName: "Alejandro Villanova",
  legalName: "", // Ej: "Alejandro Villanova García"
  taxId: "", // Ej: "12345678Z"

  /* ── Dirección ──────────────────────────────────────────────── */
  address: {
    street: "", // Ej: "Calle Mayor 1, 2º A"
    city: "", // Ej: "Valencia"
    postalCode: "", // Ej: "46001"
    province: "", // Ej: "Valencia"
    country: "España",
  },

  /* ── Contacto ───────────────────────────────────────────────── */
  email: "", // Ej: "hola@ejemplo.com"
  privacyEmail: "", // Si es distinto del anterior; si no, déjalo vacío y se usará email
  phone: "+34 622 56 88 43",

  /* ── Registro mercantil (solo para SL / SA) ─────────────────── */
  registry: {
    registered: false,
    text: "", // Ej: "Registro Mercantil de Valencia, Tomo 1234, Folio 56, Hoja V-78901"
  },

  /* ── DPO ────────────────────────────────────────────────────── */
  dpo: {
    hasDPO: false,
    email: "",
  },

  /* ── Web ────────────────────────────────────────────────────── */
  siteUrl: "https://villanovainnova.es",

  /* ── Redes sociales ─────────────────────────────────────────── */
  social: {
    whatsapp: "https://wa.me/34622568843",
    instagram: "",
    linkedin: "",
  },

  /* ── Actividad ──────────────────────────────────────────────── */
  activity: "Servicios de consultoría tecnológica para negocios",

  /* ── Fecha de última revisión de los textos legales ─────────── */
  lastUpdated: "28 de junio de 2026",

  /* ── Servicios de terceros que tratan datos ─────────────────── */
  thirdPartyServices: [
    {
      name: "Supabase Inc.",
      purpose:
        "Alojamiento de la base de datos de reseñas. Puede tener acceso a nombre, negocio, mensaje y puntuación que introduces en el formulario.",
      privacyUrl: "https://supabase.com/privacy",
      location: "Estados Unidos (fuera de la Unión Europea)",
      safeguard:
        "Supabase cumple con cláusulas contractuales tipo aprobadas por la Comisión Europea y aplica medidas de seguridad equivalentes al RGPD.",
    },
    {
      name: "Google Fonts",
      purpose:
        "Carga de fuentes tipográficas. Tu dirección IP se envía a servidores de Google LLC cuando tu navegador solicita las fuentes.",
      privacyUrl: "https://policies.google.com/privacy",
      location: "Estados Unidos (fuera de la Unión Europea)",
      safeguard:
        "Google LLC está adherido al Data Privacy Framework entre la UE y EEUU.",
    },
  ],
};
