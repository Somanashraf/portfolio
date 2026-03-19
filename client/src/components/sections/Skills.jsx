import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaPython } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiTailwindcss, SiFlutter, SiCplusplus, SiCanva, SiFacebook } from 'react-icons/si';
import api from '../../api/axios';
import './Skills.css';

const iconMap = {
  HTML: { icon: FaHtml5, color: '#e34f26' },
  CSS: { icon: FaCss3Alt, color: '#1572b6' },
  JavaScript: { icon: FaJs, color: '#f7df1e' },
  React: { icon: FaReact, color: '#61dafb' },
  Tailwind: { icon: SiTailwindcss, color: '#38bdf8' },
  'Node.js': { icon: FaNodeJs, color: '#68a063' },
  Express: { icon: SiExpress, color: '#94a3b8' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  Flutter: { icon: SiFlutter, color: '#54c5f8' },
  'C++': { icon: SiCplusplus, color: '#00599c' },
  Git: { icon: FaGitAlt, color: '#f05032' },
  Canva: { icon: SiCanva, color: '#00c4cc' },
  'FB Ads': { icon: SiFacebook, color: '#1877f2' },
  Python: { icon: FaPython, color: '#3776ab' },
};

const defaultSkills = [
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'Tailwind', level: 82, category: 'Frontend' },
  { name: 'Node.js', level: 82, category: 'Backend' },
  { name: 'Express', level: 80, category: 'Backend' },
  { name: 'MongoDB', level: 78, category: 'Backend' },
  { name: 'Flutter', level: 72, category: 'Mobile' },
  { name: 'C++', level: 70, category: 'Languages' },
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'Canva', level: 80, category: 'Tools' },
  { name: 'FB Ads', level: 65, category: 'Tools' },
];

function getLevelLabel(level) {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Beginner';
}

const grid = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const card = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/skills').then(r => { if (r.data?.length) setSkills(r.data); }).catch(() => {});
  }, []);

  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <div className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Tools and technologies I work with</p>
        </motion.div>

        <motion.div
          className="skill-filters"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="skills-grid"
            variants={grid}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {filtered.map((skill) => {
              const meta = iconMap[skill.name] || { icon: FaDatabase, color: '#94a3b8' };
              const Icon = meta.icon;
              const label = getLevelLabel(skill.level);
              return (
                <motion.div
                  key={skill._id || skill.name}
                  className="skill-card"
                  variants={card}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <motion.div
                    className="skill-icon-wrap"
                    style={{ '--skill-color': meta.color }}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={28} color={meta.color} />
                  </motion.div>
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-level-badge level-${label.toLowerCase()}`}>{label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
