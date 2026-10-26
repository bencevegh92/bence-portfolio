import Link from "next/link";
import { projects } from "@/content/projects";
import styles from "./launcher.module.css";
import { WorkSection } from "./work-section";

export function ProjectLauncher() {
  return <WorkSection className={styles.section}>
    <div className={styles.toolbar}><span>02 / Selected Work</span><a href="#story">← Return to story</a></div>
    <div className={styles.intro}><h2 id="work-title" tabIndex={-1}>Different domains.<br />The same care for detail.</h2><p>Fictional demonstrations inspired by real professional experience. Original visuals, never copies of employer projects.</p></div>
    <nav aria-label="Project case studies" className={styles.projects}>
      {projects.map((project, index) => <Link key={project.slug} href={`/work/${project.slug}`} className={styles.project}>
        <span className={`${styles.icon} ${styles[project.accent]}`} aria-hidden="true"><svg viewBox="0 0 100 100" fill="none" focusable="false">
          {index === 0 && <><path d="M19 28Q34 20 50 31Q66 20 81 28V70Q65 64 50 76Q35 64 19 70Z" fill="white" fillOpacity=".8" /><path d="M50 32V76M27 39L40 41M27 49L40 51M60 41L73 39M60 51L73 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></>}
          {index === 1 && <><rect x="18" y="23" width="64" height="52" rx="12" fill="white" fillOpacity=".8" /><path d="M43 36L64 49L43 63Z" fill="currentColor" /><path d="M28 82H72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></>}
          {index === 2 && <><path d="M50 15L78 27V49Q78 69 50 85Q22 69 22 49V27Z" fill="white" fillOpacity=".8" /><path d="M31 50H42L48 38L56 64L63 50H71" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></>}
          {index === 3 && <><rect x="19" y="21" width="62" height="58" rx="10" fill="white" fillOpacity=".8" /><path d="M20 36H80M41 48L31 58L41 68M59 48L69 58L59 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="28" cy="29" r="2" fill="currentColor" /></>}
        </svg></span>
        <span className={styles.name}>{["Education", "Multimedia", "Healthcare", "Other Web Projects"][index]}</span><span className={styles.description}>{project.description}</span><span className={styles.coming}>Case study coming soon</span>
      </Link>)}
    </nav>
    <p className={styles.footnote}>Explore a project, or continue scrolling.<a href="#expertise">Continue to expertise ↓</a></p>
  </WorkSection>;
}
