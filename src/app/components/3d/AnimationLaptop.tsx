"use client"

import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, forwardRef } from "react";
import Laptop, { LaptopHandles } from "./Laptop";

type AnimationLaptopProps = {
  children?: ReactNode;
};

const AnimationLaptop = forwardRef<HTMLDivElement, AnimationLaptopProps>((props, ref) => {

    const { children } = props;

    return (
        <div ref={ref} className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }} style={{ background: "transparent" }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[0, 5, 5]} intensity={10} castShadow />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
});

AnimationLaptop.displayName = "AnimationLaptop";

export default AnimationLaptop;
