/**
 * ─── Helpers de renderizado condicional ─────────────────────────
 *
 * Solo renderizan contenido si el valor existe (no está vacío).
 * Evitan mostrar "[PENDIENTE]" o placeholders al usuario final.
 */

import type { ReactNode } from "react";

/** Renderiza children solo si `value` es un string no vacío */
export function IfPresent({
  value,
  children,
}: {
  value: string | undefined | null;
  children: ReactNode;
}) {
  if (!value || value.trim().length === 0) return null;
  return <>{children}</>;
}

/** Renderiza un <li> con etiqueta + valor solo si el valor existe */
export function LegalField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  if (!value || value.trim().length === 0) return null;
  return (
    <li>
      <strong>{label}:</strong> {value}
    </li>
  );
}

/** True si el string no está vacío */
export function hasValue(value: string | undefined | null): boolean {
  return !!value && value.trim().length > 0;
}

/** Renderiza el bloque solo si la condición es true */
export function If({
  condition,
  children,
}: {
  condition: boolean;
  children: ReactNode;
}) {
  if (!condition) return null;
  return <>{children}</>;
}
