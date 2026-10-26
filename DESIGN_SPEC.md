# Portfolio — Design & Interaction Specification

## Visual direction
Premium, light, Apple-inspired editorial minimalism with cinematic but smooth 3D animation. Airy off-white background, soft neutral surfaces, subtle blue/lilac accents, tasteful glass-like overlays, strong modern typography, restrained shadows. **Light theme first**. Avoid the previously explored dark/neon-dominant concept. No portrait on landing page.

## Global layout
- Sticky/minimal navigation: identity + quick anchors to Work, Expertise, AI Demo and Contact. A recruiter must be able to skip cinematic sections.
- Large desktop composition with responsive tablet/mobile adaptation.
- Clear semantic content hierarchy and adequate contrast. Avoid excessive ornamental copy.
- Do not add fabricated employers, logos, achievements or testimonials.

## Scene A — Introduction
- On initial load, prominently display **Bence Végh**, **Frontend Engineer** and **I turn ideas into real products.**
- Text appears through controlled reveal/opacity/position motion, never at the expense of readable source text.
- Several floating UI-inspired elements, geometries and translucent panels create depth; gentle idle parallax. No mandatory loading splash.
- As the visitor scrolls, these elements reposition and become the surroundings of the laptop. This is a continuous visual transition, not a page jump.

## Scene B — Seven-state scroll story
- Pinned/scroll-scrubbed section: the scroll position drives the entire sequence, and reverse scrolling reverses it accurately.
- A stylized 3D laptop is the visual anchor; floating panels represent stages of product development.
- Exactly seven narrative states (0–6), with copy as listed in PROJECT_BRIEF.md.
- At each stage, the corresponding element moves forward or enlarges subtly; non-active elements recede, blur only if inexpensive, or lose contrast. Maintain legible title/description near the active element.
- In parallel, the laptop screen changes from conceptual/empty state to requirements, plan, wireframes, designed UI, working UI, quality/release checks, and finished application.
- The **same fictional application** develops throughout. It should be generic and original rather than explicitly an education, media or health product.
- Different states may have different scroll lengths; UX/design and implementation can get more visual emphasis.
- No scroll hijacking, forced stop or auto-advancing story. Provide an obvious skip-to-work route.
- At completion, floating elements regroup/fade, laptop faces forward and the camera smoothly approaches the screen.

## Scene C — Selected experience / app launcher
- Camera zoom resolves into a flat, accessible HTML-based light interface with a refined app-icon grid.
- Three primary entries: Education Platform, Multimedia Platform, Healthcare Application; optional fourth: Static Websites.
- These are **fictional illustrations of genuine experience domains**, not copied projects. Brief captions make this distinction clear.
- Entries can eventually open dedicated case-study routes. For v1, use a clearly indicated 'Case study coming soon' state unless actual content exists.
- The section remains part of ordinary vertical scrolling; clicking is optional.

## Scene D — AI assistant
- Visually integrated, light, approachable chat panel with a short intro, a few suggested questions and text input.
- Examples: 'What technologies does Bence work with?', 'What kind of projects has he worked on?', 'How can I contact him?'
- Show clear loading, errors, and a brief disclosure that responses are AI-generated and can be imperfect.
- Responses only use approved public profile facts. No invented contact details.

## Scene E — Expertise and contact
- Compact, skimmable expertise section. Highlight Angular, React, TypeScript, reusable UI components, accessibility and modern frontend practices.
- Contact section has direct, accessible email/LinkedIn links once the real values are supplied. Provide a clear CTA near the top too.

## Motion principles
- Premium and smooth, not chaotic. One clear visual focus at a time.
- Animate transform/opacity wherever possible. Avoid layout thrashing, oversized textures and gratuitous postprocessing.
- Scroll-linked animation should be deterministic and reversible.
- Motion intensity scales down on mobile and for `prefers-reduced-motion`.
- Reduced-motion fallback: all seven stages remain accessible as readable static steps; navigation, project entries and contact still work.
- If WebGL is unavailable, use a 2D static laptop illustration and ordinary scroll content.

## Accessibility / usability
- Real HTML headings, links, buttons and descriptions; 3D canvas is decorative enhancement, not the only source of information.
- Keyboard navigation, visible focus styles, semantic landmarks, sufficient contrast, no inaccessible hover-only interactions.
- Avoid announcing every animation frame to screen readers.
- Ensure a fast path to contact and expertise; recruiter should not have to scroll through the entire show.

## Responsive behavior
- Desktop: full 3D narrative with strong camera staging.
- Tablet: simplified spacing and fewer simultaneous elements.
- Mobile: reduced geometry and shorter scroll narrative or static stage cards where necessary; readable text and touch-safe controls take priority.

## Design deliverables for implementation
Before high-fidelity 3D work, produce a working layout with placeholder geometry, stage labels, and screen states. Review composition and scroll rhythm before polishing assets.
