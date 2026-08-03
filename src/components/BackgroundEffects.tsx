import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export const BackgroundEffects: React.FC<{ page: number }> = ({ page }) => {
  // Generate random soft pastel particles
  const particles = useMemo(() => {
    const colors = [
      'rgba(242, 196, 206, 0.45)', // blush pink
      'rgba(234, 220, 207, 0.45)', // warm beige
      'rgba(216, 164, 177, 0.35)', // dusty rose
      'rgba(243, 239, 245, 0.5)',  // soft lavender
      'rgba(235, 240, 236, 0.4)'   // sage
    ];

    const list: Particle[] = [];
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 14 + 6,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gentle ambient light glows */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-60 transition-colors duration-1000"
        style={{
          background: page === 3 
            ? 'radial-gradient(circle, rgba(243, 235, 225, 0.8) 0%, rgba(250, 245, 239, 0) 70%)'
            : 'radial-gradient(circle, rgba(252, 225, 230, 0.8) 0%, rgba(252, 239, 239, 0) 70%)'
        }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-60 transition-colors duration-1000"
        style={{
          background: page === 3
            ? 'radial-gradient(circle, rgba(234, 220, 207, 0.7) 0%, rgba(250, 245, 239, 0) 70%)'
            : 'radial-gradient(circle, rgba(242, 196, 206, 0.7) 0%, rgba(252, 239, 239, 0) 70%)'
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
          }}
          animate={{
            y: ['0px', '-40px', '0px'],
            x: ['0px', '20px', '0px'],
            scale: [1, 1.25, 1],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Occasional floating sparkle symbols */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-[#D8A4B1]/40 text-xs select-none"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};
