const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: { type: String, default: 'Muhammad Soman Ashraf' },
  title: { type: String, default: 'Full Stack Developer' },
  bio: { type: String, default: 'Passionate full-stack developer and CS student at COMSATS University Islamabad, Vehari Campus. I specialize in building modern, scalable web and mobile applications using the MERN stack and Flutter.' },
  email: { type: String, default: 'somanashraf17@gmail.com' },
  phone: { type: String, default: '' },
  location: { type: String, default: 'Hasilpur, Pakistan' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  avatar: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  yearsOfExperience: { type: Number, default: 0 },
  projectsCompleted: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
