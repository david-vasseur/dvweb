'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from "@react-three/drei";

function FloatingParticles() {
    // const particlesRef = useRef<THREE.Points>(null);
    // const count = 200;
    // const circleTexture = useTexture("/particule.png");

    // const positions = useMemo(() => {
    //     const pos = new Float32Array(count * 3);
    //     for (let i = 0; i < count * 3; i += 3) {
    //         pos[i] = (Math.random() - 0.5) * 50;
    //         pos[i + 1] = (Math.random() - 0.5) * 30;
    //         pos[i + 2] = (Math.random() - 0.5) * 15;
    //     }
    //     return pos;
    // }, []);

    // useFrame((state) => {
    //     if (particlesRef.current) {
    //         particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    //         particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    //     }
    // });

//     const positions = useMemo(() => {
//     const pos = new Float32Array(count * 3);
//     for (let i = 0; i < count * 3; i += 3) {
//       pos[i] = (Math.random() - 0.5) * 50;
//       pos[i + 1] = (Math.random() - 0.5) * 30;
//       pos[i + 2] = (Math.random() - 0.5) * 15;
//     }
//     return pos;
//   }, []);

//   // phases aléatoires (pour ne pas que tout bouge pareil)
//   const phases = useMemo(() => {
//     const arr = new Float32Array(count);
//     for (let i = 0; i < count; i++) {
//       arr[i] = Math.random() * Math.PI * 2;
//     }
//     return arr;
//   }, []);

//   useFrame((state) => {
//     const t = state.clock.elapsedTime;
//     const points = particlesRef.current;
//     if (!points) return;

//     // 🌀 animation globale
//     points.rotation.y = t * 0.05;
//     points.rotation.x = Math.sin(t * 0.1) * 0.1;

//     // ✨ micro oscillations individuelles
//     const pos = points.geometry.attributes.position;
//     const arr = pos.array as Float32Array;

//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
//       const phase = phases[i];

//       // ajout d’un léger offset pseudo-aléatoire
//       arr[i3 + 0] += Math.sin(t * 1.2 + phase) * 0.003; // X
//       arr[i3 + 1] += Math.cos(t * 1.5 + phase) * 0.002; // Y
//       arr[i3 + 2] += Math.sin(t * 1.8 + phase) * 0.0015; // Z
//     }

//     pos.needsUpdate = true;
//   });

//     return (
//         <points ref={particlesRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     args={[positions, 3]}
//                 />
//             </bufferGeometry>
//             <pointsMaterial
//                 map={circleTexture}          
//                 alphaTest={0.5}   
//                 size={0.15}
//                 color="#61dafb"
//                 transparent
//                 opacity={0.6}
//                 sizeAttenuation
//             />
//         </points>
//     );

const count = 20;
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

function AnimatedTorus() {
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
      <torusGeometry args={[2, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#149eca"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}


function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      sphereRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.8;
    }
  });

  return (
    <mesh ref={sphereRef} position={[-5, 0, -3]}>
      <sphereGeometry args={[1.5, 32, 32]} />
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
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingParticles />
        <AnimatedTorus />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}