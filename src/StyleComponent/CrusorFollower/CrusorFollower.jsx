import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const targetCursor = window.getComputedStyle(e.target).cursor;
      setVisible(targetCursor !== "pointer");
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX - 6}px, ${currentY - 6}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveHandler);
    animate();

    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: "12px",
        height: "12px",
        backgroundColor: "#5D56F1",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
        // marginTop:"-100px"
      }}
    />
  );
}
