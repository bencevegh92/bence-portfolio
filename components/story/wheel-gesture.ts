// Browsers expose no cross-platform wheel gestureend event. Use an accumulated
// intent threshold and an adaptive silence boundary. Sustained deliberate input
// can advance the latest target; a decaying momentum tail loses its input budget.
export function createWheelGesture() {
  let last = -Infinity;
  let cadence = 24;
  let direction = 0;
  let distance = 0;
  let consumed = false;
  let previousMagnitude = 0;
  return {
    consume(delta: number, time: number) {
      const gap = time - last;
      if (gap > Math.max(160, Math.min(320, cadence * 4))) {
        distance = 0; consumed = false; direction = 0;
      } else if (gap > 0) cadence = cadence * .8 + Math.min(gap, 80) * .2;
      last = time;
      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) { distance = 0; consumed = false; }
      direction = nextDirection;
      const magnitude = Math.abs(delta);
      distance = consumed && magnitude < previousMagnitude * .92 ? distance * .6 : distance + magnitude;
      previousMagnitude = magnitude;
      if (distance < (consumed ? 180 : 40)) return 0;
      consumed = true;
      distance = 0;
      return direction;
    },
  };
}
