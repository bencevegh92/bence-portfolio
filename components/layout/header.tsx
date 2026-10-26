import Link from "next/link";
import { profile } from "@/content/profile";
import styles from "./layout.module.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`page ${styles.headerInner}`}>
        <Link className={styles.identity} href="/#story" aria-label={`${profile.name}, ${profile.role}, home`}>
          <span className={styles.mark} aria-hidden="true">BV</span>
          <span className={styles.identityText}>{profile.name}</span>
        </Link>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            {links.map(link => <li key={link.href}><Link href={`/${link.href}`}>{link.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.footerInner}`}>
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and GSAP.</p>
        <Link href="/#story">Back to top</Link>
      </div>
    </footer>
  );
}
