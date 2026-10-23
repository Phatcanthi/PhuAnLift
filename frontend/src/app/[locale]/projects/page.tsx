import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RevealObserver } from "@/components/RevealObserver";
import { getProjects, getSite } from "@/content";
import { isLocale } from "@/i18n/config";
import { Link } from "@/i18n/Link";
import { messages } from "@/i18n/messages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description } = messages[locale].projectsPage;
  return { title, description };
}

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale];
  const p = m.projectsPage;
  const { faqs, projects } = getProjects(locale);
  const { company } = getSite(locale);

  return (
    <>
      <RevealObserver />
      <main>
        <section className="phero">
          <div className="phero__glow" aria-hidden="true" />
          <span className="phero__ghost" aria-hidden="true">
            {p.ghost}
          </span>
          <div className="wrap phero__inner">
            <nav className="crumbs label" aria-label="Breadcrumb">
              <Link href="/">{m.common.home}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{m.common.projects}</span>
            </nav>
            <h1 className="phero__title">
              <span className="mask">
                <span>{p.heroLine1}</span>
              </span>
              <span className="mask" style={{ "--i": 1 } as CSSProperties}>
                <span>
                  {p.heroPre}
                  <em>{p.heroEm}</em>
                </span>
              </span>
            </h1>
            <p className="lead phero__lead">
              {p.lead}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <ul className="pgrid projects">
              {projects.map((project, i) => (
                <li key={project.slug} data-reveal style={{ "--i": i } as CSSProperties}>
                  <article className="pcard project">
                    <div className="project__media">
                      <Image src={project.image} alt={project.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    </div>
                    <div className="pcard__body">
                      <h2 className="project__title">{project.name}</h2>
                      {project.facts.length > 0 && (
                        <dl className="pcard__specs">
                          {project.facts.map((f) => (
                            <div key={f.label}>
                              <dt className="label">{f.label}</dt>
                              <dd>{f.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--low">
          <div className="wrap faq">
            <div className="faq__head" data-reveal>
              <span className="label label--gold">{p.faqLabel}</span>
              <h2>{p.faqTitle}</h2>
              <p className="muted">{p.faqText}</p>
            </div>
            <div className="faq__list" data-reveal>
              {faqs.map((f) => (
                <details key={f.q} className="faq__item">
                  <summary>{f.q}</summary>
                  <p className="muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="panel cta" data-reveal>
              <span className="label label--gold">{m.common.freeConsult}</span>
              <h2>{p.ctaTitle}</h2>
              <p className="muted">{p.ctaText}</p>
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
