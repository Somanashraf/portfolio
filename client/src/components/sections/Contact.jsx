import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import './Contact.css';

const socialLinks = [
  { icon: FiGithub,    label: 'GitHub',    href: 'https://github.com',   color: '#fff' },
  { icon: FiLinkedin,  label: 'LinkedIn',  href: 'https://linkedin.com', color: '#0a66c2' },
  { icon: FiMail,      label: 'Gmail',     href: 'https://mail.google.com/mail/?view=cm&to=somanashraf17@gmail.com', color: '#ea4335' },
  { icon: FiTwitter,   label: 'Twitter',   href: 'https://twitter.com',  color: '#1da1f2' },
  { icon: FaWhatsapp,  label: 'WhatsApp',  href: 'https://wa.me/923087541795?text=Hello%2C%20I%20connected%20through%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch!', color: '#25d366' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSent(true);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together on something great</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left — Info + Socials */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's Talk</h3>
            <p>Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.</p>

            <div className="contact-details">
              <motion.div className="contact-detail" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="contact-icon"><FiMail /></div>
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">somanashraf17@gmail.com</span>
                </div>
              </motion.div>
              <motion.div className="contact-detail" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="contact-icon"><FiMapPin /></div>
                <div>
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Hasilpur, Pakistan</span>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="contact-socials">
              <p className="socials-label">Find me on</p>
              <div className="socials-row">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn"
                    title={label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                    <div className="social-glow" style={{ background: color }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            className="contact-form card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {['name', 'email'].map((field, i) => (
              <motion.div
                key={field}
                className="form-group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={field} type={field === 'email' ? 'email' : 'text'}
                  name={field} value={form[field]}
                  onChange={handleChange}
                  placeholder={field === 'name' ? 'Your full name' : 'your@email.com'}
                  className="form-input"
                />
              </motion.div>
            ))}

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                value={form.message} onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows={5} className="form-input"
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`submit-btn ${sent ? 'sent' : ''}`}
              disabled={loading || sent}
              whileHover={!loading && !sent ? { scale: 1.02 } : {}}
              whileTap={!loading && !sent ? { scale: 0.98 } : {}}
            >
              {sent
                ? <><FiCheckCircle size={18} /> Message Sent!</>
                : loading
                  ? <><span className="spinner" /> Sending...</>
                  : <><FiSend size={16} /> Send Message</>
              }
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
