import { useState, useRef } from 'react';

export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angle (max 15 degrees)
    const rotateY = (mouseX / (width / 2)) * 12;
    const rotateX = -(mouseY / (height / 2)) * 12;

    // Calculate glare position in percent
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;

    setCoords({
      rotateX,
      rotateY,
      glareX,
      glareY,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out preserve-3d ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 mix-blend-screen z-20"
        style={{
          background: `radial-gradient(circle 250px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.12), transparent)`,
          opacity: coords.opacity
        }}
      />
      
      {/* Dynamic Border Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] border border-cyan-400/0 z-10 transition-all duration-300"
        style={{
          boxShadow: coords.opacity > 0 
            ? `0 0 30px rgba(6, 182, 212, ${coords.opacity * 0.4})` 
            : 'none',
          borderColor: coords.opacity > 0 
            ? `rgba(6, 182, 212, ${coords.opacity * 1.5})` 
            : 'rgba(255, 255, 255, 0.06)'
        }}
      />

      {children}
    </div>
  );
}
