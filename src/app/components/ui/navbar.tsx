"use client"

import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, MobileMenu, ProductItem } from "./navbar-menu";
import { motion } from "motion/react";
import { MenuIcon, User, User2 } from "lucide-react";
import { useDeviceStore } from "@/app/lib/store/useDeviceStore";

export const Navbar = ({ className }: { className?: string }) => {

    const [active, setActive] = useState<string | null>("");
    const { isMobile } = useDeviceStore();

    return (
        <motion.div 
            className={cn("fixed rounded-full top-10 inset-x-0 max-w-sm mx-auto z-50", className)}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: .5, delay: 1, ease: "easeOut"}}
        >
                {isMobile ? (
                    <MobileMenu />
                ) : (
                    <Menu setActive={setActive}>
                        <MenuItem setActive={setActive} active={active} item="Services">
                        <div className="flex flex-col space-y-4 text-sm font-semibold">
                            <HoveredLink href="/web-dev">Site Vitrine</HoveredLink>
                            <HoveredLink href="/interface-design">Site E-Commerce</HoveredLink>
                            <HoveredLink href="/seo">Application Web</HoveredLink>
                            <HoveredLink href="/branding">S.E.O</HoveredLink>
                        </div>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="Products">
                        <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                            <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                            />
                            <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                            />
                            <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                            />
                            <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                            />
                        </div>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="Pricing">
                        <div className="flex flex-col space-y-4 text-sm font-semibold">
                            <HoveredLink href="/hobby">Hobby</HoveredLink>
                            <HoveredLink href="/individual">Individual</HoveredLink>
                            <HoveredLink href="/team">Team</HoveredLink>
                            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                        </div>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item={User2}>
                        <div className="flex flex-col space-y-4 text-sm font-semibold">
                            <HoveredLink href="#">Se connecter</HoveredLink>
                    
                        </div>
                    </MenuItem>
                </Menu>
                )}
        </motion.div>
    );
}