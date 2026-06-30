import LegalLayout from "../components/LegalLayout";
import { BUSINESS } from "../config/business";
import { LegalField, If } from "../utils/render-field";
import { hasValue } from "../utils/render-field";
import { SEOHead, BreadcrumbJsonLd } from "@/seo";

/**
 * Política de Privacidad — RGPD (UE) 2016/679 + LOPDGDD 3/2018
 *
 * Los campos sin datos simplemente no se renderizan.
 * Los servicios de terceros se generan desde BUSINESS.thirdPartyServices.
 */
const Privacidad = () => {
  const fullAddress = [
    BUSINESS.address.street,
    BUSINESS.address.postalCode,
    BUSINESS.address.city,
    BUSINESS.address.province,
  ]
    .filter(Boolean)
    .join(", ");

  const contactEmail = BUSINESS.privacyEmail || BUSINESS.email;

  return (
    <>
      <SEOHead
        title="Política de Privacidad"
        description="Política de Privacidad de Alejandro Villanova. Información sobre el tratamiento de datos personales según RGPD y LOPDGDD."
        canonicalUrl="https://alejandrovillanova.com/privacidad"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://alejandrovillanova.com" },
          { name: "Política de Privacidad", url: "https://alejandrovillanova.com/privacidad" },
        ]}
      />
      <LegalLayout title="Política de Privacidad">
      <h2>1. ¿Quién es el responsable del tratamiento de tus datos?</h2>
      <ul>
        <LegalField label="Responsable" value={BUSINESS.legalName} />
        <LegalField label="NIF" value={BUSINESS.taxId} />
        <LegalField label="Dirección" value={fullAddress} />
        <LegalField label="Correo electrónico" value={contactEmail} />
        <If condition={BUSINESS.dpo.hasDPO && hasValue(BUSINESS.dpo.email)}>
          <li>
            <strong>Delegado de Protección de Datos (DPO):</strong>{" "}
            {BUSINESS.dpo.email}
          </li>
        </If>
      </ul>

      <h2>2. ¿Qué datos personales recogemos?</h2>
      <ul>
        <li>
          <strong>Formulario de reseñas:</strong> nombre, negocio, mensaje y
          puntuación que voluntariamente nos proporcionas al dejar una reseña.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de
          navegador, sistema operativo, páginas visitadas y tiempo de estancia
          (solo si aceptas cookies de análisis).
        </li>
        <li>
          <strong>Cookies:</strong> información sobre tus preferencias de
          navegación. Consulta la{" "}
          <a href="/cookies">Política de Cookies</a> para más detalle.
        </li>
      </ul>
      <p>
        No recogemos datos sensibles (salud, ideología, religión, etc.) ni
        datos de menores de edad. Si detectamos que un menor nos ha
        proporcionado datos sin consentimiento parental, los eliminaremos de
        inmediato.
      </p>

      <h2>3. ¿Con qué finalidad tratamos tus datos?</h2>
      <ul>
        <li>
          <strong>Reseñas:</strong> publicar tu opinión en la sección de
          testimonios para que otros visitantes conozcan experiencias reales.
        </li>
        <li>
          <strong>Contacto:</strong> responder a tus consultas a través de
          WhatsApp, correo electrónico o teléfono cuando nos contactas.
        </li>
        <li>
          <strong>Cumplimiento legal:</strong> atender obligaciones legales
          aplicables.
        </li>
      </ul>

      <h2>4. ¿Cuál es la base legal para el tratamiento?</h2>
      <ul>
        <li>
          <strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD):
          para la publicación de reseñas, envío de formularios y cookies no
          esenciales. Puedes retirar tu consentimiento en cualquier momento.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para mantener
          la seguridad del sitio web y prevenir usos fraudulentos.
        </li>
        <li>
          <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c
          RGPD): cuando sea necesario por la normativa aplicable.
        </li>
      </ul>

      <h2>5. ¿Por cuánto tiempo conservamos tus datos?</h2>
      <ul>
        <li>
          <strong>Reseñas:</strong> se conservan mientras permanezcan
          publicadas en el sitio web o hasta que solicites su eliminación.
        </li>
        <li>
          <strong>Datos de contacto:</strong> el tiempo necesario para
          resolver tu consulta, más un máximo de 12 meses.
        </li>
        <li>
          <strong>Cookies:</strong> según lo indicado en la{" "}
          <a href="/cookies">Política de Cookies</a>.
        </li>
      </ul>

      <h2>6. ¿Compartimos tus datos con terceros?</h2>
      <p>
        No vendemos, alquilamos ni cedemos tus datos personales a terceros,
        salvo en estos casos:
      </p>
      <ul>
        <If condition={BUSINESS.thirdPartyServices.length > 0}>
          <li>
            <strong>Proveedores de servicios:</strong> utilizamos los
            siguientes servicios de terceros que actúan como encargados del
            tratamiento:
            <ul>
              {BUSINESS.thirdPartyServices.map((svc, i) => (
                <li key={i}>
                  <strong>{svc.name}</strong> — {svc.purpose} Sus servidores
                  se ubican en {svc.location}. {svc.safeguard}{" "}
                  <a
                    href={svc.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Política de privacidad de {svc.name}
                  </a>
                  .
                </li>
              ))}
            </ul>
          </li>
        </If>
        <li>
          <strong>Obligación legal:</strong> cuando una ley, orden judicial o
          autoridad administrativa nos requiera facilitar información.
        </li>
      </ul>

      <If condition={BUSINESS.thirdPartyServices.length > 0}>
        <h2>7. Transferencias internacionales de datos</h2>
        <p>
          Algunos de nuestros proveedores de servicios pueden procesar tus
          datos fuera del Espacio Económico Europeo (EEE). En estos casos,
          garantizamos que dichas transferencias se realizan con las garantías
          adecuadas conforme al RGPD:
        </p>
        <ul>
          <li>
            Cláusulas contractuales tipo aprobadas por la Comisión Europea.
          </li>
          <li>
            Data Privacy Framework (para empresas certificadas en EEUU).
          </li>
        </ul>
      </If>

      <h2>8. ¿Cuáles son tus derechos?</h2>
      <p>
        Como titular de los datos, puedes ejercer los siguientes derechos
        enviando un correo electrónico a la dirección indicada en el apartado
        1, especificando el derecho que deseas ejercer y adjuntando una copia
        de tu documento de identidad:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> saber qué datos tuyos tratamos y obtener
          una copia.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o
          incompletos.
        </li>
        <li>
          <strong>Supresión:</strong> solicitar que eliminemos tus datos
          cuando ya no sean necesarios, retires tu consentimiento o consideres
          que el tratamiento es ilícito.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte al tratamiento basado en el
          interés legítimo.
        </li>
        <li>
          <strong>Portabilidad:</strong> recibir tus datos en un formato
          estructurado y de uso común, o solicitar que los transfiramos a otro
          responsable.
        </li>
        <li>
          <strong>Limitación:</strong> solicitar que restrinjamos
          temporalmente el tratamiento de tus datos mientras se verifica su
          exactitud o la procedencia de tu oposición.
        </li>
      </ul>
      <p>
        Responderemos a tu solicitud en el plazo máximo de un mes. Si
        consideras que no hemos atendido correctamente tus derechos, puedes
        presentar una reclamación ante la Agencia Española de Protección de
        Datos ({" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          AEPD
        </a>
        ).
      </p>

      <h2>9. Medidas de seguridad</h2>
      <p>
        Adoptamos las medidas técnicas y organizativas necesarias para
        garantizar la seguridad de tus datos personales y evitar su alteración,
        pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el
        estado de la tecnología y la naturaleza de los datos almacenados.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Nos reservamos el derecho a modificar esta Política de Privacidad para
        adaptarla a novedades legislativas o jurisprudenciales. Te
        recomendamos revisarla periódicamente. La fecha de última
        actualización aparece al inicio de esta página.
      </p>
    </LegalLayout>
    </>
  );
};

export default Privacidad;
