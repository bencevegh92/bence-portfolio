import Link from "next/link";
import { contact, profile } from "@/content/profile";
import { Logo } from "@/components/ui/logo";
import styles from "./layout.module.css";

// "secondary" links hide on narrow phones; the sections stay reachable by scrolling.
const links: { href: string; label: string; secondary?: boolean }[] = [
  { href: "#experience", label: "Experience" },
  { href: "#expertise", label: "Expertise", secondary: true },
  { href: "#about", label: "About", secondary: true },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`page ${styles.headerInner}`}>
        <Link className={styles.identity} href="/#story" aria-label={`${profile.name}, ${profile.role}, home`}>
          <Logo className={styles.mark} />
          <span className={styles.identityText}>
            <span className={styles.identityName}>{profile.name}</span>
            <span className={styles.identityRole}>{profile.role}</span>
          </span>
        </Link>
        <div className={styles.headerEnd}>
          <nav aria-label="Main">
            <ul className={styles.nav}>
              {links.map(link => <li key={link.href} data-secondary={link.secondary || undefined}><Link href={`/${link.href}`}>{link.label}</Link></li>)}
            </ul>
          </nav>
          <a className={styles.cv} href={contact.cv}>
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 3.5v9M6 9l4 4 4-4M4.5 16.5h11" /></svg>
            CV<span className="srOnly"> (PDF download)</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.footerInner}`}>
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and GSAP.</p>
        <div className={styles.footerLinks}>
          <Link href="/resume">Résumé</Link>
          <Link href="/#story">Back to top</Link>
        </div>
      </div>
    </footer>
  );
}
