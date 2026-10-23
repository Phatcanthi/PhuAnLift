// English version of ../vi/projects.ts, translated from the owner's project list and FAQ on
// https://www.phuanlift.com. Project names and figures are unchanged; nothing has been added.

import type { Faq, Project } from "../types";

const IMG = "/images/projects";

export const projects: Project[] = [
  {
    slug: "benh-vien-nhi-quang-ngai",
    name: "Quang Ngai Children's Hospital",
    image: `${IMG}/benh-vien-nhi-quang-ngai.jpg`,
    facts: [
      { label: "Type", value: "Freight elevator" },
      { label: "Capacity", value: "300 kg" },
      { label: "Stops", value: "5" },
    ],
  },
  {
    slug: "saigon-precision-kcx-linh-trung",
    name: "Saigon Precision, Linh Trung Export Processing Zone",
    image: `${IMG}/saigon-precision.jpg`,
    facts: [{ label: "Capacity", value: "5000 kg" }],
  },
  {
    slug: "maple-nha-trang",
    name: "Maple Nha Trang",
    image: `${IMG}/maple-nha-trang.jpg`,
    facts: [
      { label: "Capacity", value: "450 kg" },
      { label: "Stops", value: "27" },
    ],
  },
  {
    slug: "nha-may-coca-cola",
    name: "Coca-Cola Factory",
    image: `${IMG}/coca-cola.jpg`,
    facts: [],
  },
];

export const faqs: Faq[] = [
  {
    q: "How is an elevator maintained, and how often?",
    a: "To ensure safety and performance, an elevator needs regular maintenance. It is usually serviced every 6 months or every year, depending on how heavily it is used and on the manufacturer's requirements.",
  },
  {
    q: "Can an elevator be installed in an old building?",
    a: "Yes. Modern elevators can be designed and installed flexibly to fit older buildings, even in confined spaces. Manufacturers usually offer customised solutions to meet the needs of each project.",
  },
  {
    q: "Is an elevator safe during a power failure?",
    a: "Most modern elevators have a backup system, such as a backup battery or an automatic generator, to keep passengers safe during a power failure. This safety system brings the elevator to the nearest safe floor and opens the door so passengers can leave safely.",
  },
  {
    q: "How do elevators save energy?",
    a: "Modern elevator technology includes energy-saving features such as systems that reuse energy when the load is adjusted, energy-efficient LED lighting, and timers that reduce energy use when the elevator is idle.",
  },
  {
    q: "Can an elevator be customised for people with disabilities?",
    a: "Yes. Elevator manufacturers usually offer customised solutions such as larger cabins, easy-to-use control buttons and sensor systems that serve people with disabilities better.",
  },
  {
    q: "How can elevators integrate with smart technology?",
    a: "Today's elevators can often integrate with smart technology such as voice control, remote management through a mobile app, and artificial intelligence that optimises performance and predicts faults early.",
  },
];
