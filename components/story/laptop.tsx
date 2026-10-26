import { ScreenStack } from "./screens";
import styles from "./laptop.module.css";

// A CSS 3D laptop. The display is real HTML, so it stays sharp at any size and
// needs no WebGL. Data attributes are the hooks for the scroll timeline:
// camera = viewing elevation, rig = turntable rotation, parallax = pointer tilt.
export function Laptop() {
  return (
    <div className={styles.device} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.camera} data-device-camera>
        <div className={styles.parallax} data-device-parallax>
          <div className={styles.rig} data-device-rig>
            <div className={styles.lid}>
              <div className={styles.lidFront}><ScreenStack /></div>
              <div className={styles.lidBack} />
            </div>
            <div className={styles.base}>
              <div className={styles.keys}>{Array.from({ length: 56 }, (_, index) => <i key={index} />)}</div>
              <div className={styles.trackpad} />
              <div className={styles.baseFront} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
