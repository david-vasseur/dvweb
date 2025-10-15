"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LucideIcon, MenuIcon, X } from "lucide-react";
import { div } from "framer-motion/client";
import Image from "next/image";



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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const MobileMenu = () => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const NUM_BANDS = 4;
	const bands = Array.from({ length: NUM_BANDS });

	return (
		<nav className="relative">
			<div className="relative h-[10vh] flex justify-between items-center z-50">
				<div>
					<Image src={"/logo.png"} width={100} height={100} alt="logo" />
				</div>
				<div onClick={() => setIsOpen(!isOpen)}>
					<AnimatePresence mode="wait">
					{isOpen ? (
						<motion.div
							key="close"
							initial={{ opacity: 0, rotate: -90 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: 90 }}
							transition={{ duration: 0.2 }}
						>
							<X className={`w-8 h-8 text-cyan-100`} />
						</motion.div>						
					) : (
						<motion.div
							key="menu"
							initial={{ opacity: 0, rotate: 90 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: -90 }}
							transition={{ duration: 0.2 }}
						>
							<MenuIcon className="w-8 h-8 text-cyan-400" />
						</motion.div>						
					)}
					</AnimatePresence>
				</div>			
			</div>
			<AnimatePresence mode="wait">
				{isOpen && (
          		<>			
					<motion.div 
						 key="overlay"
						className="fixed backdrop-blur-[0.5px] inset-0 z-20 flex"
						initial="initial"
						animate="animate"
						exit="exit"
					>
						{bands.map((_, i) => (
							<motion.div
								key={i}
								className="flex-1 bg-black"
								variants={{
									initial: { translateX: "600%" },
									animate: { translateX: 0 },
									exit: { translateX: "600%" },
								}}
								transition={{
									duration: 0.6,
									ease: "easeInOut",
									delay: i * 0.05, 
								}}
							/>
						))}
					</motion.div>		
					<motion.ul 
						className="relative z-30 space-y-6 text-3xl mt-20 font-bold text-cyan-500"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2, delay: 0.5, ease: "easeInOut" }}
					>
						{["Acceuil", "Services", "Portfolio", "Contact"].map((item, index) => (
						<motion.li 
							key={index}
							initial={{ opacity: 0, translateY: 100 }}
							animate={{ opacity: 1, translateY: 0 }}
							exit={{ opacity: 0, translateY: 100, transition: { duration: 0.2 } }} // sans delay ici
							transition={{
							duration: 0.2,
							delay: isOpen ? 0.3 + index * 0.2 : 0, // delay seulement à l'ouverture
							ease: "easeInOut",
							}}
						>
							{item}
						</motion.li>
						))}
					</motion.ul>	
				</>		
				)}
			</AnimatePresence>
		</nav>
	)
}
