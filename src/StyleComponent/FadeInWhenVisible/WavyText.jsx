import React from "react";
import { motion } from "framer-motion";

export default function WavyText({ text }) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"      // Scroll zamanı görünəndə animasiya başlasın
      viewport={{ once: true, amount: 0.2 }}  // yalnız 1 dəfə, 20% görünmə səviyyəsi
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
