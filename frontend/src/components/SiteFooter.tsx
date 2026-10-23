import Image from "next/image";
import { getProducts, getSite } from "@/content";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/Link";
import { messages } from "@/i18n/messages";

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;

export function SiteFooter({ locale }: { locale: Locale }) {
  const { company, navItems } = getSite(locale);
  const { categories } = getProducts(locale);
  const m = messages[locale];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="brand" aria-label={company.name}>
              <Image src="/images/logo.png" alt="" width={236} height={180} className="brand__logo" />
              <span className="brand__text">
                <span className="brand__name">{m.header.brandTop}</span>
                <span className="label label--gold">{m.header.brandBottom}</span>
              </span>
            </Link>
            <p className="muted">{company.slogan}.</p>
          </div>
          <nav className="footer__col" aria-label={m.footer.quickLinks}>
            <span className="label label--gold">{m.footer.explore}</span>
            {navItems.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <nav className="footer__col" aria-label={m.footer.productCategories}>
            <span className="label label--gold">{m.footer.products}</span>
            {categories.map((c) => (
              <Link key={c.id} href={`/products?loai=${c.id}#danh-sach`}>
                {c.label}
              </Link>
            ))}
          </nav>
          <div className="footer__col">
            <span className="label label--gold">{m.footer.contact}</span>
            <a href={tel(company.hotline)}>{m.footer.hotline(company.hotline)}</a>
            <a href={tel(company.phone)}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span className="muted">{company.address}</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="muted">{m.footer.legal(new Date().getFullYear(), company.legalName, company.taxCode)}</span>
          <a className="label" href={company.website} target="_blank" rel="noopener noreferrer">
            www.phuanlift.com
          </a>
        </div>
      </div>
    </footer>
  );
}
