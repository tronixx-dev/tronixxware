import { useEffect, useState } from "react";

export default function FlyingImage({ src, start, end, onComplete }) {
  const [style, setStyle] = useState({
    position: "fixed",
    top: start.y,
    left: start.x,
    width: 60,
    height: 60,
    borderRadius: "8px",
    zIndex: 140,
    pointerEvents: "none",
    transform: "translate(0,0) scale(1)",
    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s",
  });

  useEffect(() => {
    // small timeout to trigger transition
    const timeout = setTimeout(() => {
      const deltaX = end.x - start.x;
      const deltaY = end.y - start.y;

      setStyle((prev) => ({
        ...prev,
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.1)`,
        opacity: 0,
      }));
    }, 50);

    // call onComplete after transition
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 850);

    return () => {
      clearTimeout(timeout);
      clearTimeout(completeTimeout);
    };
  }, [start, end, onComplete]);

  return <img src={src} style={style} alt="fly" />;
}
