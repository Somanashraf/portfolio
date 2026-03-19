import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setIsHover(!!e.target.closest('a,button,.card,.skill-card,.project-card'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 200, y: pos.y - 200, scale: isHover ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        style={{
          position: 'fixed', width: 400, height: 400,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          position: 'fixed', width: 12, height: 12,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          background: 'var(--neon)', opacity: 0.7,
          boxShadow: '0 0 10px var(--neon)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
