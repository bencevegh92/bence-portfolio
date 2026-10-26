import type { ReactNode } from "react";

export function Section({ id, title, intro, children }: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="page">
        <div className="sectionHead">
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
