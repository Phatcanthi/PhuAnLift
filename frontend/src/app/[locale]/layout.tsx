import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { ScrollFx } from "@/components/ScrollFx";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSite } from "@/content";
import { isLocale, locales } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { messages } from "@/i18n/messages";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-head-next",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-body-next",
  display: "swap",
});

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { siteName, description } = messages[locale].meta;
  return { title: { default: siteName, template: `%s | ${siteName}` }, description };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { company, navItems } = getSite(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${jakarta.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <SiteHeader navItems={navItems} hotline={company.hotline} name={company.name} />
          {children}
          <SiteFooter locale={locale} />
          <ScrollFx />
        </LocaleProvider>
      </body>
    </html>
  );
}
