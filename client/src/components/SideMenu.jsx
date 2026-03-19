import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiMenu, FiSun, FiMoon, FiDownload,
  FiHome, FiUser, FiCpu, FiBriefcase, FiMessageSquare
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './SideMenu.css';

const navItems = [
  { label: 'Home',     icon: FiHome,          id: 'home' },
  { label: 'About',    icon: FiUser,          id: 'about' },
  { label: 'Skills',   icon: FiCpu,           id: 'skills' },
  { label: 'Projects', icon: FiBriefcase,     id: 'projects' },
  { label: 'Contact',  icon: FiMessageSquare, id: 'contact' },
];

export default function SideMenu() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <motion.button
        className="nav-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'm'}
            initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="nav-drawer"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
          >

            {/* Header */}
            <div className="nd-header">
              <button className="nd-close" onClick={() => setOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            {/* Profile */}
            <div className="nd-profile">
              <div className="nd-avatar-ring">
                <img
                  src="/profile.jpeg"
                  alt="Muhammad Soman"
                  className="nd-avatar"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="nd-avatar-fb">M</div>
              </div>
              <div className="nd-profile-info">
                <p className="nd-name">Muhammad Soman</p>
                <p className="nd-role">Full Stack Developer</p>
                <span className="nd-status">
                  <span className="nd-dot" />
                  Open to work
                </span>
              </div>
            </div>

            {/* Nav */}
            <nav className="nd-nav">
              {navItems.map(({ label, icon: Icon, id }, i) => (
                <motion.button
                  key={id}
                  className={`nd-item ${active === id ? 'active' : ''}`}
                  onClick={() => scrollTo(id)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="nd-icon"><Icon size={16} /></span>
                  <span className="nd-label">{label}</span>
                  {active === id && (
                    <motion.span className="nd-active-dot" layoutId="activeDot" />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Divider */}
            <div className="nd-divider" />

            {/* Footer */}
            <div className="nd-footer">
              <a
                className="nd-resume"
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <FiDownload size={15} />
                Download Resume
              </a>
              <div className="nd-footer-row">
                <button className="nd-theme" onClick={toggleTheme}>
                  {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button className="nd-hire" onClick={() => scrollTo('contact')}>
                  Hire Me
                </button>
              </div>
            </div>

          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
