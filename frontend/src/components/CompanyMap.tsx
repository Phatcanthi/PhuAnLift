import { companyShared as company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

const query = encodeURIComponent(company.mapQuery);
const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

export function CompanyMap({ locale, address }: { locale: Locale; address: string }) {
  const m = messages[locale].map;
  return (
    <div className="map">
      <iframe
        className="map__frame"
        title={m.title(address)}
        src={`https://www.google.com/maps?q=${query}&hl=${locale}&z=17&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a className="btn btn--ghost" href={directionsHref} target="_blank" rel="noopener noreferrer">
        {m.open} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
