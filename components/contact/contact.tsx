import { contact } from "@/content/profile";
import styles from "./contact.module.css";

export function Contact() {
  const links: { href: string; label: string; value: string }[] = [];
  if (contact.email) links.push({ href: `mailto:${contact.email}`, label: "Email", value: contact.email });
  if (contact.linkedin) links.push({ href: contact.linkedin, label: "LinkedIn", value: "View profile" });

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className="page">
        <h2 id="contact-title" className={styles.title}>Let’s build something people enjoy using.</h2>
        <p className={styles.lead}>
          I’m open to remote frontend roles and selected freelance projects, working from Hungary.
        </p>
        {links.length > 0 ? (
          <ul className={styles.links}>
            {links.map(link => (
              <li key={link.label}>
                <a href={link.href} className={styles.link}>
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.pending}>Direct contact links will be added here shortly.</p>
        )}
      </div>
    </section>
  );
}
