"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Locale } from "./config";
import { messages, type Messages } from "./messages";

const LocaleContext = createContext<Locale>("vi");

/** Makes the active locale available to client components (server components get it from the route params). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
export const useMessages = (): Messages => messages[useContext(LocaleContext)];
