"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import type { CategoryId, Product } from "@/content";
import { useMessages } from "@/i18n/LocaleProvider";
import { ProductCard } from "./ProductCard";

type Category = { id: CategoryId; label: string };
type Filter = CategoryId | "all";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

/**
 * Category tabs (with a sliding indicator) and a search box over the product grid. The chosen category lives
 * in `?loai=`, so it can be linked to (also from this page) and survives a reload. The prerendered HTML shows
 * every product; the URL is applied once the page is running in the browser.
 */
export function ProductBrowser({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <Suspense fallback={<Browser products={products} categories={categories} filter="all" />}>
      <BrowserFromUrl products={products} categories={categories} />
    </Suspense>
  );
}

function BrowserFromUrl({ products, categories }: { products: Product[]; categories: Category[] }) {
  const loai = useSearchParams().get("loai");
  const filter = categories.some((c) => c.id === loai) ? (loai as CategoryId) : "all";
  return <Browser products={products} categories={categories} filter={filter} />;
}

function Browser({ products, categories, filter }: { products: Product[]; categories: Category[]; filter: Filter }) {
  const m = useMessages().browser;
  const [query, setQuery] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);

  // Next.js keeps useSearchParams in sync with native history updates, without a server round trip. The state
  // must be null: passing Next's own history state marks the call as internal and skips the sync.
  const choose = (f: Filter) => {
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("loai");
    else url.searchParams.set("loai", f);
    window.history.replaceState(null, "", url);
  };

  // move the indicator under the active tab
  useLayoutEffect(() => {
    const tabs = tabsRef.current;
    const place = () => {
      const active = tabs?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!tabs || !active) return;
      tabs.style.setProperty("--ind-x", `${active.offsetLeft}px`);
      tabs.style.setProperty("--ind-w", `${active.offsetWidth}px`);
    };
    place();
    // tab widths change once the web font has loaded
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [filter]);

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter(
      (p) =>
        (filter === "all" || p.category === filter) &&
        (!q || normalize(`${p.name} ${p.altName} ${p.tagline} ${p.applications.join(" ")}`).includes(q)),
    );
  }, [products, filter, query]);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: m.all, count: products.length },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: products.filter((p) => p.category === c.id).length })),
  ];

  return (
    <>
      <div className="browser__bar">
        <div ref={tabsRef} className="tabs" role="tablist" aria-label={m.tabsLabel}>
          <span className="tabs__indicator" aria-hidden="true" />
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={filter === t.id}
              aria-controls="product-grid"
              onClick={() => choose(t.id)}
            >
              {t.label}
              <sup>{t.count}</sup>
            </button>
          ))}
        </div>
        <label className="search">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="m20 20-4-4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="sr-only">{m.searchLabel}</span>
          <input type="search" placeholder={m.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <p className="browser__count label" aria-live="polite">
        {m.count(shown.length, products.length)}
      </p>

      {shown.length > 0 ? (
        // keyed by the category so switching tabs replays the entrance stagger
        <div id="product-grid" key={filter} className="pgrid" role="tabpanel">
          {shown.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              index={products.indexOf(p)}
              categoryLabel={categories.find((c) => c.id === p.category)?.label ?? ""}
              style={{ "--i": Math.min(i, 8) } as CSSProperties}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>{m.emptyTitle}</h3>
          <p className="muted">{m.emptyText}</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setQuery("");
              choose("all");
            }}
          >
            {m.showAll}
          </button>
        </div>
      )}
    </>
  );
}
