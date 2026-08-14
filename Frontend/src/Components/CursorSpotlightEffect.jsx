import { useEffect, useState } from "react";

const CursorSpotlightEffect = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 h-80 w-80 rounded-full
                 bg-blue-500/20 blur-3xl"
     style={{
  left: position.x - 160,
  top: position.y - 160,
  transition: "left 0.15s ease-out, top 0.15s ease-out",
}}
    />
  );
};

export default CursorSpotlightEffect;