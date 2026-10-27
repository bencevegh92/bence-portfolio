import { about, availability, contact, experience, languages, learning, profile, skillGroups, strengths } from "@/content/profile";
import { stages } from "@/content/story";
import { siteUrl } from "@/content/site";

/**
 * The approved public profile as plain Markdown-ish text. One source for both
 * /llms.txt (crawlers, AI assistants) and the on-site assistant's knowledge,
 * so neither can drift from what the site itself says.
 */
export function profileAsText() {
  return [
    `# ${profile.name} — ${profile.role}`,
    "",
    `> ${profile.summary}`,
    "",
    `${profile.location}. Languages: ${languages.join(", ")}.`,
    "",
    "## Availability",
    `${availability.status}.`,
    ...availability.items.map(item => `- ${item.label}: ${item.value}`),
    "",
    "## Contact",
    `- Email: ${contact.email}`,
    `- LinkedIn: ${decodeURI(contact.linkedin)}`,
    `- CV (PDF): ${siteUrl}${contact.cv}`,
    "",
    "## Pages",
    `- [Portfolio home](${siteUrl}/): introduction, process, experience, expertise, background and contact`,
    `- [Résumé](${siteUrl}/resume): full text résumé`,
    "",
    "## Experience",
    ...experience.flatMap(role => [
      `### ${role.title}, ${role.company} (${role.period}, ${role.workMode.toLowerCase()})`,
      `${role.context}.`,
      ...role.highlights.map(item => `- ${item}`),
      `Technologies: ${role.stack.join(", ")}.`,
      "",
    ]),
    "## Strengths",
    ...strengths.map(strength => `- ${strength.title}: ${strength.body} Evidence: ${strength.evidence}`),
    "",
    "## How I work",
    ...stages.map(stage => `- ${stage.title}: ${stage.body}`),
    "",
    "## Skills",
    ...skillGroups.map(group => `- ${group.name}: ${group.items.join(", ")}`),
    "",
    "## Training and education",
    ...learning.map(item => `- ${item}`),
    "",
    "## Background",
    ...about.body,
    `Interests: ${about.hobbies.join(", ")}.`,
    "",
  ].join("\n");
}
