"use client"

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

// 👇 on ajoute un type clair pour ce qu’on expose
export type LaptopHandles = {
	laptop: THREE.Object3D | null;
	screen: THREE.Object3D | null;
};

type LaptopProps = {
  onReady?: () => void;
};

const Laptop = forwardRef<LaptopHandles, LaptopProps>(({ onReady }, ref) => {
	const laptopRef = useRef<THREE.Object3D>(null);
	const screenRef = useRef<THREE.Object3D>(null);
	const { scene } = useGLTF("/models/Laptop2.glb");

	useImperativeHandle(ref, () => ({
		laptop: laptopRef.current,
		screen: screenRef.current,
	}));

	useEffect(() => {
		if (laptopRef.current) {
			laptopRef.current.rotation.y = THREE.MathUtils.degToRad(45);
			laptopRef.current.position.set(-2, -1, -6);
		}
	}, []);

	useEffect(() => {
		const checkReady = () => {
			const body = scene.getObjectByName("Body");
			const screenGroup = body?.getObjectByName("Screen");

			if (body && screenGroup) {
				laptopRef.current = scene;
				screenRef.current = screenGroup;
				screenGroup.position.set(0, 0, -0.95);
				screenGroup.rotation.x = degToRad(0);
				screenGroup.scale.set(1, 1, 1);

				onReady?.();
				return true;
			}
			return false;
		};

		if (!checkReady()) {
			// retry après un petit délai
			const interval = setInterval(() => {
				if (checkReady()) clearInterval(interval);
			}, 50);

			return () => clearInterval(interval);
		}
	}, [scene, onReady]);

//   useFrame(() => {
//     const mesh = laptopRef.current;
//     if (!mesh) return;
//     mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, 0, 0.0005);
//     mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, -1, 0.008);
//     mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, -3, 0.0009);
//     mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, 0, 0.0009);
//   });

//   useFrame(() => {
//     if (!screenRef.current) return;
//     screenRef.current.rotation.x = THREE.MathUtils.lerp(screenRef.current.rotation.x, -1.4, 0.004);
//   });

  	return <primitive ref={laptopRef} object={scene} scale={1} />;
});

Laptop.displayName = "Laptop";

export default Laptop;
