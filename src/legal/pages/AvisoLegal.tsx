import LegalLayout from "../components/LegalLayout";
import { BUSINESS } from "../config/business";
import { LegalField, If } from "../utils/render-field";
import { hasValue } from "../utils/render-field";
import { SEOHead, BreadcrumbJsonLd } from "@/seo";

/**
 * Aviso Legal — LSSI-CE (Ley 34/2002, art. 10)
 *
 * Los campos sin datos simplemente no se renderizan.
 * Sin placeholders, sin "[PENDIENTE]".
 */
const AvisoLegal = () => {
  const fullAddress = [
    BUSINESS.address.street,
    BUSINESS.address.postalCode,
    BUSINESS.address.city,
    BUSINESS.address.province,
    BUSINESS.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  const contactEmail = BUSINESS.privacyEmail || BUSINESS.email;

  return (
    <>
      <SEOHead
        title="Aviso Legal"
        description="Aviso Legal y condiciones generales de uso del sitio web de Alejandro Villanova. Datos de identificación del titular según LSSI-CE."
        canonicalUrl="https://alejandrovillanova.com/aviso-legal"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://alejandrovillanova.com" },
          { name: "Aviso Legal", url: "https://alejandrovillanova.com/aviso-legal" },
        ]}
      />
      <LegalLayout title="Aviso Legal">
      <h2>1. Identificación del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y Comercio Electrónico
        (LSSI-CE), se informa de los siguientes datos de identificación del
        titular del sitio web:
      </p>
      <ul>
        <LegalField label="Titular" value={BUSINESS.legalName} />
        <LegalField label="NIF" value={BUSINESS.taxId} />
        <If condition={BUSINESS.registry.registered && hasValue(BUSINESS.registry.text)}>
          <li>
            <strong>Datos registrales:</strong> {BUSINESS.registry.text}
          </li>
        </If>
        <LegalField label="Dirección" value={fullAddress} />
        <LegalField label="Correo electrónico" value={contactEmail} />
        <If condition={hasValue(BUSINESS.phone)}>
          <li>
            <strong>Teléfono:</strong> {BUSINESS.phone}
          </li>
        </If>
        <If condition={hasValue(BUSINESS.activity)}>
          <li>
            <strong>Actividad:</strong> {BUSINESS.activity}
          </li>
        </If>
      </ul>

      <h2>2. Condiciones generales de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e
        implica la aceptación plena y sin reservas de todas las disposiciones
        incluidas en este Aviso Legal, en la versión publicada en el momento
        en que el usuario acceda al mismo.
      </p>
      <p>
        El titular se reserva el derecho de modificar, en cualquier momento y
        sin aviso previo, la presentación, configuración y contenidos del
        sitio web, así como las condiciones de uso aquí recogidas.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web —textos, imágenes, logotipos,
        código fuente, diseño gráfico, animaciones, estructura de navegación y
        cualquier otro elemento susceptible de protección— son propiedad
        exclusiva del titular o de terceros que han autorizado su uso, y están
        protegidos por la legislación española e internacional sobre propiedad
        intelectual e industrial.
      </p>
      <p>
        Queda expresamente prohibida la reproducción, distribución,
        comunicación pública, transformación o cualquier otra forma de
        explotación de los contenidos sin la autorización expresa y por
        escrito del titular.
      </p>

      <h2>4. Responsabilidad</h2>
      <p>
        El titular no garantiza la inexistencia de errores en el acceso al
        sitio web ni en su contenido, aunque se esforzará por evitarlos y
        subsanarlos en cuanto tenga constancia de los mismos.
      </p>
      <p>
        El titular no se hace responsable de los contenidos, productos o
        servicios que puedan visualizarse a través de enlaces a sitios web de
        terceros.
      </p>

      <h2>5. Ley aplicable y jurisdicción</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para
        la resolución de cualquier conflicto, las partes se someten a los
        juzgados y tribunales del domicilio del titular, siempre que la
        normativa aplicable lo permita. Si el usuario tiene la condición de
        consumidor, será de aplicación el fuero que corresponda según la
        legislación vigente.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con este Aviso Legal, puedes
        contactar a través del correo electrónico indicado en el apartado 1.
      </p>
    </LegalLayout>
    </>
  );
};

export default AvisoLegal;
