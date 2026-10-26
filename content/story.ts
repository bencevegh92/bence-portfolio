// The seven-stage "how I work" narrative. Stage 0 is the hero itself; stages
// 1–6 are the steps. The illustrated app ("Tandem") is fictional.

export type Stage = { title: string; body: string; tags: string[] };

export const opening = "I turn ideas into real products.";

export const stages: Stage[] = [
  {
    title: "Understand the problem",
    body: "Every feature starts with people and constraints: who uses it, what they need and what can’t change. I ask in refinement, not after release.",
    tags: ["Users", "Needs", "Constraints"],
  },
  {
    title: "Plan the solution",
    body: "Routes, state, components and API contracts mapped out, with estimates the team can rely on. Shared pieces get built once.",
    tags: ["Architecture", "Estimates", "Reuse"],
  },
  {
    title: "Design a great user experience",
    body: "I work closely with designers, from wireframe to polished interface, grounded in design tokens and a component library.",
    tags: ["Design tokens", "Components", "Figma"],
  },
  {
    title: "Turn designs into a working product",
    body: "Typed, reactive components wired to real APIs — Signals and RxJS where they fit — in a codebase the next developer can extend.",
    tags: ["TypeScript", "Signals", "REST APIs"],
  },
  {
    title: "Ensure a high-quality product",
    body: "Keyboard paths, focus, screen reader labels, responsive layouts, tests and code review — before release, not after.",
    tags: ["WCAG 2.1 AA", "Testing", "Code review"],
  },
  {
    title: "Production ready. Real impact.",
    body: "Released, documented and maintainable: ready for real users, the next feature and the next person on the team.",
    tags: ["Release", "Documentation", "Maintainability"],
  },
];
