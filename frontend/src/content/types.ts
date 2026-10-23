export type CategoryId = "gia-dinh" | "tai-khach" | "chuyen-dung" | "thang-cuon";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  /** The name in the other language, shown as a small label above the title. */
  altName: string;
  category: CategoryId;
  tagline: string;
  summary: string[];
  /** The first image is the cover. */
  images: string[];
  /** Three or four headline figures shown on cards and at the top of the detail page. */
  highlights: Spec[];
  features: string[];
  specs: Spec[];
  doors?: string[];
  /** 3D model (glTF binary, authored in metres) shown with an AR button on the detail page. */
  ar?: { glb: string; alt: string };
  /** Show the cabin interior styles (V01 – V11) on the detail page. */
  cabins?: boolean;
  applications: string[];
  /** True while the product still carries placeholder content (see the note in vi/products.ts). */
  draft: boolean;
};

export type Project = {
  slug: string;
  name: string;
  image: string;
  /** Figures that appear in the original project title. */
  facts: { label: string; value: string }[];
};

export type Faq = { q: string; a: string };
