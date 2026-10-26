# AGENTS.md — Portfolio development instructions

## Mission and sources of truth
Build an English-language, recruiter-first developer portfolio. Follow these documents in order for product, design, and technical decisions:
1. `PROJECT_BRIEF.md` — product scope and priorities.
2. `DESIGN_SPEC.md` — visual direction, content and interaction details.
3. `TECH_SPEC.md` — implementation architecture and dependencies.

If documents conflict, report the conflict briefly and ask only if it blocks the current task. Do not invent previous employer IP, project outcomes, personal details, or production credentials.

## Working style: efficient, incremental, reviewable
- Implement **only the phase or task explicitly requested**. Never silently start the next phase.
- Before editing, inspect only the files relevant to the task; give a short plan (maximum 5 bullets).
- Prefer small, focused changes and existing dependencies. Avoid speculative abstractions, rewrites, and unrelated cleanup.
- Do not repeatedly read entire files, dump large logs, or run redundant commands. Reuse already gathered context.
- Avoid lengthy explanations. At the end, report changed files, key decisions, checks performed, and any blockers in at most 8 bullets.
- Ask for approval before adding major dependencies, paid services, external integrations, or changing architecture.
- Never claim exact token savings or automatically switch models. Model routing and quotas are controlled by the user's Codex environment, not this file.

## Skills and agent tools
- **Caveman**: User-preferred token-efficiency workflow. If a compatible Caveman skill is installed, inspect its `SKILL.md` and apply it where relevant. If absent, state that clearly; do not pretend it ran, and continue with the efficiency rules above. Do not install an unverified package automatically.
- **Taste Skill v2** (`design-taste-frontend`): If installed, use for visual UI implementation and design review, while prioritizing `DESIGN_SPEC.md` over generic aesthetics.
- **Impeccable**: If installed, use for focused UI polish/accessibility review when appropriate. Do not invoke for every minor edit.
- Skills are optional capabilities, not mandatory blockers. Check availability once per task, avoid invoking overlapping skills unnecessarily, and do not download/install them without approval.
- Do not spin up subagents, browser automation, MCP servers, or multi-agent reviews unless the current task benefits demonstrably and the user approves extra complexity.

## Architecture and implementation principles
- Follow `TECH_SPEC.md` for the agreed stack (Next.js, TypeScript, GSAP/ScrollTrigger, and server-side AI integration as applicable).
- Keep the content semantic, keyboard-accessible, responsive and readable even without JavaScript-powered animations.
- Use GSAP for orchestrated scroll/timeline animation and CSS 3D for the laptop (Three/R3F only if a feature genuinely needs WebGL); keep ordinary text and controls as HTML/CSS.
- Respect `prefers-reduced-motion`, and provide static/fallback visuals if WebGL is unavailable or performance is poor.
- Avoid animation-driven layout shifts; prefer transforms and opacity, clean up listeners/timelines, and load heavy 3D assets only where needed.
- Prioritize quick access to projects, skills, contact information and LinkedIn without requiring the visitor to complete the scroll story.
- The seven-state hero story, fictional project icons, and optional AI assistant must match the approved product/design specs; do not expand into a UI-generation playground in the MVP.
- Clearly distinguish fictional demonstrations from genuine professional experience. Do not reuse proprietary employer assets, code, or confidential details.
- Keep API keys and model calls on the server; use environment variables, basic rate limiting, input bounds, graceful error states and cost-conscious defaults for the chatbot.

## Verification policy — protect time and tokens
- After each focused change, run the **smallest relevant check** first (e.g., lint/typecheck for changed code).
- Run targeted tests for changed behavior if tests exist or if the behavior is complex/risky. Add a small test only when it protects a meaningful contract or regression.
- Run a production build at phase boundaries, before release, or when integration/build behavior may have changed — not after every cosmetic edit.
- Run browser/E2E tests only for a user-requested flow, a relevant regression, or a release checkpoint. Do not run repeated exhaustive test suites by default.
- If a check fails, investigate once, fix the cause, rerun the relevant check; report unresolved issues instead of entering an unbounded retry loop.
- Never claim a check passed unless it was actually executed. Mention checks deliberately skipped.

## Delivery checkpoints
1. **Foundation:** scaffold, dependencies, basic page structure, typography, static content and accessible navigation.
2. **Hero experience:** introductory animation and seven-state scroll-controlled laptop narrative, with fallbacks.
3. **Work showcase:** clickable fictional-project launcher, landing-page transitions, and clear navigation to future case-study routes.
4. **AI and finish:** minimal portfolio Q&A assistant, contact section, performance/accessibility polish and release checks.

These checkpoints guide sequencing, not authorization: implement only the checkpoint requested by the user. Keep unfinished features as honest placeholders rather than simulated working features.

## First-task behavior
When asked to begin, read the three specifications, identify the current repository state, and implement **Phase 1 only**. Summarize what was created, what was validated, and what remains for Phase 2; then stop.
