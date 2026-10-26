import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import styles from "@/components/work/launcher.module.css";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${projects.find(project => project.slug === slug)?.title ?? "Project"} — Bence Végh` };
}
export default async function CaseStudyPlaceholder({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return <main className={styles.placeholder}><Link href="/#work">← Back to selected experience</Link><p className="eyebrow">Case study coming soon</p><h1>{project.title}</h1><p>{project.description}</p><p>This page reserves a future case study. Any demonstration visuals will be fictional, inspired by genuine experience in this domain. Detailed project facts will be added only after approval.</p><Link href="/#contact">Contact information</Link></main>;
}
