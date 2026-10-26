import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { Footer, Header } from "@/components/layout/header";
import { ProjectIcon } from "@/components/work/work-section";
import styles from "@/components/work/case-study.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: `${project?.title ?? "Project"} — ${profile.name}` };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main id="main" className={`page ${styles.page}`} data-accent={project.accent}>
        <Link href="/#work" className={styles.back}>Back to selected work</Link>
        <span className={styles.icon} aria-hidden="true"><ProjectIcon icon={project.icon} /></span>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.concept}>{project.concept}</p>
        <div className={styles.note}>
          <h2>Case study in progress</h2>
          <p>
            This page will host an interactive demo and a write-up of the decisions behind it. The demo is an
            original, fictional app. {project.inspiredBy}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
