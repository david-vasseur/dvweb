'use client';

import { useDeviceStore } from '@/app/lib/store/useDeviceStore';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';



function FloatingParticles({ isMobile}: { isMobile: boolean }) {

const count = isMobile ? 5 : 20;
const meshRef = useRef<THREE.InstancedMesh>(null);

useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        dummy.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 15
        );
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        dummy.updateMatrix();
        dummy.scale.set(1, 1, 1);
        meshRef.current!.setMatrixAt(i, dummy.matrix);
}
    meshRef.current!.instanceMatrix.needsUpdate = true;
}, []);

useFrame((state) => {
  meshRef.current!.rotation.y = state.clock.elapsedTime * 0.05;
  meshRef.current!.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
});

return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#61dafb" roughness={0.4} metalness={0.8} transparent wireframe />
    </instancedMesh>
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
        wireframe
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
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} intensity={1} />
				<FloatingParticles isMobile={isMobile} />
				<AnimatedTorus isMobile={isMobile} />
				<AnimatedSphere isMobile={isMobile} />
			</Canvas>
		</div>
    );
}