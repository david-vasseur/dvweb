"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useDeviceStore } from "@/app/lib/store/useDeviceStore";

gsap.registerPlugin(ScrollSmoother);

export default function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const { isMobile, detectDevice } = useDeviceStore();

  useLayoutEffect(() => {
    const cleanupDetect = detectDevice();

    // On attend le layout final avant d'initialiser
    const timeout = setTimeout(() => {
      // 🧩 Si desktop : smoother
      if (!isMobile) {
        smootherRef.current = ScrollSmoother.create({
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
        });
      }
    }, 150);

    return () => {
      clearTimeout(timeout);
      cleanupDetect?.();
      smootherRef.current?.kill();
    };
  }, [isMobile]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
