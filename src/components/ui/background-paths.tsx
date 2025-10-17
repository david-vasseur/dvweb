"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useContainerSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function update() {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        setSize({ width: r.width, height: r.height });
      } else {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
    }
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, size };
}

export default function BackgroundPaths({ position = 1 }: { position?: number }) {
  // --- Étape 1: convertir ton exemple en ratios ---
  // Exemple donné : écran 100 x 50, start=(0,15), end=(100,40)
  // ratios :
  const startRatio = { x: 0 / 100, y: 15 / 50 }; // { x: 0, y: 0.3 }
  const endRatio = { x: 150 / 100, y: 40 / 50 }; // { x: 1, y: 0.8 }

  const { ref, size } = useContainerSize();
  const { width, height } = size;

  // sécurités
  const W = Math.max(1, width || window.innerWidth);
  const H = Math.max(1, height || window.innerHeight);

  // Générer plusieurs paths en gardant la même "courbure générale"
  const paths = Array.from({ length: 12 }, (_, i) => {
    // positions en pixels calculées depuis les ratios
    const startX = startRatio.x * W;
    const startY = startRatio.y * H;

    const endX = endRatio.x * W;
    const endY = endRatio.y * H;

    // Points de contrôle pour conserver une belle courbure :
    // on s'appuie sur une fraction de la largeur/hauteur et on décale avec i et position
    const spreadX = 1.5 * W; // distance approximative des contrôles sur l'axe X
    const spreadY = 0.15 * H; // distance approximative des contrôles sur l'axe Y

    const control1X = startX + (spreadX * (i / 12)) * position; // décalage progressif
    const control1Y = startY - spreadY * (0.5 + i / 24); // légèrement au dessus du start

    const control2X = endX - (spreadX * (1 - i / 12)) * position;
    const control2Y = endY + spreadY * (0.5 + i / 24); // légèrement en dessous de l'end

    const d = `M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;

    return {
      id: i,
      d,
      strokeOpacity: Math.min(0.9, 0.08 + i * 0.06),
      strokeWidth: 2 + i * 0.06,
    };
  });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none">
        <title>Responsive Paths</title>
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.strokeWidth}
            strokeOpacity={p.strokeOpacity}
            fill="none"
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + (p.id % 5) * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "opacity, stroke-dashoffset" }}
          />
        ))}
      </svg>
    </div>
  );
}



// "use client";

// import { motion } from "framer-motion";

// function FloatingPaths({ position }: { position: number }) {
//     const paths = Array.from({ length: 6 }, (_, i) => ({
//         id: i,
//         d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
//             380 - i * 5 * position
//         } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
//             152 - i * 5 * position
//         } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
//             684 - i * 5 * position
//         } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
//         color: `rgba(15,23,42,${0.1 + i * 0.03})`,
//         width: 0.9 + i * 0.03,
//     }));

//     return (
//         <div className="absolute inset-0 pointer-events-none">
//             <svg
//                 className="w-full h-full text-slate-950 dark:text-cyan-500"
//                 viewBox="0 0 696 316"
//                 fill="none"
//             >
//                 <title>Background Paths</title>
//                 {paths.map((path) => (
//                     <motion.path
//                         key={path.id}
//                         d={path.d}
//                         stroke="currentColor"
//                         strokeWidth={path.width}
//                         strokeOpacity={0.1 + path.id * 0.03}
//                         initial={{ pathLength: 0.3, opacity: 0.6 }}
//                         animate={{
//                             pathLength: 1,
//                             opacity: [0.3, 0.6, 0.3],
//                             pathOffset: [0, 1, 0],
//                         }}
//                         transition={{
//                             duration: 20 + Math.random() * 10,
//                             repeat: Number.POSITIVE_INFINITY,
//                             ease: "linear",
//                         }}
//                     />
//                 ))}
//             </svg>
//         </div>
//     );
// }

// export function BackgroundPaths({
//     title = "Background Paths",
// }: {
//     title?: string;
// }) {
//     const words = title.split(" ");

//     return (
        
//             <div className="absolute inset-0">
//                 <FloatingPaths position={1} />
//                 <FloatingPaths position={-1} />
//             </div>
//     );
// }
