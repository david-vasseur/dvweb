'use client';

import { useDeviceStore } from '@/app/lib/store/useDeviceStore';
import { Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';



function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 10 : 50;

  // on stocke les références de chaque mesh pour les animer ensuite
  const meshRefs = useRef<THREE.Mesh[]>([]);

  // positions de départ aléatoires
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        (Math.random() - 0.5) * 30, // x
        (Math.random() - 0.5) * 30, // y
        (Math.random() - 0.5) * 15, // z
      ]);
    }
    return arr;
  }, [count]);

  // animation frame-by-frame
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;

      // petit mouvement de flottement unique pour chaque sphère
      mesh.position.y += Math.sin(t * 0.6 + i) * 0.01;
      mesh.position.x += Math.cos(t * 0.3 + i) * 0.005;
      mesh.rotation.y += 0.01; // légère rotation
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={pos}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#61dafb" roughness={0.9} metalness={0.9} />
        </mesh>
      ))}
    </>
  );
}

function AnimatedTorus({ isMobile}: { isMobile: boolean }) {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={torusRef} position={[5, 0, -5]}>
      <torusGeometry args={isMobile ? [2, 0.4, 10, 50] : [2, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#149eca"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}


function AnimatedSphere({ isMobile}: { isMobile: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      sphereRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.8;
    }
  });

  return (
    <mesh ref={sphereRef} position={[-5, 0, -3]}>
      <sphereGeometry args={isMobile ? [1, 16, 16] : [1.5, 32, 32]} />
      <meshStandardMaterial
        color="#61dafb"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

export default function Background3D() {

	const { isMobile } = useDeviceStore();

    return (
		<div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
			<Canvas
				camera={{ position: [0, 0, 20], fov: 75 }}
				style={{ background: 'transparent' }}
			>
        <Environment preset="city" />
				<ambientLight intensity={2.5} />
				<pointLight position={[10, 10, 10]} intensity={1} />
				<FloatingParticles isMobile={isMobile} />
				{/* <AnimatedTorus isMobile={isMobile} />
				<AnimatedSphere isMobile={isMobile} /> */}
			</Canvas>
		</div>
    );
}