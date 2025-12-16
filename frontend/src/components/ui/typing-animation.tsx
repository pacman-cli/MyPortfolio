"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export const TypingAnimation = ({ text }: { text: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 2, // Slow and smooth, 2 seconds total
      ease: "easeInOut",
      onComplete: () => setShowCursor(false) // Hide cursor after typing
    });
    return controls.stop;
  }, []);

  return (
    <span className="inline-flex items-center">
      <motion.span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {displayText}
      </motion.span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: text.length > 0 ? 0 : Infinity, repeatType: "reverse" }} // Blink only while waiting/typing if needed, or constant blink
          className="w-[3px] h-[1em] bg-blue-500 ml-1 inline-block"
        />
      )}
    </span>
  );
};
