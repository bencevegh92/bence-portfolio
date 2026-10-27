import type { Project } from "@/content/projects";

// Line icons for the experience domains, shared by work tiles and the timeline.
export function DomainIcon({ icon }: { icon: Project["icon"] }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {icon === "education" && <><path d="M8 14q8-4 16 1q8-5 16-1v21q-8-3-16 2q-8-5-16-2Z" /><path d="M24 15v22" /></>}
      {icon === "media" && <><rect x="7" y="10" width="34" height="24" rx="5" /><path d="M21 17l8 5-8 5Z" fill="currentColor" /><path d="M14 40h20" /></>}
      {icon === "health" && <><path d="M24 7l14 6v10c0 9-6 15-14 19-8-4-14-10-14-19V13Z" /><path d="M15 25h5l3-6 4 11 3-5h4" /></>}
      {icon === "web" && <><rect x="7" y="9" width="34" height="30" rx="5" /><path d="M7 17h34M20 24l-4 4 4 4M28 24l4 4-4 4" /></>}
    </svg>
  );
}
