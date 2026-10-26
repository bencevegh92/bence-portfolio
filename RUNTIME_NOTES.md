# Runtime dependency notes

## Three.js Clock deprecation (checked 2026-10-22)

Installed `@react-three/fiber@9.8.2` constructs `new THREE.Clock()` in
`dist/events-e51d7528.esm.js` (store initialization). Installed `three@0.186.1`
emits the warning from its deprecated Clock constructor, deprecated since r183.
The application does not construct a Clock.

The npm registry still lists Fiber 9.8.2 as latest stable. Fiber 10 is available
only through alpha/canary tags. Installed/latest `@react-three/drei@10.7.9`
declares Fiber `^9.0.0` as its peer dependency. No compatible stable upgrade
currently resolves this warning. No warnings are suppressed and no dependency
source is patched or downgraded to conceal it.

Follow-up: revisit a stable Fiber release that removes Clock usage, together
with a compatible stable Drei release. Verify their peer requirements and
rendering API before upgrading. Upstream tracking:
https://github.com/pmndrs/react-three-fiber/issues/3741

## Wheel gesture boundaries

Desktop wheel handling is scoped to the visible story. Each accepted intent
advances the discrete target, then a GSAP timeline completes that composition.
No scroll position is set. Fresh deliberate input can retarget a running timeline
from its current visual position; controls remain enabled. The latest target is
bounded to three stages beyond the visible pose. Sustained wheel input uses a
higher intent threshold after its first step; decaying momentum loses accumulated
budget. Since browser WheelEvent has
no portable gesture-end signal, rearming uses a silence gap adapted to observed
event cadence plus a fresh accumulated intent threshold. This is a heuristic;
mouse and trackpad momentum behavior needs manual device verification.

Previous/Next buttons and left/right arrows provide exact stage navigation.
Escape releases wheel capture; Skip story and all normal anchors remain native.
At stage 0 upward input and stage 6 downward input scroll normally after the
transition completes. Touch/coarse-pointer, small-screen, reduced-motion and
no-JavaScript presentations retain ordinary scrolling with all stage text.

## Loading presentation

The static HTML laptop uses an independent CSS projection and cannot match the
procedural camera precisely. It is now reserved for WebGL failure, reduced motion
and JavaScript-disabled views. Initial loading uses a neutral, fixed-size workspace
placeholder in the same reserved canvas area. WebGL is revealed after its first
successful draw, without timers. Stage-0 camera/model defaults remain shared.

The Clock limitation above was rechecked against npm: Fiber 9.8.2 is still latest
stable, Drei 10.7.9 still requires Fiber ^9, and installed Fiber still constructs
Clock. Dependencies remain unchanged; no safe stable upstream fix is available.
