import { profileAsText } from "@/lib/profile-text";

export const dynamic = "force-static";

// llms.txt: a concise, plain-text profile for AI assistants and crawlers,
// generated from the same content as the site so the two never drift apart.
export function GET() {
  return new Response(profileAsText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
