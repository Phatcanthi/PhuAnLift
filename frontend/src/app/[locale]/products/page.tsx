import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { RevealObserver } from "@/components/RevealObserver";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { getProducts, getSite } from "@/content";
import { isLocale } from "@/i18n/config";
import { Link } from "@/i18n/Link";
import { messages } from "@/i18n/messages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description } = messages[locale].productsPage;
  return { title, description };
}

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale];
  const { categories, products } = getProducts(locale);
  const { company } = getSite(locale);

  return (
    <>
      <RevealObserver />
      <main>
        <section className="phero">
          <div className="phero__glow" aria-hidden="true" />
          <span className="phero__ghost" aria-hidden="true">
            {m.productsPage.ghost}
          </span>
          <div className="wrap phero__inner">
            <nav className="crumbs label" aria-label="Breadcrumb">
              <Link href="/">{m.common.home}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{m.common.products}</span>
            </nav>
            <h1 className="phero__title">
              <span className="mask">
                <span>{m.productsPage.heroLine1}</span>
              </span>
              <span className="mask" style={{ "--i": 1 } as CSSProperties}>
                <span>
                  <em>{m.productsPage.heroEm}</em>
                  {m.productsPage.heroRest}
                </span>
              </span>
            </h1>
            <p className="lead phero__lead">
              {m.productsPage.lead}
            </p>
            <ul className="phero__cats">
              {categories.map((c, i) => (
                <li key={c.id} style={{ "--i": i + 3 } as CSSProperties}>
                  <Link href={`/products?loai=${c.id}#danh-sach`} className="phero__cat">
                    <span className="phero__catcount">{String(products.filter((p) => p.category === c.id).length).padStart(2, "0")}</span>
                    <span>
                      <span className="label label--gold">{c.label}</span>
                      <span className="muted">{c.note}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="danh-sach" className="section browser">
          <div className="wrap">
            <ProductBrowser products={products} categories={categories} />
          </div>
        </section>

        <section className="section section--low">
          <div className="wrap">
            <div className="panel cta" data-reveal>
              <span className="label label--gold">{m.common.freeConsult}</span>
              <h2>{m.productsPage.ctaTitle}</h2>
              <p className="muted">{m.productsPage.ctaText}</p>
              <div className="hero__actions">
                <a className="btn btn--solid" href={tel(company.hotline)}>
                  {m.common.callHotline(company.hotline)} <span aria-hidden="true">→</span>
                </a>
                <Link className="btn btn--ghost" href="/#contact">
                  {m.common.bookSurvey}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
