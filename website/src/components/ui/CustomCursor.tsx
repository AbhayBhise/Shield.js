"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setHasMoved(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 bg-cyan-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] hidden md:block"
      initial={{ x: -100, y: -100, opacity: 0 }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        opacity: hasMoved ? 1 : 0,
        scale: isHovered ? 1.5 : 1,
        backgroundColor: isHovered ? "rgba(6, 182, 212, 0.4)" : "rgba(6, 182, 212, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
}
