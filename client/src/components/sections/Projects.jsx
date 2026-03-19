import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi';
import api from '../../api/axios';
import './Projects.css';

const placeholderGradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #00f5ff11 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #1a0d2a 50%, #7c3aed11 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #0d2a1a 50%, #22c55e11 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #2a1a0d 50%, #f59e0b11 100%)',
];

const defaultProjects = [
  {
    _id: '1', title: 'Library Management system',
    technologies: ['React', 'Node.js', 'MongoDB'], liveUrl: '#', githubUrl: 'https://github.com/Somanashraf/Somanashraf-FA23-BSE153-AWT/tree/main/LMS',
  },
  {
    _id: '2', title: 'Card App',
    technologies: ['Flutter', 'Dart'], liveUrl: '#', githubUrl: 'https://github.com/Somanashraf/FA23-153-Soman/tree/main/card_app',
  },
  {
    _id: '3', title: 'Task Manager App',
    technologies: ['React', 'Node.js', 'MongoDB', 'Framer Motion'], liveUrl: '#', githubUrl: 'https://github.com/Somanashraf/FA23-153-Soman/tree/main/task_manager_app',
  },
  {
    _id: '4', title: 'POS App',
    technologies: ['Flutter', 'Dart', 'Firebase'], liveUrl: '#', githubUrl: 'https://github.com/Somanashraf/FA23-153-Soman/tree/main/POS_APP_LAB_FINAL',
  },
  {
    _id: '5', title: 'AFC Pizza',
    technologies: ['React', 'Node.js', 'MongoDB', 'PHP', 'Laravel'], liveUrl: '#', githubUrl: 'https://github.com/Somanashraf/AFC-Pizza-Website',
  },
];

function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    api.get('/projects').then(r => { if (r.data.length) setProjects(r.data); }).catch(() => { });
  }, []);

  return (
    <div className="section projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project, i) => (
            <motion.div key={project._id} variants={cardAnim} style={{ perspective: 1000 }}>
              <TiltCard className="project-card card">
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="project-placeholder" style={{ background: placeholderGradients[i % placeholderGradients.length] }}>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <FiCode size={40} className="placeholder-icon" />
                      </motion.div>
                      <span className="placeholder-title">{project.title}</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <motion.a href={project.liveUrl} target="_blank" rel="noreferrer"
                          className="project-link"
                          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                        >
                          <FiExternalLink size={16} /> Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <motion.a href={project.githubUrl} target="_blank" rel="noreferrer"
                          className="project-link"
                          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                        >
                          <FiGithub size={16} /> GitHub
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies?.map(tech => (
                      <motion.span key={tech} className="tag"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 8px var(--neon-glow)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.liveUrl && (
                      <motion.a href={project.liveUrl} target="_blank" rel="noreferrer"
                        className="btn btn-primary project-btn"
                        whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0,245,255,0.3)' }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <FiExternalLink size={14} /> Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="btn btn-outline project-btn"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <FiGithub size={14} /> GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
