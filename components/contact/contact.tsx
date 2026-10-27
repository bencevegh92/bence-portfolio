import Link from "next/link";
import { availability, contact } from "@/content/profile";
import { InView } from "@/components/ui/in-view";
import { CopyEmail, LocalTime } from "./contact-client";
import { OpenAssistantButton } from "@/components/assistant/assistant";
import styles from "./contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <InView className={styles.glow}><i /><i /><i /></InView>
      <div className={`page ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.status}><span className={styles.pulse} aria-hidden="true" />{availability.status}: full-time or B2B, remote first</p>
          <h2 id="contact-title" className={styles.title}>Let’s build something people enjoy using.</h2>
          <p className={styles.lead}>
            The fastest way to reach me is email. I’m happy to talk about frontend roles, design systems or a project you have in mind.
          </p>
          <LocalTime />
          <div className={styles.looking}>
            <h3>What I’m looking for</h3>
            <dl>
              {availability.items.map(item => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.emailCard}>
            <span className={styles.label}>Email</span>
            <a href={`mailto:${contact.email}`} className={styles.email}>{contact.email}</a>
            <CopyEmail email={contact.email} />
          </div>
          <div className={styles.cards}>
            <a href={contact.linkedin} className={styles.card} rel="me noopener" target="_blank">
              <span className={styles.label}>LinkedIn</span>
              <strong>Connect with me<span className="srOnly"> (opens in a new tab)</span></strong>
              <svg className={styles.arrowOut} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M7 13L13 7M8 7h5v5" /></svg>
            </a>
            <a href={contact.cv} className={styles.card} download="Bence-Vegh-CV.pdf">
              <span className={styles.label}>Résumé</span>
              <strong>Download CV (PDF)</strong>
              <svg className={styles.arrowDown} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4v10M5.5 9.5L10 14l4.5-4.5M5 16.5h10" /></svg>
            </a>
          </div>
          <p className={styles.alt}>Prefer plain text? <Link href="/resume">Read the résumé online</Link>.</p>
          <p className={styles.alt}>Have a quick question first? <OpenAssistantButton className={styles.askLink}>Ask the AI assistant</OpenAssistantButton>.</p>
        </div>
      </div>
    </section>
  );
}
