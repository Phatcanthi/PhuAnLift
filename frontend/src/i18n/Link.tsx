"use client";

import type { ComponentProps } from "react";
import NextLink from "next/link";
import { localizedPath } from "./config";
import { useLocale } from "./LocaleProvider";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/** `next/link` for internal routes: the href is written without a locale and prefixed for the current one. */
export function Link({ href, ...props }: Props) {
  return <NextLink href={localizedPath(useLocale(), href)} {...props} />;
}
