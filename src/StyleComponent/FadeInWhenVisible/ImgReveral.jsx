import React from "react";
import { motion } from "framer-motion";

export default function ImageReveal({ src, alt, style, duration = 2 }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
      initial={{ clipPath: "inset(0% 100% 0% 0%)" }} // Sağ tərəfdən tam gizli, soldan başlayır
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}   // Tam görünür
      transition={{ duration, ease: "easeInOut" }}
    />
  );
}
