import { notFound } from "next/navigation";

/** Any path that matches no page renders the localized 404 inside the layout. */
export default function CatchAll() {
  notFound();
}
