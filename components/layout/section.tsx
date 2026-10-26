export function Section({ id, label, title, children }: {
  id: string; label: string; title: string; children: React.ReactNode;
}) {
  return <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <p className="eyebrow">{label}</p>
    <h2 id={`${id}-title`}>{title}</h2>
    {children}
  </section>;
}
