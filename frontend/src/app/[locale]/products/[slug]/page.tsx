import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RevealObserver } from "@/components/RevealObserver";
import { ProductAR } from "@/components/products/ProductAR";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { getProducts, getSite } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { Link } from "@/i18n/Link";
import { messages } from "@/i18n/messages";

type Props = { params: Promise<{ locale: string; slug: string }> };

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;
const order = (i: number) => ({ "--i": i }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return locales.flatMap((locale) => getProducts(locale).products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProducts(locale).getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale];
  const d = m.detail;
  const { categoryLabel, categories, getProduct, products, relatedProducts } = getProducts(locale);
  const { cabinNote, cabins, company, wellFrames } = getSite(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const at = products.indexOf(product);
  const prev = products[(at - 1 + products.length) % products.length];
  const next = products[(at + 1) % products.length];

  return (
    <>
      <RevealObserver />
      <main>
        <section className="pdetail">
          <div className="phero__glow" aria-hidden="true" />
          <div className="wrap">
            <nav className="crumbs label" aria-label={d.crumbsLabel}>
              <Link href="/">{m.common.home}</Link>
              <span aria-hidden="true">/</span>
              <Link href="/products">{m.common.products}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/products?loai=${product.category}#danh-sach`}>{categoryLabel(product.category)}</Link>
            </nav>

            <div className="pdetail__grid">
              <div className="pdetail__media enter" style={order(1)}>
                <ProductGallery images={product.images} alt={product.name} />
              </div>

              <div className="pdetail__info">
                <span className="label label--gold rule enter" style={order(1)}>
                  {pad(at + 1)} · {product.altName}
                </span>
                <h1 className="pdetail__title">
                  <span className="mask">
                    <span>{product.name}</span>
                  </span>
                </h1>
                <p className="lead enter" style={order(3)}>
                  {product.tagline}
                </p>
                <dl className="pdetail__highlights enter" style={order(4)}>
                  {product.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="label">{h.label}</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
                {product.doors && (
                  <div className="enter" style={order(5)}>
                    <p className="label">{m.common.doorTypes}</p>
                    <ul className="tags">
                      {product.doors.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="hero__actions enter" style={order(6)}>
                  <a className="btn btn--solid" href={tel(company.hotline)}>
                    {d.getQuote} <span aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn--ghost" href={company.zalo} target="_blank" rel="noopener noreferrer">
                    {d.zalo}
                  </a>
                </div>
                <p className="pdetail__note enter" style={order(7)}>
                  {d.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {product.ar && (
          <section className="section">
            <div className="wrap">
              <header className="section__head" data-reveal>
                <div>
                  <span className="label label--gold rule">{d.arLabel}</span>
                  <h2>{d.arTitle}</h2>
                </div>
                <p className="muted">{d.arText}</p>
              </header>
              <ProductAR src={product.ar.glb} alt={product.ar.alt} />
            </div>
          </section>
        )}

        <section className="section section--low">
          <div className="wrap split split--top">
            <div className="split__text" data-reveal="cascade">
              <span className="label label--gold rule">{d.overviewLabel}</span>
              <h2>{d.overviewTitle}</h2>
              {product.summary.filter(Boolean).map((p) => (
                <p key={p} className="muted pdetail__summary">
                  {p}
                </p>
              ))}
              <div>
                <p className="label">{d.suitableFor}</p>
                <ul className="tags">
                  {product.applications.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
            <ol className="features" data-reveal="stagger">
              {product.features.map((f, i) => (
                <li key={f} style={order(i)} data-spotlight>
                  <span className="features__num">{pad(i + 1)}</span>
                  <p>{f}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <div>
                <span className="label label--gold rule">{d.specsLabel}</span>
                <h2>{d.specsTitle}</h2>
              </div>
              <p className="muted">{d.specsNote}</p>
            </header>
            <dl className="spectable" data-reveal="stagger">
              {product.specs.map((s, i) => (
                <div key={s.label} style={order(i)}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {product.category === "gia-dinh" && (
          <section className="section section--low">
            <div className="wrap">
              <header className="section__head" data-reveal>
                <div>
                  <span className="label label--gold rule">{d.finishLabel}</span>
                  <h2>{d.finishTitle}</h2>
                </div>
                <p className="muted">{d.finishNote}</p>
              </header>
              <ul className="finishes" data-reveal="stagger">
                {wellFrames.colors.map((c, i) => (
                  <li key={c.name} style={order(i)}>
                    <span style={{ background: c.css }} aria-hidden="true" />
                    <span className="label">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {product.cabins && (
          <section className="section">
            <div className="wrap">
              <header className="section__head" data-reveal>
                <div>
                  <span className="label label--gold rule">{d.cabinsLabel}</span>
                  <h2>{d.cabinsTitle}</h2>
                </div>
                <p className="muted">{cabinNote}</p>
              </header>
              <ul className="cards cards--cabins cards--six" data-reveal="stagger">
                {cabins.map((c, i) => (
                  <li key={c.code} className="card" style={order(i)} data-spotlight>
                    <div className="card__photo card__photo--tall">
                      <Image src={c.image} alt={m.home.cabinAlt(c.code, c.name)} width={500} height={900} sizes="(max-width: 760px) 50vw, 16vw" />
                      <span className="chip chip--tl">{c.code}</span>
                    </div>
                    <div className="card__body">
                      <h3>{c.name}</h3>
                      <span className="label">{c.level}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="section section--low">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <div>
                <span className="label label--gold rule">{d.moreLabel}</span>
                <h2>{d.relatedTitle}</h2>
              </div>
              <Link className="arrow-link" href="/products">
                {d.allProducts} <span aria-hidden="true">→</span>
              </Link>
            </header>
            <div className="pgrid" data-reveal="stagger">
              {relatedProducts(product).map((p, i) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  index={products.indexOf(p)}
                  categoryLabel={categoryLabel(p.category)}
                  style={order(i)}
                />
              ))}
            </div>

            <nav className="pager" aria-label={d.pagerLabel}>
              <Link href={`/products/${prev.slug}`} className="pager__link" data-spotlight>
                <span className="label">← {m.common.previousProduct}</span>
                <span className="pager__name">{prev.name}</span>
              </Link>
              <Link href={`/products/${next.slug}`} className="pager__link pager__link--next" data-spotlight>
                <span className="label">{m.common.nextProduct} →</span>
                <span className="pager__name">{next.name}</span>
              </Link>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
