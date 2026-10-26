"use client";

import { memo, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Laptop } from "./laptop";
import type { StoryState } from "@/components/story/story-state";
import { laptopCamera } from "./laptop-poses";

const rendererOptions = { antialias: true, alpha: true, powerPreference: "low-power" as const };

function Ready({ onReady, onFailure }: { onReady: () => void; onFailure: () => void }) {
  const { gl, invalidate } = useThree();
  const reported = useRef(false);
  // Render explicitly after laptop/shadow callbacks. Report readiness only after
  // a successful draw, including with a stationary pointer and demand rendering.
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera);
    if (!reported.current) { reported.current = true; queueMicrotask(onReady); }
  }, 1);
  useEffect(() => {
    reported.current = false;
    invalidate();
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => { canvas.removeEventListener("webglcontextlost", onFailure); };
  }, [onFailure, gl, invalidate]);
  return null;
}

function LaptopScene({ interactive, onReady, onFailure, story }: { interactive: boolean; onReady: () => void; onFailure: () => void; story?: StoryState }) {
  return <Canvas frameloop="demand" dpr={[1, 1.5]} camera={laptopCamera}
    gl={rendererOptions}
    onCreated={({ camera }) => {
      camera.lookAt(0, .25, 0);
    }}>
    <ambientLight intensity={1.5} />
    <directionalLight position={[3, 5, 4]} intensity={3} color="#fff8ef" />
    <directionalLight position={[-4, 2, 1]} intensity={1.5} color="#dce7ff" />
    <Laptop interactive={interactive} story={story} />
    <ContactShadows position={[0, -.83, 0]} opacity={.25} scale={8} blur={2.5} far={4} resolution={256} frames={1} />
    <Ready onReady={onReady} onFailure={onFailure} />
  </Canvas>;
}

// Revealing the canvas updates the parent. Keep that render from reconfiguring
// the R3F root/camera after its correctly composed first frame.
export default memo(LaptopScene);
