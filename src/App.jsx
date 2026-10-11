import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsCarousel3D from './components/ProjectsCarousel3D';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import { projects } from './data/projects';

export default function App() {
  // Stato basato sull'indice del progetto per abilitare navigazione circolare
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const handleOpenModal = (project, index) => {
    if (typeof index === 'number' && index >= 0 && index < projects.length) {
      setSelectedProjectIndex(index);
    } else if (project) {
      const idx = projects.findIndex((p) => p.id === project.id);
      setSelectedProjectIndex(idx !== -1 ? idx : 0);
    }
  };

  const handleCloseModal = () => {
    setSelectedProjectIndex(null);
  };

  // Navigazione circolare (loop) al progetto successivo
  const handleNextProject = () => {
    setSelectedProjectIndex((prev) =>
      prev === null ? 0 : (prev + 1) % projects.length
    );
  };

  // Navigazione circolare (loop) al progetto precedente
  const handlePrevProject = () => {
    setSelectedProjectIndex((prev) =>
      prev === null ? 0 : (prev - 1 + projects.length) % projects.length
    );
  };

  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  useEffect(() => {
    // Disabilita il ripristino automatico dello scroll del browser
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Rimuove eventuali hash (#progetti) dall'URL senza ricaricare la pagina
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Forza lo scroll in cima alla pagina istantaneamente
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-base text-secondary flex flex-col font-sans selection:bg-accent selection:text-base">
      {/* 1. Navbar Fissa / Sticky */}
      <Navbar />

      {/* Contenuto Principale SPA */}
      <main className="flex-1">
        {/* 2. Hero Section (#intro) */}
        <Hero />

        {/* 3. Carosello Progetti 3D (#progetti) */}
        <ProjectsCarousel3D
          projects={projects}
          onSelectProject={handleOpenModal}
        />
      </main>

      {/* 4. Modale Fullscreen Dettaglio Progetto con Navigazione Circolare Next/Prev */}
      <ProjectModal
        project={selectedProject}
        projects={projects}
        currentIndex={selectedProjectIndex}
        onClose={handleCloseModal}
        onNextProject={handleNextProject}
        onPrevProject={handlePrevProject}
      />

      {/* 5. Footer Minimale */}
      <Footer />
    </div>
  );
}
