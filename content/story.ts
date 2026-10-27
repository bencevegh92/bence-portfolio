// The seven-stage "how I work" walkthrough shown beside the hero. The
// illustrated app ("Tandem") is fictional.

export type Stage = { short: string; title: string; body: string };

export const opening = "I turn ideas into real products.";

export const stages: Stage[] = [
  {
    short: "Idea",
    title: "Start with an idea",
    body: "A rough idea is enough to begin. The steps that follow turn it into something people can actually use.",
  },
  {
    short: "Understand",
    title: "Understand the problem",
    body: "Every feature starts with people and constraints: who uses it, what they need and what can’t change. I ask in refinement, not after release.",
  },
  {
    short: "Plan",
    title: "Plan the solution",
    body: "Routes, state, components and API contracts mapped out, with estimates the team can rely on. Shared pieces get built once.",
  },
  {
    short: "Design",
    title: "Design a great user experience",
    body: "I work closely with designers, from wireframe to polished interface, grounded in design tokens and a component library.",
  },
  {
    short: "Build",
    title: "Turn designs into a working product",
    body: "Typed, reactive components wired to real APIs — Signals and RxJS where they fit — in a codebase the next developer can extend.",
  },
  {
    short: "Quality",
    title: "Ensure a high-quality product",
    body: "Keyboard paths, focus, screen reader labels, responsive layouts, tests and code review — before release, not after.",
  },
  {
    short: "Launch",
    title: "Production ready. Real impact.",
    body: "Released, documented and maintainable: ready for real users, the next feature and the next person on the team.",
  },
];
