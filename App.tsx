import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Craft } from './components/Craft';
import { Projects } from './components/Projects';
import { WorkIndex } from './components/WorkIndex';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Availability } from './components/Availability';
import { Credentials } from './components/Credentials';
import { Experience } from './components/Experience';
import { Leadership } from './components/Leadership';
import { Engineering } from './components/Engineering';
import { Writing } from './components/Writing';
import { Now } from './components/Now';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { ThemeProvider } from './contexts/ThemeContext';
import { Project } from './types';
import { useState, useEffect } from 'react';
import { initScrollReveal } from './utils/scrollReveal';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      const timer = setTimeout(() => {
        initScrollReveal();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen bg-background">
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={() => {
              setSelectedProject(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            <Navbar />
            <main className="w-full">
              <Hero />
              <Craft />
              <Projects onProjectSelect={setSelectedProject} />
              <WorkIndex />
              <Skills />
              <Services />
              <Availability />
              <Credentials />
              <Experience />
              <Leadership />
              <Engineering />
              <Writing />
              <Now />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;