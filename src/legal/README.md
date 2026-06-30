# 🛡️ Plantilla Legal reutilizable

Sistema legal completo para webs en España (LSSI-CE, RGPD, LOPDGDD).

**Carpeta autocontenida.** Copias `src/legal/` a cualquier proyecto,
editas un archivo de configuración, añades 3 rutas y listo.

---

## 📁 Estructura

```
src/legal/
├── config/
│   ├── business.ts        ← ⚠️ ÚNICO archivo a editar por cliente
│   ├── cookies.ts         ← Cookies que usa el sitio
│   └── types.ts           ← Tipos TypeScript
├── components/
│   ├── CookieBanner.tsx    ← Banner RGPD con consentimiento granular
│   ├── CookieSettings.tsx  ← Botón "Configurar cookies"
│   ├── LegalFooter.tsx     ← Footer con enlaces legales
│   └── LegalLayout.tsx     ← Plantilla de página legal
├── hooks/
│   └── useCookieConsent.ts ← Lógica del consentimiento
├── pages/
│   ├── AvisoLegal.tsx      ← /aviso-legal
│   ├── Privacidad.tsx      ← /privacidad
│   └── Cookies.tsx         ← /cookies
├── utils/
│   └── render-field.tsx    ← Helpers condicionales
├── index.ts                ← Barrel export
└── README.md               ← Este archivo
```

---

## 🚀 Cómo usar en un proyecto nuevo

### 1. Copia la carpeta

```bash
cp -r ruta-origen/src/legal ruta-destino/src/legal
```

Asegúrate de que el proyecto tenga estas dependencias:

```json
"framer-motion": "^12",
"lucide-react": "^0.4",
"react-router-dom": "^6"
```

### 2. Configura el negocio

Edita **solo** `src/legal/config/business.ts`:

```ts
export const BUSINESS: BusinessConfig = {
  brandName: "Mi Negocio",        // Nombre público
  legalName: "Mi Empresa SL",     // Titular legal
  taxId: "B12345678",            // NIF / CIF
  address: {
    street: "Calle Mayor 1",
    city: "Valencia",
    postalCode: "46001",
    province: "Valencia",
    country: "España",
  },
  email: "hola@minegocio.com",
  privacyEmail: "",               // Solo si es ≠ de email
  phone: "+34 600 000 000",
  registry: {
    registered: true,             // Solo para SL/SA
    text: "Registro Mercantil de Valencia, Tomo 1234...",
  },
  dpo: { hasDPO: false, email: "" },
  siteUrl: "https://minegocio.com",
  lastUpdated: "1 de enero de 2025",
  activity: "Servicios de consultoría tecnológica",
  thirdPartyServices: [
    {
      name: "Supabase Inc.",
      purpose: "...",
      privacyUrl: "https://supabase.com/privacy",
      location: "Estados Unidos",
      safeguard: "...",
    },
  ],
  social: { whatsapp: "...", instagram: "", linkedin: "" },
};
```

**Los campos vacíos `""` simplemente no se muestran en las páginas legales.**

### 3. Configura las cookies

Edita `src/legal/config/cookies.ts` para reflejar las cookies reales del sitio.

### 4. Añade las rutas en App.tsx

```tsx
import { lazy, Suspense } from "react";
import { AvisoLegalPage, PrivacidadPage, CookiesPage, CookieBanner } from "@/legal";

// Con lazy loading:
const AvisoLegal = lazy(() => import("@/legal").then(m => ({ default: m.AvisoLegalPage })));
const Privacidad = lazy(() => import("@/legal").then(m => ({ default: m.PrivacidadPage })));
const Cookies = lazy(() => import("@/legal").then(m => ({ default: m.CookiesPage })));

// En tus rutas:
<Route path="/aviso-legal" element={<AvisoLegal />} />
<Route path="/privacidad" element={<Privacidad />} />
<Route path="/cookies" element={<Cookies />} />
```

### 5. Usa los componentes

```tsx
import { LegalFooter, CookieBanner, CookieSettings } from "@/legal";

// En tu footer:
<footer className="...">
  <LegalFooter />
</footer>

// En tu layout principal (una sola vez):
<CookieBanner />
```

---

## 📋 Checklist de cumplimiento

- [x] Aviso Legal (LSSI-CE art. 10)
- [x] Política de Privacidad (RGPD + LOPDGDD)
- [x] Política de Cookies (LSSI-CE + RGPD)
- [x] Banner de consentimiento granular
- [x] Enlaces legales en footer
- [x] Botón "Configurar cookies" reabre banner
- [x] Checkbox de consentimiento en formularios
- [x] Sin placeholders visibles
- [x] Tabla de cookies autogenerada desde config
- [x] Servicios de terceros configurables

---

## ⚖️ Legislación cubierta

- **LSSI-CE**: Ley 34/2002, de Servicios de la Sociedad de la Información
- **RGPD**: Reglamento (UE) 2016/679 (General Data Protection Regulation)
- **LOPDGDD**: Ley Orgánica 3/2018, de Protección de Datos y Garantía de Derechos Digitales

---

## ⚠️ Aviso

Esta plantilla cubre los requisitos **mínimos** legales para webs pequeñas en España.
No sustituye el asesoramiento de un abogado especializado. Cada negocio puede tener
requisitos adicionales según su actividad, volumen de datos o sector.
