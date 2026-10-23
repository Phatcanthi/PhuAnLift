// Locale-aware access to the catalogue content. The Vietnamese files are the reference shape; the English
// files must match it (the return types below fail the build when they drift apart).

import type { Locale } from "@/i18n/config";
import * as enProducts from "./en/products";
import * as enProjects from "./en/projects";
import * as enSite from "./en/site";
import * as viProducts from "./vi/products";
import * as viProjects from "./vi/projects";
import * as viSite from "./vi/site";

export type { CategoryId, Faq, Product, Project, Spec } from "./types";

export const getSite = (locale: Locale): typeof viSite => (locale === "en" ? enSite : viSite);
export const getProducts = (locale: Locale): typeof viProducts => (locale === "en" ? enProducts : viProducts);
export const getProjects = (locale: Locale): typeof viProjects => (locale === "en" ? enProjects : viProjects);
