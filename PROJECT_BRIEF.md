# Portfolio — Project Brief

## Purpose
Build an English-language, premium, animation-led personal portfolio for Bence Végh, a frontend engineer. Primary audience: recruiters and technical hiring managers; secondary audience: potential freelance clients. The website itself should demonstrate frontend craftsmanship, product thinking, animation expertise, and basic LLM integration.

## Positioning
- Name: Bence Végh
- Role: Frontend Engineer (Angular, React, TypeScript)
- Core message: taking a requirement or idea through thoughtful engineering to a production-ready product.
- Suggested hero copy (editable): **Bence Végh — Frontend Engineer**; **I turn ideas into real products.**
- No portrait on the landing page. A separate About page with a portrait is a possible later enhancement.
- English throughout.

## Landing page journey
1. **Animated introduction:** immediate visual wow factor, bold readable typography, elegant 3D floating UI elements. Elements transition continuously into the laptop scene as the user scrolls.
2. **Scroll-driven product journey:** a pinned cinematic 3D laptop scene with seven states (including opening state). One currently relevant step has visual focus; laptop screen evolves in sync. Scroll controls progress in both directions; no forced time-based pause.
3. **Transition into selected experience:** zoom toward the laptop screen and reveal a light, refined project launcher / icon grid. Scrolling past it does not require a click.
4. **Project categories:** Education Platform, Multimedia Platform, Healthcare Application; optionally Static Websites. Each icon links to a separate case-study route, but case-study implementation is outside the initial landing-page scope. Use honest placeholders or disabled/non-navigating treatments until those routes exist; never present dead links as functional.
5. **AI Assistant demo:** a small working chat that answers questions about professional skills, experience and publicly shareable contact information, grounded in explicitly authored facts. No UI generator/playground in v1.
6. **Tech / expertise snapshot:** quickly scannable Angular, React, TypeScript and relevant frontend capabilities.
7. **Contact/footer:** visible email and LinkedIn links (real values to be supplied; never fabricate them), plus optional CV link once provided.

## Seven story states (approved narrative)
0. **I turn ideas into real products** — establishing shot / laptop and floating elements.
1. **I understand the problem** — requirements and discovery.
2. **I plan the solution** — structure, architecture and planning.
3. **I design a great user experience** — wireframes to polished UI.
4. **I turn designs into a working product** — functional interfaces and interactions.
5. **I ensure a high-quality product** — validation, testing, accessibility, performance.
6. **Production-ready. Real impact.** — final product, release-ready state.

The seven states are visual metaphors for a general process, **not** a claim that a specific real client project followed these exact steps. The illustrated application is fictional.

## Content integrity
- The user has real experience across education, multimedia, healthcare and static websites; examples and interfaces must be original fictional demonstrations.
- Never reuse employer-owned designs, assets, source code, internal data or confidential details.
- Do not invent project metrics, business impact, responsibilities or technologies. Confirm case-study facts with the owner before publishing.
- Label fictional visuals clearly; distinguish actual professional experience from fictional mockups.

## Version 1 scope
- Working responsive landing page with premium introductory animation, seven-stage scroll story, project launcher, simple AI assistant, expertise summary and contact section.
- Case-study detail pages, a portrait About page, OS-aware light/dark mode, AI UI playground and CMS are **later features**.
- Light mode only in v1, but design tokens should permit dark mode later.

## Definition of success
A recruiter can identify the owner, role, expertise, experience categories and contact route within seconds, without watching the animation. An interested visitor can explore a memorable, smooth, accessible visual story. The page remains usable when WebGL, motion or AI is unavailable.
