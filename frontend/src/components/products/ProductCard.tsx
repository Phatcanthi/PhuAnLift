"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Product } from "@/content";
import { Link } from "@/i18n/Link";
import { useMessages } from "@/i18n/LocaleProvider";

type Props = { product: Product; index: number; categoryLabel: string; style?: CSSProperties; sizes?: string };

export function ProductCard({
  product,
  index,
  categoryLabel,
  style,
  sizes = "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw",
}: Props) {
  const m = useMessages();
  return (
    <Link href={`/products/${product.slug}`} className="pcard" data-spotlight style={style}>
      <div className="pcard__media">
        <Image src={product.images[0]} alt={product.name} width={947} height={1136} sizes={sizes} />
        <span className="chip chip--tl">{categoryLabel}</span>
        <span className="pcard__num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="pcard__body">
        <span className="label">{product.altName}</span>
        <h3>{product.name}</h3>
        <p className="muted">{product.tagline}</p>
        <dl className="pcard__specs">
          {product.highlights.slice(0, 3).map((h) => (
            <div key={h.label}>
              <dt className="label">{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
        <span className="arrow-link">
          {m.common.viewDetails} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
