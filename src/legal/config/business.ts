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

/* ⚠️⚠️⚠️  DATOS OBLIGATORIOS QUE DEBES RELLENAR A MANO  ⚠️⚠️⚠️
 *
 * Sin estos datos el Aviso Legal y la Política de Privacidad
 * quedan incompletos (riesgo de sanción LSSI-CE art. 10 y RGPD).
 * Rellena los campos marcados más abajo con "⬇️ RELLENAR":
 *
 *   1. legalName          → tu nombre y apellidos (o razón social).
 *   2. taxId              → tu NIF / DNI.
 *   3. email              → correo de contacto (ej: "hola@villanovainnova.es").
 *   4. address.street     → (opcional) calle y número, solo si usas domicilio fiscal.
 *   5. address.postalCode → (opcional) código postal.
 *
 * Los campos que dejes vacíos simplemente no se muestran en la web.
 */

import type { BusinessConfig } from "./types";

export const BUSINESS: BusinessConfig = {
  /* ── Identidad ──────────────────────────────────────────────── */
  brandName: "Alejandro Villanova",
  legalName: "", // ⬇️ RELLENAR: "Alejandro Villanova García"
  taxId: "", // ⬇️ RELLENAR: "12345678Z"

  /* ── Dirección ──────────────────────────────────────────────── */
  address: {
    street: "", // Opcional: calle y número (solo si usas domicilio fiscal)
    city: "Granada",
    postalCode: "", // Opcional: "18001"–"18015"
    province: "Granada",
    country: "España",
  },

  /* ── Contacto ───────────────────────────────────────────────── */
  email: "", // ⬇️ RELLENAR: "hola@villanovainnova.es"
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
  lastUpdated: "2 de noviembre de 2026",

  /* ── Servicios de terceros que tratan datos ─────────────────── */
  thirdPartyServices: [
    {
      name: "Supabase Inc.",
      purpose:
        "Alojamiento de la base de datos de reseñas. Puede tener acceso a nombre, negocio, mensaje y puntuación que introduces en el formulario, así como a la dirección IP y metadatos técnicos de la conexión.",
      privacyUrl: "https://supabase.com/privacy",
      location: "Estados Unidos (fuera de la Unión Europea)",
      safeguard:
        "Supabase cumple con cláusulas contractuales tipo aprobadas por la Comisión Europea y aplica medidas de seguridad equivalentes al RGPD.",
    },
  ],
};
