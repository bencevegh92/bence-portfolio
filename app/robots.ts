import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Open to search engines and AI crawlers alike: being found and correctly
// summarised by assistants (GPTBot, ClaudeBot, PerplexityBot, …) is a goal.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
