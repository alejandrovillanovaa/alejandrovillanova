import LegalLayout from "../components/LegalLayout";
import CookieSettings from "../components/CookieSettings";
import { COOKIE_CONFIG } from "../config/cookies";
import { SEOHead, BreadcrumbJsonLd } from "@/seo";

/**
 * Política de Cookies — LSSI-CE + RGPD
 *
 * La tabla de cookies se genera automáticamente desde COOKIE_CONFIG.
 * Las categorías sin cookies definidas simplemente no aparecen.
 * El botón "Configurar cookies" reabre el banner usando el
 * componente CookieSettings.
 */
const Cookies = () => {
  return (
    <>
      <SEOHead
        title="Política de Cookies"
        description="Política de Cookies de Alejandro Villanova. Información sobre las cookies utilizadas, su finalidad y cómo gestionarlas."
        canonicalUrl="https://villanovainnova.es/cookies"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://villanovainnova.es" },
          { name: "Política de Cookies", url: "https://villanovainnova.es/cookies" },
        ]}
      />
      <LegalLayout title="Política de Cookies">
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web
        almacenan en tu navegador cuando los visitas. Permiten que la web
        recuerde información sobre tu visita —idioma, preferencias, inicio de
        sesión— y te ofrezca una experiencia más personalizada.
      </p>
      <p>
        Este sitio también utiliza el almacenamiento local del navegador
        (localStorage) para guardar tus preferencias de consentimiento de
        cookies, lo que constituye una tecnología equivalente a efectos de la
        normativa aplicable.
      </p>

      <h2>2. Cookies utilizadas en este sitio</h2>

      {COOKIE_CONFIG.categories.map((cat) => {
        const hasItems = cat.items && cat.items.length > 0;
        return (
          <div key={cat.id}>
            <h3>
              {cat.name}
              {cat.required ? " (necesarias)" : ""}
            </h3>
            <p>{cat.description}</p>
            {cat.required && (
              <p>
                Por su naturaleza técnica, estas cookies están exentas de
                consentimiento según el artículo 22.2 de la LSSI-CE.
              </p>
            )}
            {hasItems && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse my-4">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Nombre
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Duración
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Finalidad
                      </th>
                      {cat.items!.some((i) => i.provider) && (
                        <th className="text-left py-2 font-semibold text-foreground">
                          Proveedor
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items!.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/50"
                      >
                        <td className="py-2 pr-4 align-top">
                          <code className="text-xs">{item.name}</code>
                        </td>
                        <td className="py-2 pr-4 align-top">
                          {item.duration}
                        </td>
                        <td className="py-2 pr-4 align-top">
                          {item.purpose}
                        </td>
                        {cat.items!.some((i) => i.provider) && (
                          <td className="py-2 align-top">
                            {item.provider || "—"}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      <h2>3. ¿Cómo gestionar las cookies?</h2>
      <p>
        Tienes varias opciones para gestionar o deshabilitar las cookies:
      </p>
      <ul>
        <li>
          <strong>Desde este sitio:</strong> puedes cambiar tus preferencias
          en cualquier momento:
        </li>
      </ul>
      <p>
        <CookieSettings className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25" />
      </p>
      <ul>
        <li>
          <strong>Desde tu navegador:</strong> la mayoría de navegadores
          permiten bloquear, eliminar o configurar excepciones de cookies
          desde sus ajustes:
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <h2>4. Actualizaciones</h2>
      <p>
        Esta Política de Cookies se actualiza periódicamente para reflejar
        cambios en la legislación o en las tecnologías utilizadas. La fecha de
        última actualización figura al inicio de esta página.
      </p>
    </LegalLayout>
    </>
  );
};

export default Cookies;
