import type { Project } from "./projects";

// Public profile facts. Sources: the owner's private CV (never shipped) and
// facts the owner confirmed in conversation (2026-10-27). Do not add claims
// beyond those; uncertain details (e.g. exact Angular versions) stay out.

export const profile = {
  name: "Bence Végh",
  role: "Frontend Engineer",
  location: "Available now for remote full-time or B2B roles",
  summary:
    "I’m a frontend engineer with 6+ years of building large-scale web applications — mostly in Angular and TypeScript, with hands-on React. I care about reusable UI, maintainable architecture and accessible products people enjoy using.",
  proof: [
    "UI library and app skeleton behind 45–50 media portals, including mindmegette.hu (~350k daily visitors)",
    "A 40+ component design system for an AI-powered education platform",
    "An Angular-to-React rewrite shipped in three weeks with an agentic AI workflow",
  ],
} as const;

// Approved by the owner for publication (2026-10-26).
export const contact = {
  email: "veghbence92@gmail.com",
  linkedin: "https://www.linkedin.com/in/bence-v%C3%A9gh-794a2716a",
  cv: "/bence-vegh-cv.pdf",
};

export const languages = ["Hungarian (native)", "English (B2, upper-intermediate)"];

// What a recruiter needs to qualify a match without a call.
export const availability = {
  status: "Available now",
  items: [
    { label: "Role", value: "Frontend Engineer: Angular, React, TypeScript" },
    { label: "Engagement", value: "Full-time or B2B contract" },
    { label: "Location", value: "Remote first (CET). Hybrid in Budapest one day a week, or on-site in Szeged" },
    { label: "Start", value: "Immediately" },
    { label: "Languages", value: "Hungarian (native), English (B2)" },
  ],
} as const;

export type Role = {
  id: string;
  short: string;
  start: number;
  end: number;
  domain: string;
  accent: Project["accent"];
  icon: Project["icon"];
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
    id: "gdu",
    short: "GDU – MIT",
    start: 2025,
    end: 2026,
    domain: "Education",
    accent: "blue",
    icon: "education",
    period: "2025 – 2026",
    title: "Software Engineer",
    company: "Gábor Dénes University – MIT",
    context: "AI-powered education platform for teachers, students and parents, in a team of seven",
    workMode: "Remote",
    highlights: [
      "Extended and maintained the shared design system (40+ components) and had a say in its direction.",
      "Worked across the Nx monorepo behind the platform’s three frontend apps, in Angular and React.",
      "Delivered the Angular-to-React rewrite of the Teacher app in three weeks — four list views and three detail views — on time, using an agentic AI-assisted workflow while still new to React.",
      "Built a chat interface for generating several types of learning tasks with AI.",
    ],
    stack: ["Angular", "React", "TypeScript", "Signals", "RxJS", "Nx", "Design systems"],
  },
  {
    id: "trendency",
    short: "Trendency",
    start: 2022,
    end: 2025,
    domain: "Media",
    accent: "lilac",
    icon: "media",
    period: "2022 – 2025",
    title: "Software Engineer",
    company: "Trendency Online",
    context: "Large-scale media platforms, CMS and content portals",
    workMode: "Remote",
    highlights: [
      "Built a large part of the frontend of mindmegette.hu, a food portal with around 350,000 daily visitors.",
      "Worked on the shared UI library and Angular skeleton app used by 45–50 portals; the skeleton cut the time to launch a new portal to about a third.",
      "Built reusable features — galleries, carousels, calendars, org charts, authentication — documented in Storybook.",
      "Delivered WCAG 2.1 AA accessibility on two sites: keyboard navigation, focus management, ARIA and NVDA testing.",
      "Took part in major Angular version migrations, code reviews, estimation and refinement, and mentored a junior developer for six months.",
    ],
    stack: ["Angular", "TypeScript", "RxJS", "Storybook", "Angular Material", "NG-ZORRO", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "griffsoft",
    short: "GriffSoft",
    start: 2021,
    end: 2022,
    domain: "Healthcare",
    accent: "mint",
    icon: "health",
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
    id: "epam",
    short: "EPAM",
    start: 2019,
    end: 2020,
    domain: "Travel",
    accent: "sand",
    icon: "web",
    period: "2019 – 2020",
    title: "Junior Software Engineer",
    company: "EPAM Systems",
    context: "Hotels.com, travel and hospitality",
    workMode: "On-site",
    highlights: [
      "Implemented features on the search, listing and detail pages, fixed bugs and supported production releases.",
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
    evidence: "A 40+ component design system; a UI library and skeleton shared by 45–50 media portals.",
  },
  {
    title: "Modernization without drama",
    body: "Moving real products forward while they stay in use — framework upgrades, new reactive patterns and full rewrites.",
    evidence: "Major Angular version migrations; an Angular-to-React rewrite delivered in three weeks.",
  },
  {
    title: "Accessibility built in",
    body: "Keyboard paths, focus management and ARIA treated as part of the feature, checked with a real screen reader.",
    evidence: "WCAG 2.1 AA on two media sites, tested with NVDA.",
  },
  {
    title: "A dependable teammate",
    body: "Clear communication with designers, backend developers and clients, plus the review and planning work that keeps a team moving.",
    evidence: "Code reviews, estimation and refinement; six months mentoring a junior developer.",
  },
] as const;

// The three tools that define the profile, shown first in the toolkit.
export const featuredSkills = [
  { name: "Angular", note: "Main framework across three companies, from version migrations to Signals." },
  { name: "React", note: "Production work, including an Angular-to-React rewrite delivered in three weeks." },
  { name: "TypeScript", note: "The everyday language behind both." },
] as const;

export const skillGroups = [
  { name: "Core", items: ["Angular", "React", "TypeScript", "JavaScript (ES6+)", "RxJS", "Angular Signals", "HTML", "CSS / SCSS", "Now learning Node.js"] },
  { name: "UI & architecture", items: ["Design systems", "Component libraries", "Storybook", "Nx monorepos", "Angular Material", "NG-ZORRO", "Tailwind CSS", "Responsive design"] },
  { name: "Quality & delivery", items: ["Accessibility (WCAG 2.1 AA)", "Jest", "REST APIs", "Git", "Docker", "Figma", "Code review", "Mentoring"] },
  { name: "AI-assisted development", items: ["Claude Code", "Cursor", "Codex", "Agentic workflows"] },
] as const;

// "Before code, there was music." The owner approved the photo and story.
export const about = {
  title: "Before code, there was music.",
  body: [
    "I studied music at the University of Szeged, with trumpet and piano as my instruments. Years of daily practice taught me patience with details, a feel for timing, and that a performance only works when every part comes together.",
    "In 2016 I switched to Business Information Technology, and since 2019 I’ve been building frontends, still chasing the same thing: something that feels right to the person on the other side.",
  ],
  journey: [
    { years: "2012 – 2016", title: "Music", detail: "University of Szeged, trumpet and piano" },
    { years: "2016 – 2018", title: "Business IT", detail: "University of Szeged" },
    { years: "2019 – now", title: "Frontend engineering", detail: "EPAM, GriffSoft, Trendency, GDU – MIT" },
  ],
  hobbies: ["Football", "Cycling", "Fishing", "Music", "Dogs"],
  photo: { src: "/images/bence-vegh.jpg", alt: "Bence Végh smiling, in a white shirt, outdoors", width: 900, height: 1125 },
} as const;
