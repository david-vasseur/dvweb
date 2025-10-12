"use client";
import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";



const transition = {
    type: "spring" as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string | LucideIcon;
  children?: React.ReactNode;
}) => {
  const itemKey =
    typeof item === "string" ? item : item.displayName || item.name || "icon";

  // ✅ On prépare le contenu à afficher
  const ItemContent =
    typeof item === "string" ? (
      <span>{item}</span>
    ) : (
      (() => {
        const Icon = item as LucideIcon; // on cast explicitement pour TS
        return <Icon className="w-5 h-5 text-cyan-400" />;
      })()
    );

  return (
    <div onMouseEnter={() => setActive(itemKey)} className="relative">
      {/* ✅ on remplace <p> par <div> pour éviter le bug SVG */}
      <motion.div
        transition={{ duration: 0.3 }}
        className="cursor-pointer font-bold text-white hover:text-cyan-600 flex items-center gap-2"
      >
        {ItemContent}
      </motion.div>

      {active === itemKey && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"
        >
          <motion.div
            layoutId="active"
            className="rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-tr from-teal-500/90 to-cyan-700/80 shadow-xl backdrop-blur-xs"
          >
            <motion.div layout className="w-max h-full p-4">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
    setActive,
    children,
    }: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
    }) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative rounded-full  shadow-input flex justify-center space-x-6 px-8 py-6 "
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
    }: {
    title: string;
    description: string;
    href: string;
    src: string;
    }) => {
    return (
        <a href={href} className="flex space-x-2">
            <img
                src={src}
                width={140}
                height={70}
                alt={title}
                className="shrink-0 rounded-md shadow-2xl"
            />
        <div>
            <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
            {title}
            </h4>
            <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
            {description}
            </p>
        </div>
        </a>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <a
        {...rest}
        className="text-neutral-200 hover:text-black "
        >
        {children}
        </a>
    );
};
