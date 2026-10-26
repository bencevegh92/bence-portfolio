// Public profile facts. Source of truth: the owner's private CV (never shipped).
// Rewritten for the web; do not add claims that are not backed by the CV.

export const profile = {
  name: "Bence Végh",
  role: "Frontend Engineer",
  location: "Based in Hungary, open to remote roles",
  summary:
    "I’m a frontend engineer with 6+ years of building large-scale web applications — mostly in Angular and TypeScript, with hands-on React. I care about reusable UI, maintainable architecture and accessible products people enjoy using.",
  proof: [
    "Large-scale Angular applications, from media CMS platforms to education products",
    "Shared design systems and component libraries, reused across many apps",
    "Accessibility work to WCAG 2.1 AA, tested with keyboard and screen reader",
  ],
} as const;

// Contact links are published only after the owner approves them.
// Set a value to render the link in the header CTA and contact section.
export const contact: { email?: string; linkedin?: string } = {};

export type Role = {
  period: string;
  title: string;
  company: string;
  context: string;
  workMode: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    period: "2025 – 2026",
    title: "Software Engineer",
    company: "Gábor Dénes University – MIT",
    context: "AI-powered education platform for teachers, students and parents",
    workMode: "Remote",
    highlights: [
      "Built web applications in Angular and React for an AI-powered education platform.",
      "Designed and maintained the shared design system and UI library behind its frontends.",
      "Built and evolved the Nx monorepo that hosts multiple frontend projects.",
      "Helped rewrite the Teacher application from Angular to React under a tight deadline.",
    ],
    stack: ["Angular", "React", "TypeScript", "Signals", "RxJS", "Nx", "Design systems"],
  },
  {
    period: "2021 – 2025",
    title: "Software Engineer",
    company: "Trendency Online",
    context: "Large-scale media platforms, CMS and content portals",
    workMode: "Remote",
    highlights: [
      "Developed and maintained large Angular CMS and media portal applications.",
      "Built reusable features — galleries, carousels, calendars, org charts, authentication — and contributed to a Storybook-documented component library used across many portals.",
      "Delivered accessibility to WCAG 2.1 AA: keyboard navigation, focus management, ARIA and NVDA testing.",
      "Took part in Angular migrations, code reviews, estimation and refinement, and mentored a junior developer.",
    ],
    stack: ["Angular", "TypeScript", "RxJS", "Storybook", "Angular Material", "NG-ZORRO", "Tailwind CSS", "REST APIs"],
  },
  {
    period: "2021 – 2022",
    title: "Software Engineer",
    company: "GriffSoft Informatics",
    context: "Healthcare application",
    workMode: "On-site",
    highlights: [
      "Built new frontend features and maintained existing functionality in an Angular healthcare product.",
      "Worked closely with designers on usability and design guidelines, and took part in production releases.",
    ],
    stack: ["Angular", "RxJS", "JavaScript", "SASS"],
  },
  {
    period: "2019 – 2020",
    title: "Junior Software Engineer",
    company: "EPAM Systems",
    context: "Hotels.com, travel and hospitality",
    workMode: "On-site",
    highlights: [
      "Implemented features, fixed bugs and supported production releases.",
      "Worked directly with the client to understand and address their needs.",
    ],
    stack: ["JavaScript", "jQuery", "SASS", "Soy templates"],
  },
];

export const learning = [
  "Angular Development certificate, Codecool (company-sponsored)",
  "React mentoring program at EPAM: React, Redux, Jest, routing and SSR",
  "Business Information Technology, University of Szeged",
];

export const strengths = [
  {
    title: "Reusable UI at scale",
    body: "Design systems, component libraries and monorepos that let several teams ship consistent interfaces without rebuilding the basics.",
    evidence: "Design system and Nx monorepo for an education platform; Storybook library across media portals.",
  },
  {
    title: "Modernization without drama",
    body: "Moving real products forward while they stay in use — framework upgrades, new reactive patterns and full rewrites.",
    evidence: "Angular version migrations; an Angular-to-React rewrite under a tight deadline.",
  },
  {
    title: "Accessibility built in",
    body: "Keyboard paths, focus management and ARIA treated as part of the feature, checked with a real screen reader.",
    evidence: "WCAG 2.1 AA work on media platforms, tested with NVDA.",
  },
  {
    title: "A dependable teammate",
    body: "Clear communication with designers, backend developers and clients, plus the review and planning work that keeps a team moving.",
    evidence: "Code reviews, estimation, refinement and mentoring a junior developer.",
  },
] as const;

export const skillGroups = [
  { name: "Core", items: ["Angular", "React", "TypeScript", "JavaScript (ES6+)", "RxJS", "Angular Signals", "HTML", "CSS / SCSS"] },
  { name: "UI & architecture", items: ["Design systems", "Component libraries", "Storybook", "Nx monorepos", "Angular Material", "NG-ZORRO", "Tailwind CSS", "Responsive design"] },
  { name: "Quality & delivery", items: ["Accessibility (WCAG 2.1 AA)", "Jest", "REST APIs", "Git", "Docker", "Figma"] },
  { name: "Ways of working", items: ["AI-assisted and agentic development", "Code review", "Mentoring", "Now learning Node.js"] },
] as const;
