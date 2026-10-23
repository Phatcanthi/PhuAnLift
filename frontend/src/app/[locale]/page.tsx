import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CompanyMap } from "@/components/CompanyMap";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { ProductRail } from "@/components/products/ProductRail";
import { RevealObserver } from "@/components/RevealObserver";
import { getProducts, getSite } from "@/content";
import { isLocale } from "@/i18n/config";
import { Link } from "@/i18n/Link";
import { messages } from "@/i18n/messages";

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;
/** Stagger index for `data-reveal` children (read by the CSS as a transition delay). */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

function TechIcon({ name }: { name: string }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.2 };
  switch (name) {
    case "controller":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 4v16M12 4v16M18 4v16" />
          <circle cx="6" cy="9" r="2" />
          <circle cx="12" cy="15" r="2" />
          <circle cx="18" cy="8" r="2" />
        </svg>
      );
    case "motor":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        </svg>
      );
    case "door":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" />
          <path d="M12 3v18M9 12h-2M15 12h2" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 21c-5 0-8-3.5-8-8 5 0 8 2 8 8Zm0 0c5 0 8-3.5 8-8-5 0-8 2-8 8Z" />
          <path d="M12 21V8M12 8c0-3 1.5-4.5 3-5" />
        </svg>
      );
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale].home;
  const common = messages[locale].common;
  const { about, cabinNote, cabins, company, hero, productLines, services, stats, technology, wellFrames } = getSite(locale);
  const { products, categories } = getProducts(locale);

  const staticHero = (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__content">
          <Image
            src="/images/catalogue/elite-logo.png"
            alt={company.brand}
            width={172}
            height={172}
            className="hero__brand"
            priority
          />
          <span className="badge">
            <i aria-hidden="true" />
            {hero.badge}
          </span>
          <h1>
            {hero.title[0]}
            <br />
            {hero.title[1]}
            <em>{hero.accent}</em>
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#products">
              {m.exploreProducts} <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href="#contact">
              {common.bookSurvey}
            </a>
          </div>
        </div>
        <div className="hero__photo">
          <Image src={hero.image} alt={m.heroPhotoAlt} width={1024} height={1024} priority />
        </div>
      </div>
    </section>
  );

  return (
    <>
      <RevealObserver />

      <main>
        <HeroExperience
          fallback={staticHero}
          content={{ brand: company.brand, hero, technology: technology.items }}
        />

        <section className="statsbar">
          <div className="wrap">
            <dl className="stats" data-reveal>
              {stats.map((s, i) => (
                <div key={s.label} style={order(i)}>
                  <dt>
                    <span className="stats__value" data-count={s.value}>
                      {s.value}
                    </span>
                    <span className="label">{s.label}</span>
                  </dt>
                  <dd>{s.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* decorative: the same range is listed in the About section; rendered twice so the loop has no gap */}
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee__track">
              {about.range.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ))}
        </div>

        <section id="about" className="section">
          <div className="wrap split">
            <div className="split__media" data-reveal="image" data-parallax>
              <Image src={about.image} alt={m.aboutImageAlt} width={950} height={1150} />
            </div>
            <div className="split__text" data-reveal="cascade">
              <span className="label label--gold rule">{m.profile}</span>
              <h2>{company.legalName}</h2>
              {about.paragraphs.map((p) => (
                <p key={p} className="muted">
                  {p}
                </p>
              ))}
              <p className="label">{m.range}</p>
              <ul className="tags">
                {about.range.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="muted lifecycle">{m.lifecycle(about.lifecycle.join(" · "))}</p>
              <span className="label">{m.taxLine(company.legalNameEn, company.taxCode)}</span>
            </div>
          </div>
        </section>

        <section id="technology" className="section section--low">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <div>
                <span className="label label--gold rule">{m.techLabel}</span>
                <h2>
                  {m.techTitle[0]}
                  <br />
                  {m.techTitle[1]}
                </h2>
              </div>
              <p className="muted">{m.techSub}</p>
            </header>
            <div className="tech">
              <ul className="tech__list" data-reveal="stagger">
                {technology.items.map((t, i) => (
                  <li key={t.title} className="card card--pad" style={order(i)} data-spotlight>
                    <span className="tech__icon">
                      <TechIcon name={t.icon} />
                    </span>
                    <h3>{t.title}</h3>
                    <p className="muted">{t.text}</p>
                  </li>
                ))}
              </ul>
              <div className="tech__media" data-reveal="image" data-parallax>
                <Image src={technology.image} alt={m.techImageAlt} width={950} height={1150} />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <div>
                <span className="label label--gold rule">{m.productsLabel}</span>
                <h2>{m.productsTitle}</h2>
              </div>
              <div className="section__aside">
                <p className="muted">{m.productsSub}</p>
                <Link className="arrow-link" href="/products">
                  {m.viewAllProducts} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </header>
            <div className="lines">
              {productLines.map((p, i) => (
                <article key={p.id} className={`line${i % 2 ? " line--flip" : ""}`}>
                  <div className="line__media" data-reveal="image" data-parallax>
                    <Image src={p.image} alt={p.title} width={950} height={1150} />
                    <span className="chip chip--tl">{p.tag}</span>
                  </div>
                  <div className="line__body" data-reveal="cascade">
                    <span className="line__index label">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="line__title">{p.title}</h3>
                    {"bullets" in p && p.bullets && (
                      <ul className="bullets">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {"paragraphs" in p &&
                      p.paragraphs?.map((t) => (
                        <p key={t} className="muted">
                          {t}
                        </p>
                      ))}
                    {"specs" in p && p.specs && (
                      <dl className="specs">
                        {p.specs.map((s) => (
                          <div key={s.label}>
                            <dt className="label">{s.label}</dt>
                            <dd>{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {"chips" in p && p.chips && (
                      <div>
                        <p className="label">{common.doorTypes}</p>
                        <ul className="tags">
                          {p.chips.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {"note" in p && p.note && <p className="muted">{p.note}</p>}
                    <Link className="btn btn--ghost line__cta" href={`/products/${p.slug}`}>
                      {m.viewProduct} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}

              <article className="line line--flip">
                <div className="line__media" data-reveal="image" data-parallax>
                  <Image src={wellFrames.image} alt={m.wellImageAlt} width={950} height={1150} />
                  <span className="chip chip--tl">{m.wellChip}</span>
                </div>
                <div className="line__body" data-reveal="cascade">
                  <span className="line__index label">{String(productLines.length + 1).padStart(2, "0")}</span>
                  <h3 className="line__title">{m.wellTitle}</h3>
                  <div>
                    <p className="label label--gold">{m.wellSteel}</p>
                    <p className="muted">{wellFrames.steel}</p>
                  </div>
                  <div>
                    <p className="label label--gold">{m.wellAluminum}</p>
                    <p className="muted">{wellFrames.aluminum}</p>
                  </div>
                  <div>
                    <p className="label">{m.wellPaint}</p>
                    <ul className="swatches">
                      {wellFrames.colors.map((c) => (
                        <li key={c.name}>
                          <span style={{ background: c.css }} aria-hidden="true" />
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            <div className="catalog">
              <header className="section__head" data-reveal>
                <div>
                  <span className="label label--gold rule">{m.catalogLabel}</span>
                  <h2>{m.catalogTitle}</h2>
                </div>
                <Link className="btn btn--outline" href="/products">
                  {m.viewCount(products.length)} <span aria-hidden="true">→</span>
                </Link>
              </header>
              <div data-reveal>
                <ProductRail products={products} categories={categories} />
              </div>
            </div>
          </div>
        </section>

        <section id="cabins" className="section section--low">
          <div className="wrap">
            <header className="section__head" data-reveal>
              <div>
                <span className="label label--gold rule">{m.cabinsLabel}</span>
                <h2>{m.cabinsTitle}</h2>
              </div>
              <p className="muted">{m.cabinsSub}</p>
            </header>
            <ul className="cards cards--cabins" data-reveal="stagger">
              {cabins.map((c, i) => (
                <li key={c.code} className="card" style={order(i)} data-spotlight>
                  <div className="card__photo card__photo--tall">
                    <Image src={c.image} alt={m.cabinAlt(c.code, c.name)} width={500} height={900} />
                    <span className="chip chip--tl">{c.code}</span>
                    <span className="chip chip--br">{c.level}</span>
                  </div>
                  <div className="card__body">
                    <h3>{c.name}</h3>
                    <p className="muted">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="muted cabin-note">{cabinNote}</p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="wrap split split--wide">
            <div className="split__media split__media--short" data-reveal="image">
              <Image src={services.image} alt={m.servicesImageAlt} width={370} height={900} />
            </div>
            <div className="split__text" data-reveal>
              <span className="label label--gold rule">{m.servicesLabel}</span>
              <h2>
                {m.servicesTitle[0]}
                <br />
                {m.servicesTitle[1]}
              </h2>
              <ol className="steps" data-reveal="stagger">
                {services.items.map((s, i) => (
                  <li key={s.title} style={order(i)}>
                    <span className="label label--gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="contact" className="section section--low">
          <div className="wrap">
            <div className="panel cta" data-reveal>
              <span className="label label--gold">{m.contactLabel}</span>
              <h2>{m.contactTitle}</h2>
              <p className="muted">{company.slogan}.</p>
              <dl className="contact">
                <div>
                  <dt className="label">{m.hotline}</dt>
                  <dd>
                    <a href={tel(company.hotline)}>{company.hotline}</a>
                  </dd>
                </div>
                <div>
                  <dt className="label">{m.phone}</dt>
                  <dd>
                    <a href={tel(company.phone)}>{company.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="label">{m.email}</dt>
                  <dd>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="label">{m.address}</dt>
                  <dd>{company.address}</dd>
                </div>
              </dl>
              <CompanyMap locale={locale} address={company.address} />
              <div className="hero__actions">
                <a className="btn btn--solid" href={tel(company.hotline)}>
                  {m.callUs}
                </a>
                <a className="btn btn--ghost" href={company.zalo} target="_blank" rel="noopener noreferrer">
                  Zalo
                </a>
                <a className="btn btn--ghost" href={company.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
