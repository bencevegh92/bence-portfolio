import { contact, profile, skillGroups } from "@/content/profile";
import { siteUrl } from "@/content/site";

// schema.org ProfilePage + Person: lets search engines and AI assistants
// identify who this site is about and connect it to the LinkedIn profile.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteUrl}/`,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: "Bence Vegh",
      jobTitle: profile.role,
      description: profile.summary,
      url: `${siteUrl}/`,
      email: `mailto:${contact.email}`,
      sameAs: [contact.linkedin],
      address: { "@type": "PostalAddress", addressCountry: "HU" },
      knowsLanguage: ["hu", "en"],
      knowsAbout: skillGroups.flatMap(group => group.items),
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Szeged" },
    },
  };
  // Escape "<" so the JSON can never close the script element early.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
