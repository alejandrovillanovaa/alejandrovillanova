/**
 * ─── Hook de consentimiento de cookies ──────────────────────────
 *
 * Encapsula toda la lógica: leer, guardar, aceptar, rechazar,
 * configurar, expirar y reabrir el banner.
 *
 * El componente CookieBanner solo se encarga de pintar.
 */

import { useState, useEffect, useCallback } from "react";
import { COOKIE_CONFIG } from "../config/cookies";
import type { ConsentData, ConsentState } from "../config/types";

const STORAGE_KEY = COOKIE_CONFIG.storageKey;
const MAX_AGE_MS = COOKIE_CONFIG.consentDurationDays * 24 * 60 * 60 * 1000;

function readStored(): ConsentData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: ConsentData = JSON.parse(raw);
    if (Date.now() - data.timestamp > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function writeStored(data: ConsentData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useCookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Estado controlado de los checkboxes
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  // Al montar: leer consentimiento guardado
  useEffect(() => {
    const stored = readStored();
    if (!stored) {
      // Inicializar toggles: required = true, resto = false
      const init: Record<string, boolean> = {};
      COOKIE_CONFIG.categories.forEach((c) => {
        init[c.id] = c.required;
      });
      setToggles(init);
      setVisible(true);
    }
  }, []);

  // Escuchar evento global para reabrir preferencias
  useEffect(() => {
    const handler = () => {
      // Recargar toggles desde lo guardado si existe
      const stored = readStored();
      if (stored) {
        const init: Record<string, boolean> = {};
        COOKIE_CONFIG.categories.forEach((c) => {
          init[c.id] = stored.accepted.includes(c.id);
        });
        setToggles(init);
      }
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const toggle = useCallback((id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const saveConsent = useCallback(
    (accepted: string[], rejected: string[], state: ConsentState) => {
      const data: ConsentData = { state, accepted, rejected, timestamp: Date.now() };
      writeStored(data);
      setVisible(false);
      setExpanded(false);
    },
    [],
  );

  const acceptAll = useCallback(() => {
    const ids = COOKIE_CONFIG.categories.map((c) => c.id);
    saveConsent(ids, [], "accepted-all");
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    const required = COOKIE_CONFIG.categories.filter((c) => c.required).map((c) => c.id);
    const rejected = COOKIE_CONFIG.categories.filter((c) => !c.required).map((c) => c.id);
    saveConsent(required, rejected, "rejected-all");
  }, [saveConsent]);

  const saveCustom = useCallback(() => {
    const accepted: string[] = [];
    const rejected: string[] = [];
    COOKIE_CONFIG.categories.forEach((c) => {
      if (toggles[c.id]) accepted.push(c.id);
      else rejected.push(c.id);
    });
    const allAccepted = accepted.length === COOKIE_CONFIG.categories.length;
    saveConsent(accepted, rejected, allAccepted ? "accepted-all" : "custom");
  }, [toggles, saveConsent]);

  const dismiss = useCallback(() => {
    // Cerrar sin decidir (el banner reaparecerá al recargar)
    setVisible(false);
  }, []);

  return {
    visible,
    expanded,
    setExpanded,
    toggles,
    toggle,
    acceptAll,
    rejectAll,
    saveCustom,
    dismiss,
  };
}
