import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Intro.css';

const WORDS = ['Developer', 'Designer', 'Creator'];

export default function Intro({ onDone }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Cycle words
  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(t);
  }, []);

  // Auto exit after 3.8s
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 3800);
    const t2 = setTimeout(() => onDone(), 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const letters = 'Welcome'.split('');

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          className="intro"
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Noise texture overlay */}
          <div className="intro-noise" />

          {/* Animated mesh orbs */}
          <motion.div className="intro-orb orb-1"
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div className="intro-orb orb-2"
            animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.8, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div className="intro-orb orb-3"
            animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.85, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Grid */}
          <div className="intro-grid" />

          <div className="intro-content">
            {/* Welcome — letter by letter */}
            <div className="intro-welcome">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* "to my" */}
            <motion.p
              className="intro-to"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              to my
            </motion.p>

            {/* Portfolio */}
            <motion.div
              className="intro-portfolio"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio
            </motion.div>

            {/* Cycling role word */}
            <motion.div
              className="intro-role-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <span className="intro-iam">I am a </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  className="intro-role"
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Name */}
            <motion.p
              className="intro-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              Muhammad Soman Ashraf
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="intro-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <motion.div
                className="intro-bar"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 2.3, duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="intro-corner tl" />
          <div className="intro-corner tr" />
          <div className="intro-corner bl" />
          <div className="intro-corner br" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
