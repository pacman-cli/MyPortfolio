"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for better performance than state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on client-side and non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Hide default cursor
    document.body.classList.add('custom-cursor-active');

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') ||
            target.classList.contains('cursor-pointer') || // Tailwind specific
            window.getComputedStyle(target).cursor === 'pointer';

        setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
       return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "white", // Mix-blend-difference makes this invert colors
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 }
      }}
    >
        {/* Optional: Inner solid dot for precision */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50 transition-all duration-300 ${isHovering ? 'w-full h-full opacity-20' : 'w-1 h-1 opacity-0'}`} />
    </motion.div>
  );
};
