import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from '../components/Intro';
import SideMenu from '../components/SideMenu';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollProgress from '../components/ScrollProgress';

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Portfolio always mounted underneath */}
      <ScrollProgress />
      <AnimatedBackground />
      <SideMenu />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />

      {/* Intro overlays on top, auto-exits */}
      <AnimatePresence>
        {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
    </>
  );
}
