# Portfolio — Technical Specification & Codex Handoff

## Core decisions
- Framework: **Next.js App Router + React + TypeScript**, current stable compatible releases at implementation time.
- 3D: **CSS 3D transforms** for the laptop (decision 2026-10-26). The screen is real HTML, so it stays sharp, needs no WebGL fallback and ships no Three.js payload. Reintroduce Three.js/R3F only for content that genuinely needs a 3D renderer.
- Scroll/cinematic animation: **GSAP + ScrollTrigger**. Prefer one authoritative scroll timeline rather than overlapping competing animation systems.
- Styling: **CSS Modules + CSS custom properties**; global design tokens for spacing, typography, colors and motion. Light mode first.
- AI: **Anthropic Claude API** (owner decision 2026-10-27, replacing the original OpenAI plan) via a Next.js server route (`app/api/assistant`) and the official `@anthropic-ai/sdk`; never call the model directly from the browser with a secret API key. The model is configurable via `ANTHROPIC_MODEL`.
- Content: local typed TS/JSON or MDX for static content; no CMS/database required for v1.
- Testing: lean setup, avoid unnecessary dependencies. Add tests where they protect core behavior; not blanket test generation.

## Architecture boundaries
- `app/`: routes, metadata, server endpoint for assistant.
- `components/layout/`: header, navigation, footer, section wrappers.
- `components/intro/`: typography and initial scene.
- `components/story/`: scroll narrative, seven stage definitions, laptop screen states.
- `components/three/`: 3D canvas, laptop model, scene elements.
- `components/work/`: experience launcher.
- `components/assistant/`: chat UI.
- `components/expertise/`: tech summary.
- `content/`: approved biography, experience summaries, stage text and assistant knowledge.
- `styles/`: global tokens and resets.
- Folder names are guidance, not an inflexible architecture requirement. Avoid premature abstractions.

## Rendering strategy
- Static/SEO-critical content is HTML, server-rendered where appropriate. WebGL and GSAP run only in client components.
- Lazy-load the 3D scene where practical. The initial HTML must expose name, role, headline, expertise and links without waiting for JavaScript/3D.
- Use responsive fallbacks for reduced motion, low capability and WebGL failure.
- Prefer CSS/HTML for laptop screen UI if feasible; if using a 3D texture, keep an accessible DOM equivalent. Do not build the entire site inside a canvas.
- Use an original or appropriately licensed laptop GLB model, optimized for web; use placeholder geometry first. No assumption that a paid or external model asset is available.

## AI assistant v1
- Server route accepts a bounded conversation and returns a response grounded in an explicitly approved public-profile knowledge base.
- Keep model instructions server-side. Include explicit guidance to say 'I don't know' when a requested detail is absent.
- Limit input size, history, output tokens and requests per client; add basic rate limiting / abuse controls before public deployment. Do not rely on a client-side counter for security.
- Use environment variables `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL`, documented in `.env.example` with no real secrets.
- Do not invent an email address, phone number, LinkedIn URL, employers, outcomes or achievements. Use placeholders until approved values are supplied.
- Provide graceful failure messaging and a non-AI contact fallback.
- Do not log private user chat content by default. Explain that messages are sent to an AI provider.

## Performance, accessibility and SEO
- Semantic HTML, keyboard and focus support, reduced-motion and non-WebGL fallbacks.
- Metadata, Open Graph tags, sitemap/robots as appropriate; descriptive headings and crawlable content.
- Optimize images and 3D assets, cap device pixel ratio, avoid large postprocessing chains, and measure real performance before tuning.
- Keep scrolling smooth without taking over native scroll behavior.

## Token-efficient implementation plan for Codex
Work in **four bounded phases**. At the end of each phase: run only the relevant lightweight checks, report files changed, decisions and blockers, then stop. Do not repeatedly rewrite plans or run broad test suites unless warranted.

### Phase 1 — Scaffold and architecture (first Codex task)
1. Read all three Markdown documents.
2. Create a Next.js + TypeScript project with linting and CSS Modules; add GSAP/ScrollTrigger, Three/R3F/Drei, and official OpenAI SDK with mutually compatible current stable versions.
3. Set up design tokens, semantic page sections, minimal navigation, English placeholder content, and `.env.example`.
4. Build a simple responsive page skeleton and a static placeholder laptop/scene. Do **not** implement the full cinematic animation or live AI endpoint yet.
5. Run typecheck and lint once; fix only actionable errors. Report completion and stop.

### Phase 2 — Intro and seven-step story
1. Implement the animated introduction and reversible, scroll-scrubbed seven-state narrative.
2. Keep stage content and screen content data-driven; use placeholder geometry first, then optimize the laptop asset.
3. Implement reduced-motion, no-WebGL and mobile fallbacks.
4. Verify manually relevant interactions; run typecheck/lint. Add a small focused test only for nontrivial stage logic if necessary. Report and stop.

### Phase 3 — Work launcher, expertise and contact
1. Implement smooth transition from laptop to accessible HTML project launcher.
2. Add fictional-domain entries with clear labels and honest case-study placeholders; no broken detail-page links.
3. Add expertise snapshot and contact UI, with placeholders for unknown actual URLs.
4. Check keyboard navigation and responsive behavior; run typecheck/lint. Report and stop.

### Phase 4 — AI assistant and production polish
1. Implement chat UI and server-side OpenAI integration grounded in approved profile data.
2. Add bounded usage, rate limiting/abuse mitigation, errors, and privacy disclosure.
3. Add SEO metadata, final performance/accessibility pass and focused smoke checks.
4. Run production build once and a small end-to-end smoke test of the main user path. Report and stop.

## Rules for efficient agent execution
- **Do not start all phases in one request.** Begin with Phase 1 and wait for user approval before Phase 2.
- Avoid unnecessary browsing, repeated installs, verbose test output, unrelated refactoring and speculative features.
- No full TDD mandate; use focused tests for actual risk, plus typecheck/lint at phase boundaries and one production build at final handoff.
- If a design choice is not specified, choose the simplest reversible solution and record it briefly rather than blocking for minor decisions.
- Ask before any major deviation, paid service, licensed asset, infrastructure commitment or scope expansion.
- Never claim a test passed unless it actually ran.

## Copy-paste prompt for the first Codex session
Read `PROJECT_BRIEF.md`, `DESIGN_SPEC.md`, and `TECH_SPEC.md` as the source of truth. Implement **Phase 1 only** from `TECH_SPEC.md`. Keep the architecture lean and the UI visually aligned with the light, premium design. Install compatible dependencies, create a responsive scaffold and placeholder 3D/laptop scene, and set up `.env.example`. Do not build the full animation, case-study pages or AI backend yet. Run typecheck and lint once, summarize changed files and any blockers concisely, then stop.
