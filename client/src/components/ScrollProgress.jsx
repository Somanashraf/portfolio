import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', background: 'linear-gradient(90deg, #00f5ff, #7c3aed)',
        transformOrigin: '0%', zIndex: 9999,
        boxShadow: '0 0 10px rgba(0,245,255,0.8)',
      }}
    />
  );
}
