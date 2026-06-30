/**
 * Botón reutilizable para reabrir el banner de cookies.
 * Se usa en el footer y en la página de política de cookies.
 *
 * Uso: <CookieSettings /> o <CookieSettings className="..." />
 */

interface CookieSettingsProps {
  className?: string;
}

const CookieSettings = ({ className = "" }: CookieSettingsProps) => {
  const open = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <button
      onClick={open}
      type="button"
      className={`cursor-pointer bg-transparent border-none p-0 font-[inherit] hover:text-accent transition-colors ${className}`}
    >
      Configurar cookies
    </button>
  );
};

export default CookieSettings;
