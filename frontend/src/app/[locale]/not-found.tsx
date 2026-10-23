"use client";

import type { CSSProperties } from "react";
import { Link } from "@/i18n/Link";
import { useMessages } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const m = useMessages().notFound;
  return (
    <main className="wrap notfound">
      <span className="notfound__code enter">404</span>
      <h1 className="enter" style={{ "--i": 1 } as CSSProperties}>
        {m.title}
      </h1>
      <p className="lead enter" style={{ "--i": 2 } as CSSProperties}>
        {m.text}
      </p>
      <div className="hero__actions enter" style={{ "--i": 3 } as CSSProperties}>
        <Link className="btn btn--solid" href="/products">
          {m.viewProducts} <span aria-hidden="true">→</span>
        </Link>
        <Link className="btn btn--ghost" href="/">
          {m.backHome}
        </Link>
      </div>
    </main>
  );
}
