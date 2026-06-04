"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Ring, Torus } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeonCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      outerRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      {/* Core pulsing sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere ref={coreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#E8293A"
            attach="material"
            distort={0.35}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#9B1C2E"
            emissiveIntensity={0.4}
          />
        </Sphere>

        {/* Wireframe outer shell */}
        <Sphere ref={outerRef} args={[1.8, 24, 24]}>
          <meshStandardMaterial
            color="#E8293A"
            wireframe
            transparent
            opacity={0.12}
          />
        </Sphere>

        {/* Orbiting torus ring 1 */}
        <Torus args={[2.4, 0.015, 16, 120]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#E8293A"
            emissive="#E8293A"
            emissiveIntensity={1.5}
            transparent
            opacity={0.5}
          />
        </Torus>

        {/* Orbiting torus ring 2 */}
        <Torus args={[2.8, 0.01, 16, 120]} rotation={[-Math.PI / 5, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={1.2}
            transparent
            opacity={0.35}
          />
        </Torus>
      </Float>
    </>
  );
}

export default function Workspace3D() {
  return (
    <div className="w-full h-[400px] lg:h-[580px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#E8293A" />
        <pointLight position={[-3, -3, -3]} intensity={1} color="#9B1C2E" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#FF6B35" />

        <Stars
          radius={100}
          depth={50}
          count={2500}
          factor={3}
          saturation={0.3}
          fade
          speed={0.5}
        />

        <NeonCore />
      </Canvas>

      {/* Radial glow overlay under canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,41,58,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
