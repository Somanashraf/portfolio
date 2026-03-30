import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import api from '../../api/axios';
import './Hero.css';

export default function Hero() {
  const [about, setAbout] = useState({
    name: 'Muhammad Soman Ashraf', title: 'Full Stack Developer',
    github: 'https://github.com/Somanashraf', linkedin: 'https://linkedin.com/in/muhammad-soman-ashraf-746766258',
    email: 'somanashraf17@gmail.com', resumeUrl: '', avatar: '/profile/profile1.jpeg',
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-400, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [-400, 400], [-15, 15]);

  useEffect(() => {
    api.get('/about').then(r => setAbout(prev => ({
      ...prev, ...r.data, avatar: prev.avatar,
    }))).catch(() => {});
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0); mouseY.set(0);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <motion.div className="hero-glow"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="hero-glow hero-glow-2"
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.8, 0.4], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container hero-content">
        <motion.div className="hero-text" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="hero-badge">
            <span className="badge-dot" />
            Available for exciting new projects
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            ><FiArrowRight size={14} /></motion.span>
          </motion.div>

          <motion.h1 variants={item} className="hero-name">
            Hi, I'm <br />
            <motion.span
              className="gradient-text"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {about.name ? about.name.split(' ').slice(0, 2).join(' ') : 'Muhammad Soman'}
            </motion.span>
            <br />
            {about.name ? about.name.split(' ').slice(2).join(' ') : 'Ashraf'}
          </motion.h1>

          <motion.div variants={item} className="hero-title">
            <TypeAnimation
              sequence={['Full Stack Developer', 2000, 'Creative Problem Solver', 2000, 'MERN Stack Expert', 2000, 'Flutter Developer', 2000, 'UI/UX Enthusiast', 2000]}
              wrapper="span" speed={50} repeat={Infinity} className="typed-text"
            />
          </motion.div>

          <motion.p variants={item} className="hero-bio">
            Passionate developer crafting modern, scalable web & mobile applications with beautiful UI architecture and exceptional user experiences. Turning ideas into hyper-performant realities.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <motion.button className="btn btn-primary" onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work <FiArrowRight size={18} />
            </motion.button>
            <motion.button className="btn btn-ghost" onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <FiMail size={18} /> Collaborate
            </motion.button>
            <motion.a
              className="btn btn-ghost"
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              title="Opens Resume"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <FiDownload size={18} /> Resume
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            {[
              { href: about.github || 'https://github.com', icon: FiGithub, label: 'GitHub' },
              { href: about.linkedin || 'https://linkedin.com', icon: FiLinkedin, label: 'LinkedIn' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                className="social-link" title={label}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
            <motion.button className="social-link" title="Contact"
              onClick={() => scrollTo('contact')}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMail size={22} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Avatar with extreme 3D tilt and floating chips */}
        <motion.div className="hero-visual"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <motion.div className="hero-avatar-wrapper" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <div className="avatar-ring" />
            <div className="avatar-ring avatar-ring-2" />
            <div className="avatar-ring avatar-ring-3" />
            
            {about.avatar
              ? <img src={about.avatar} alt={about.name} className="avatar-photo" />
              : <div className="avatar-placeholder"><span>{about.name?.charAt(0) || 'M'}</span></div>
            }
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="scroll-indicator" onClick={() => scrollTo('about')}
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Discover More</span>
      </motion.div>
    </div>
  );
}

