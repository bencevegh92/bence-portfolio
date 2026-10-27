// Absolute site origin for metadata, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL when the site gets a real domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
