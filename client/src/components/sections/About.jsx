import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiCalendar, FiGlobe, FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../../api/axios';
import './About.css';

const defaults = {
  name: 'Muhammad Soman Ashraf',
  title: 'Full Stack Developer',
  bio: `I'm a Full Stack Developer and Software Engineering student at COMSATS University, Vehari, passionate about building things that make a difference. I specialize in the MERN stack and Flutter — crafting everything from pixel-perfect UIs to robust backend systems. I write clean, maintainable code and care deeply about performance, design, and user experience. Whether it's a web app or a mobile product, I bring ideas to life with precision and purpose.`,
  email: 'somanashraf17@gmail.com',
  location: 'Hasilpur, Pakistan',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  yearsOfExperience: 2,
  projectsCompleted: 20,
};

const quotes = [
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, v => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const itemRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const [about, setAbout] = useState(defaults);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    api.get('/about').then(r => setAbout(prev => ({ ...prev, ...r.data }))).catch(() => {});
  }, []);

  // Auto-rotate quotes
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setQuoteIdx(i => (i + 1) % quotes.length); }, 5000);
    return () => clearInterval(t);
  }, []);

  const changeQuote = (d) => {
    setDir(d);
    setQuoteIdx(i => (i + d + quotes.length) % quotes.length);
  };

  const stats = [
    { label: 'Years Experience', value: about.yearsOfExperience || 2, suffix: '+' },
    { label: 'Projects Done', value: about.projectsCompleted || 20, suffix: '+' },
    { label: 'Technologies', value: 12, suffix: '+' },
    { label: 'Happy Clients', value: 15, suffix: '+' },
  ];

  const details = [
    { icon: FiBook, label: 'University', value: 'COMSATS University Islamabad, Vehari Campus' },
    { icon: FiMapPin, label: 'Location', value: about.location || 'Hasilpur, Pakistan' },
    { icon: FiMail, label: 'Email', value: about.email || 'somanashraf17@gmail.com', isContact: true },
    { icon: FiCalendar, label: 'Date of Birth', value: '05 November 2004' },
    { icon: FiGlobe, label: 'Languages', value: 'English, Urdu, Punjabi' },
    { icon: FiGlobe, label: 'Nationality', value: 'Pakistani' },
  ];

  const quoteVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.25 } }),
  };

  return (
    <div className="section about-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
          <p className="about-intro">
            I'm a <span className="neon-text">Full Stack Developer</span> and Software Engineering student at COMSATS University, Vehari, passionate about building things that make a difference.
            I specialize in the <span className="neon-text">MERN stack</span> and <span className="neon-text">Flutter</span> — crafting everything from pixel-perfect UIs to robust backend systems.
            I write clean, maintainable code and care deeply about performance, design, and user experience.
            Whether it's a web app or a mobile product, I bring ideas to life with precision and purpose.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Left */}
          <motion.div
            className="about-info"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.h3 variants={item} className="about-name">{about.name}</motion.h3>
            <motion.p variants={item} className="about-title neon-text">{about.title}</motion.p>

            <motion.div variants={container} className="about-details">
              {details.map(({ icon: Icon, label, value, isContact }) => (
                <motion.div key={label} variants={item} className="detail-item"
                  whileHover={{ x: 5 }} transition={{ duration: 0.2 }}
                >
                  <motion.div className="detail-icon-wrap"
                    whileHover={{ scale: 1.15, boxShadow: '0 0 14px var(--neon-glow)' }}
                  >
                    <Icon size={14} />
                  </motion.div>
                  <div className="detail-content">
                    <span className="detail-label">{label}</span>
                    {isContact
                      ? <button className="detail-value link"
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >{value}</button>
                      : <span className="detail-value">{value}</span>
                    }
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={item} className="about-socials">
              {[
                { href: about.github || 'https://github.com', icon: FiGithub, label: 'GitHub' },
                { href: about.linkedin || 'https://linkedin.com', icon: FiLinkedin, label: 'LinkedIn' },
                { href: 'https://wa.me/923087541795?text=Hello%2C%20I%20connected%20through%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch!', icon: FaWhatsapp, label: 'WhatsApp', color: '#25d366' },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  className="social-pill"
                  style={color ? { '--pill-color': color } : {}}
                  whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,229,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={15} /> {label}
                </motion.a>
              ))}
              <motion.button className="social-pill"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,229,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail size={15} /> Email
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="about-right"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            <div className="stats-grid">
              {stats.map((s, i) => (
                <motion.div key={i} className="stat-card card" variants={itemRight}
                  whileHover={{ y: -6, boxShadow: '0 14px 35px rgba(0,229,255,0.14)', borderColor: 'var(--border-neon)' }}
                >
                  <span className="stat-value gradient-text">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Rotating quotes */}
            <motion.div variants={itemRight} className="about-quote card">
              <div className="quote-carousel">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={quoteIdx}
                    custom={dir}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="quote-slide"
                  >
                    <span className="quote-mark">"</span>
                    <p>{quotes[quoteIdx].text}</p>
                    <span className="quote-author">— {quotes[quoteIdx].author}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="quote-controls">
                <button className="quote-btn" onClick={() => changeQuote(-1)}><FiChevronLeft size={16} /></button>
                <div className="quote-dots">
                  {quotes.map((_, i) => (
                    <button key={i} className={`quote-dot ${i === quoteIdx ? 'active' : ''}`}
                      onClick={() => { setDir(i > quoteIdx ? 1 : -1); setQuoteIdx(i); }}
                    />
                  ))}
                </div>
                <button className="quote-btn" onClick={() => changeQuote(1)}><FiChevronRight size={16} /></button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
