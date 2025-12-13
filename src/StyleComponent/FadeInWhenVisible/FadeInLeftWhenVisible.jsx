// src/components/FadeInLeftWhenVisible.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FadeInLeftWhenVisible({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}         // görünməz və solda
      whileInView={{ opacity: 1, x: 0 }}        // görünəndə tam görünsün və orijinal yerə gəlsin
      transition={{ duration: 1 }}              // 1 saniyəlik animasiya
      viewport={{ once: true, amount: 0.2 }}    // 20%-i göründükdə işə düşsün
    >
      {children}
    </motion.div>
  );
}
