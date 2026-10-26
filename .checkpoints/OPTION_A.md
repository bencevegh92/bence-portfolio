# Phase 3A.1 checkpoint and variants

Git was not initialized. `phase-3a-before-option-a.zip` preserves the five original
transition, launcher, laptop and story-state source files before Option A edits.
No project specifications were changed.

Default transition: `screen-entry.ts` exports the immersive Option A controller.
It also exports `createClassicScreenEntry` from the preserved classic controller.
Switching that default export back to classic and using
`<ProjectLauncher variant="classic" />` restores the prior launcher presentation
without changing callers or the seven-stage controller. The archive contains the
original laptop entry camera and store if a complete pre-Option-A restoration is
needed. Keep each archived source at its original corresponding project path.

Option A keeps an inert visual copy for the handoff only. R3F publishes the actual
screen quadrilateral after camera updates; a CSS homography attaches that copy to
the screen before expanding it to the viewport. The real workspace remains HTML
in ordinary page flow. Return reverses after the remounted R3F scene publishes a
frame, without an arbitrary loading delay. Scroll, Escape and resize can cancel.

Manual verification remains necessary for screen alignment, clipping, the
full-viewport handoff, cold-scene reverse navigation, focus, cancellation,
responsive/fallback views and links. No browser runtime verification was available.
