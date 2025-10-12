import React from "react";

export const GradientBlurTop: React.FC = () => {
  const layers = Array.from({ length: 6 }, (_, i) => {
    const blur = (i + 1) * 3; // intensité du flou
    const opacity = 0.15 + i * 0.12; // légère transparence
    const gradient = `linear-gradient(to top, transparent ${(i * 10)}%, black ${(i + 1) * 10}%)`;

    return (
      <div
        key={i}
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: gradient,
          WebkitMaskImage: gradient,
          opacity,
        }}
      />
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-40 pointer-events-none z-40">
      {layers}
    </div>
  );
};
