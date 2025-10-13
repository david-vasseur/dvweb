"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useDeviceStore } from "@/app/lib/store/useDeviceStore";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const smootherRef = useRef<any>(null);
    const { isMobile, detectDevice } = useDeviceStore();

    useEffect(() => {
        const cleanupDetect = detectDevice();

        if (!isMobile) {
            smootherRef.current = ScrollSmoother.create({
                smooth: 1.5,
                effects: true,
                smoothTouch: 0.1,
            });
        }

        return () => {
            cleanupDetect?.();
            smootherRef.current?.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile]);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    );
}
