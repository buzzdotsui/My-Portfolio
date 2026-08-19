import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Metabotics } from './components/Metabotics';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Writing } from './components/Writing';
import { Leadership } from './components/Leadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { SplashScreen } from './components/effects/SplashScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { Project } from './types';
import { initScrollReveal } from './utils/scrollReveal';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize scroll reveal animations once the splash screen completes
  useEffect(() => {
    if (isReady && !selectedProject) {
      const timer = setTimeout(() => {
        initScrollReveal();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady, selectedProject]);

  return (
    <ThemeProvider>
      <SplashScreen onComplete={() => setIsReady(true)} />
      
      <div className={`transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        {isReady && (
          <div className="relative w-full min-h-screen selection:bg-primary selection:text-white bg-background">
            {selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
              />
            ) : (
              <>
                <Navbar />
                <main className="w-full">
                  <Hero />
                  <About />
                  <Metabotics />
                  <Projects onProjectSelect={setSelectedProject} />
                  <Skills />
                  <Experience />
                  <Writing />
                  <Leadership />
                  <Contact />
                </main>
                <Footer />
              </>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;