"use client";

import { applicationTexture } from "./screen-texture";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { MathUtils, type Group, type MeshBasicMaterial, type PerspectiveCamera } from "three";
import type { StoryState } from "@/components/story/story-state";
import { laptopPoses as poses } from "./laptop-poses";


export function Laptop({ interactive, story }: { interactive: boolean; story?: StoryState }) {
  const group = useRef<Group>(null);
  const screen = useRef<MeshBasicMaterial>(null);
  const nextScreen = useRef<MeshBasicMaterial>(null);
  const [textures] = useState(() => Array.from({ length: 7 }, (_, index) => applicationTexture(index)));
  const { gl, invalidate, camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);
  useEffect(() => () => textures.forEach(texture => texture.dispose()), [textures]);
  useEffect(() => story?.subscribe(invalidate), [story, invalidate]);
  useEffect(() => {
    if (!interactive || story) return;
    const canvas = gl.domElement;
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      target.current = { x: ((event.clientX - bounds.left) / bounds.width - .5) * .12, y: ((event.clientY - bounds.top) / bounds.height - .5) * .08 };
      invalidate();
    };
    const reset = () => { target.current = { x: 0, y: 0 }; invalidate(); };
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", reset);
    return () => { canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", reset); };
  }, [gl, interactive, invalidate, story]);

  useFrame((_, delta) => {
    if (story && group.current) {
      const progress = story.active ? MathUtils.clamp(story.progress, 0, 6) : 0;
      const from = Math.floor(progress);
      const to = Math.min(6, from + 1);
      const blend = MathUtils.smoothstep(progress - from, 0, 1);
      const pose = poses[from].map((value, index) => MathUtils.lerp(value, poses[to][index], blend));
      group.current.position.x = pose[0];
      group.current.rotation.set(pose[2], pose[1], 0);
      camera.position.set(0, pose[3], pose[4]);
      camera.lookAt(0, .25, 0);
      (camera as PerspectiveCamera).updateProjectionMatrix();
      // Fade through the screen surface instead of stacking readable interfaces.
      if (screen.current) {
        screen.current.map = textures[from];
        screen.current.opacity = 1 - MathUtils.smoothstep(progress - from, .3, .48);
      }
      if (nextScreen.current) {
        nextScreen.current.map = textures[to];
        nextScreen.current.opacity = MathUtils.smoothstep(progress - from, .52, .7);
      }
      return;
    }
    if (!interactive || !group.current) return;
    elapsed.current += Math.min(delta, .05);
    // A brief settling drift, rather than perpetual automatic motion.
    const drift = elapsed.current < 4 ? Math.sin(elapsed.current * Math.PI / 2) * .018 * (1 - elapsed.current / 4) : 0;
    const desiredX = target.current.y + drift;
    const desiredY = -.18 + target.current.x;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, desiredX, 5, delta);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, desiredY, 5, delta);
    if (elapsed.current < 4 || Math.abs(group.current.rotation.x - desiredX) + Math.abs(group.current.rotation.y - desiredY) > .0001) invalidate();
  });

  return <group ref={group} rotation={[poses[0][2], poses[0][1], 0]} position={[poses[0][0], -.65, 0]}>
    <RoundedBox args={[3.4, .13, 2.2]} radius={.065} smoothness={2}>
      <meshStandardMaterial color="#bac3ce" metalness={.55} roughness={.33} />
    </RoundedBox>
    <RoundedBox args={[3.05, .015, 1.03]} radius={.04} smoothness={2} position={[0, .075, -.3]}><meshStandardMaterial color="#677380" roughness={.7} /></RoundedBox>
    {Array.from({ length: 5 }, (_, row) => Array.from({ length: 13 }, (_, column) => <mesh key={`${row}-${column}`} position={[(column - 6) * .22, .093, -.7 + row * .18]}><boxGeometry args={[.185, .025, .14]} /><meshStandardMaterial color="#303b48" roughness={.7} /></mesh>))}
    <RoundedBox args={[1.15, .012, .48]} radius={.035} smoothness={2} position={[0, .075, .65]}><meshStandardMaterial color="#aab5c3" metalness={.4} roughness={.5} /></RoundedBox>
    <group position={[0, .08, -1]} rotation={[-.18, 0, 0]}>
      <RoundedBox args={[3.4, 2.16, .1]} radius={.07} smoothness={2} position={[0, 1.08, 0]}><meshStandardMaterial color="#acb7c5" metalness={.5} roughness={.32} /></RoundedBox>
      <mesh position={[0, 1.08, .056]}><planeGeometry args={[3.25, 2.01]} /><meshBasicMaterial color="#252e39" /></mesh>
      <mesh position={[0, 1.08, .059]}><planeGeometry args={[3.08, 1.925]} /><meshBasicMaterial color="#edf2fa" toneMapped={false} /></mesh>
      <mesh position={[0, 1.08, .06]}><planeGeometry args={[3.08, 1.925]} /><meshBasicMaterial ref={screen} map={textures[0]} transparent depthWrite={false} toneMapped={false} /></mesh>
      <mesh position={[0, 1.08, .061]}><planeGeometry args={[3.08, 1.925]} /><meshBasicMaterial ref={nextScreen} map={textures[0]} transparent opacity={0} depthWrite={false} toneMapped={false} /></mesh>
      <mesh position={[0, 2.105, .06]}><circleGeometry args={[.018, 12]} /><meshBasicMaterial color="#283342" /></mesh>
    </group>
  </group>;
}
