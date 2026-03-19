import { FiGithub, FiLinkedin, FiMail, FiHeart, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-logo">
            <span style={{ color: 'var(--neon)' }}>&lt;</span>MSA<span style={{ color: 'var(--neon)' }}>/&gt;</span>
          </div>
          <p className="footer-tagline">Full Stack Developer crafting modern web experiences.</p>
        </motion.div>

        <motion.div
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-link" title="GitHub">
            <FiGithub size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-link" title="LinkedIn">
            <FiLinkedin size={20} />
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="footer-social-link"
            title="Contact Me"
          >
            <FiMail size={20} />
          </button>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Twitter">
            <FiTwitter size={20} />
          </a>
          <a
            href="https://wa.me/923087541795?text=Hello%2C%20I%20connected%20through%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch!"
            target="_blank" rel="noreferrer"
            className="footer-social-link whatsapp"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </motion.div>

        <motion.button
          className="scroll-top-btn"
          onClick={scrollTop}
          title="Back to top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
        >
          <FiArrowUp size={18} />
        </motion.button>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Made with <FiHeart className="heart" /> by <span className="neon-text">Muhammad Soman Ashraf</span></p>
          <p className="footer-year">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
