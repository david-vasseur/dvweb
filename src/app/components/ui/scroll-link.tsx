"use client"

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function ScrollLink({ to, children }: { to: string; children: React.ReactNode }) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // empêche le saut instantané
        const element = document.querySelector(to);
        if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // <-- scroll fluide
        }
  };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}
