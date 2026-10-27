// Planned fictional demos. Each is original work inspired by a real experience
// domain; none reproduces an employer project. Not rendered for now (removed
// before beta); the accent/icon types are shared with the experience timeline.

export type Project = {
  slug: string;
  title: string;
  concept: string;
  inspiredBy: string;
  accent: "blue" | "lilac" | "mint" | "sand";
  icon: "education" | "media" | "health" | "web";
};

export const projects: Project[] = [
  {
    slug: "education-platform",
    title: "Education platform",
    concept: "A classroom hub where teachers, students and parents each get a focused view of assignments and progress.",
    inspiredBy: "Informed by my work on an AI-powered education platform.",
    accent: "blue",
    icon: "education",
  },
  {
    slug: "multimedia-platform",
    title: "Media platform",
    concept: "A content portal with galleries, rich media and an editorial workflow behind it.",
    inspiredBy: "Informed by my work on large-scale media portals and CMS applications.",
    accent: "lilac",
    icon: "media",
  },
  {
    slug: "healthcare-application",
    title: "Healthcare application",
    concept: "Scheduling and overview screens where clarity and accessibility matter most.",
    inspiredBy: "Informed by building features for a healthcare application.",
    accent: "mint",
    icon: "health",
  },
  {
    slug: "other-web-projects",
    title: "Other web projects",
    concept: "Focused booking flows and fast, responsive marketing pages.",
    inspiredBy: "Informed by feature work for a travel and hospitality platform.",
    accent: "sand",
    icon: "web",
  },
];
