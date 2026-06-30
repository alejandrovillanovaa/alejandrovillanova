/* ─── Tipos del sistema legal ─────────────────────────────────── */

export interface BusinessAddress {
  street: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

export interface BusinessRegistry {
  registered: boolean;
  text: string;
}

export interface BusinessDPO {
  hasDPO: boolean;
  email: string;
}

export interface BusinessSocial {
  whatsapp: string;
  instagram: string;
  linkedin: string;
}

export interface ThirdPartyService {
  name: string;
  purpose: string;
  privacyUrl: string;
  location: string;
  safeguard: string;
}

export interface BusinessConfig {
  /** Marca comercial (nombre público) */
  brandName: string;
  /** Nombre legal completo (persona física o razón social) */
  legalName: string;
  /** NIF / CIF */
  taxId: string;
  /** Dirección postal */
  address: BusinessAddress;
  /** Email de contacto general */
  email: string;
  /** Email específico para ejercer derechos ARCO-POL (si es distinto) */
  privacyEmail: string;
  /** Teléfono (opcional) */
  phone: string;
  /** Datos registrales (solo SL/SA) */
  registry: BusinessRegistry;
  /** Delegado de Protección de Datos */
  dpo: BusinessDPO;
  /** URL canónica del sitio */
  siteUrl: string;
  /** Redes sociales */
  social: BusinessSocial;
  /** Fecha de última revisión de los textos legales */
  lastUpdated: string;
  /** Servicios de terceros que reciben datos */
  thirdPartyServices: ThirdPartyService[];
  /** Actividad profesional (aparece en el aviso legal) */
  activity: string;
}

/* ─── Tipos de cookies ────────────────────────────────────────── */

export interface CookieCategory {
  id: string;
  name: string;
  required: boolean;
  description: string;
  /** Cookies concretas dentro de esta categoría (opcional) */
  items?: CookieItem[];
}

export interface CookieItem {
  name: string;
  duration: string;
  purpose: string;
  provider?: string;
}

export interface CookieConfig {
  /** Clave en localStorage */
  storageKey: string;
  /** Duración del consentimiento en días */
  consentDurationDays: number;
  /** Categorías de cookies */
  categories: CookieCategory[];
}

/* ─── Consentimiento ──────────────────────────────────────────── */

export type ConsentState = "pending" | "accepted-all" | "rejected-all" | "custom";

export interface ConsentData {
  state: ConsentState;
  accepted: string[];
  rejected: string[];
  timestamp: number;
}
