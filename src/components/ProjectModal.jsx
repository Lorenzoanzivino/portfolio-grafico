import { useEffect, useState, useCallback } from 'react';
import { X, Printer, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';

export default function ProjectModal({
  project,
  projects = [],
  currentIndex = null,
  onClose,
  onNextProject,
  onPrevProject,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(project?.id);

  // Resetta l'indice delle viste mockup se cambia il progetto visualizzato
  if (project?.id !== prevProjectId) {
    setPrevProjectId(project?.id);
    setActiveImageIndex(0);
  }

  // Calcolo indice e totale per etichette e navigazione
  const totalProjects = projects.length;
  const currentIdx =
    typeof currentIndex === 'number' && currentIndex >= 0
      ? currentIndex
      : projects && project
        ? projects.findIndex((p) => p.id === project.id)
        : 0;

  // Handler per passare al progetto successivo (con loop circolare)
  const handleNextProject = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (onNextProject) {
        onNextProject();
      }
    },
    [onNextProject]
  );

  // Handler per passare al progetto precedente (con loop circolare)
  const handlePrevProject = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (onPrevProject) {
        onPrevProject();
      }
    },
    [onPrevProject]
  );

  // Supporto Tastiera: Escape per chiudere, ArrowRight per succ, ArrowLeft per prec
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, handleNextProject, handlePrevProject]);

  if (!project) return null;

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.coverImage];

  // Navigazione interna tra le viste mockup del progetto corrente
  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#713600]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-14 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* ========================================================
          PULSANTI DIREZIONALI TRA PROGETTI (Ai lati dello schermo)
          Palette: Sfondo Crema (#F8F5EE), freccia Cioccolato (#713600),
          Hover invertito (#713600 con freccia Crema #F8F5EE)
         ======================================================== */}
      {totalProjects > 1 && (
        <>
          {/* Pulsante Progetto Precedente (Sinistra) */}
          <button
            type="button"
            onClick={handlePrevProject}
            className="fixed left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-[#F8F5EE] text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] border border-[#713600]/25 shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#44553C]"
            aria-label="Progetto precedente"
            title="Progetto precedente (Freccia Sinistra)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          {/* Pulsante Progetto Successivo (Destra) */}
          <button
            type="button"
            onClick={handleNextProject}
            className="fixed right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-[#F8F5EE] text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] border border-[#713600]/25 shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#44553C]"
            aria-label="Progetto successivo"
            title="Progetto successivo (Freccia Destra)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Contenitore interno della Modale */}
      <div
        className="relative w-full max-w-6xl h-[90vh] sm:h-[92vh] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#713600]/20 overflow-hidden flex flex-col lg:flex-row text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante Chiusura X in alto a destra */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#F8F5EE] text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#44553C]"
          aria-label="Chiudi dettaglio progetto"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PARTE SINISTRA: Mini-Carosello & Griglia Mockup con map di images */}
        <div className="w-full lg:w-3/5 bg-[#F8F5EE] p-5 sm:p-7 lg:p-8 flex flex-col h-full border-b lg:border-b-0 lg:border-r border-[#713600]/15 overflow-y-auto">
          {/* Visualizzatore Principale del Mockup con Sfondo Sfocato (Blurred Backdrop) */}
          <div className="relative flex-1 w-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-[#713600]/15 shadow-inner flex items-center justify-center group">
            {/* Sfondo Sfocato Immersivo: riempie dinamicamente lo spazio vuoto con i colori dell'immagine */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={resolveAsset(images[activeImageIndex])}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover blur-2xl scale-110 brightness-75 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Immagine Principale in Primo Piano */}
            <img
              src={resolveAsset(images[activeImageIndex])}
              alt={`${project.title} - Vista ${activeImageIndex + 1}`}
              className="relative z-10 w-full h-full object-contain p-3 sm:p-5 transition-all duration-300 drop-shadow-2xl"
            />

            {/* Frecce navigazione viste mockup interne se multiple */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#F8F5EE]/90 backdrop-blur-sm text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#44553C]"
                  aria-label="Mockup precedente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#F8F5EE]/90 backdrop-blur-sm text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#44553C]"
                  aria-label="Mockup successivo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badge Contatore viste mockup */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono text-white font-semibold shadow-md">
                Vista {activeImageIndex + 1} di {images.length}
              </div>
            )}
          </div>

          {/* Griglia / Mini-Carosello delle miniature di tutte le viste (map dell'array images) */}
          <div className="shrink-0 mt-4 pt-3.5 border-t border-[#713600]/15">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#44553C]" />
                Tutte le viste del mockup ({images.length})
              </span>
              <span className="text-[11px] font-mono text-black/70">
                Clicca per ingrandire
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-[16/10] bg-white shadow-sm focus:outline-none ${
                    idx === activeImageIndex
                      ? 'border-[#44553C] ring-2 ring-[#44553C]/40 shadow-md scale-[1.02]'
                      : 'border-[#713600]/20 opacity-70 hover:opacity-100 hover:border-[#713600]/50'
                  }`}
                  aria-label={`Visualizza vista mockup ${idx + 1}`}
                >
                  <img
                    src={resolveAsset(img)}
                    alt={`${project.title} - Vista ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/75 text-white">
                    #{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PARTE DESTRA: Pannello Informativo & Specifiche Tecniche */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-6">
            {/* Header: Categoria e Titolo */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#44553C]/15 text-[#44553C] border border-[#44553C]/25">
                  {project.category}
                </span>

                {/* Badge Posizione Progetto */}
                {totalProjects > 0 && (
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#F8F5EE] border border-[#713600]/15 text-[#713600]">
                    Progetto {currentIdx + 1} di {totalProjects}
                  </span>
                )}
              </div>

              <h2
                id="modal-project-title"
                style={{ color: '#000000' }}
                className="text-2xl sm:text-3xl font-serif font-bold text-black leading-snug tracking-tight"
              >
                {project.title}
              </h2>
            </div>

            {/* Descrizione del Progetto con contrasto massimo */}
            <div>
              <h3
                style={{ color: '#000000' }}
                className="text-xs font-mono font-bold uppercase tracking-widest text-black mb-2"
              >
                Descrizione del Progetto
              </h3>
              <p
                style={{ color: '#000000' }}
                className="text-sm sm:text-base text-black font-sans leading-relaxed"
              >
                {project.description}
              </p>
            </div>

            {/* Specifiche Tecniche di Stampa & Prestampa */}
            <div className="pt-4 border-t border-[#713600]/15">
              <h3
                style={{ color: '#000000' }}
                className="text-xs font-mono font-bold uppercase tracking-widest text-black mb-3 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#44553C]" />
                <span>Specifiche Tecniche &amp; Prestampa</span>
              </h3>

              <div className="space-y-2.5 text-xs font-mono">
                {project.specs?.colorProfile && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Profilo Colore:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.colorProfile}</span>
                  </div>
                )}

                {project.specs?.dimensions && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Dimensioni:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.dimensions}</span>
                  </div>
                )}

                {project.specs?.materials && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Supporti &amp; Carte:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.materials}</span>
                  </div>
                )}

                {project.specs?.software && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Software:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.software}</span>
                  </div>
                )}

                {project.specs?.client && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Cliente:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.client}</span>
                  </div>
                )}

                {project.specs?.year && (
                  <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#713600]/15 flex items-start justify-between gap-2">
                    <span className="text-black font-medium">Anno:</span>
                    <span style={{ color: '#000000' }} className="font-bold text-black text-right">{project.specs.year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer della Modale con Navigazione Progetti & Pulsante Chiusura */}
          <div className="pt-6 mt-6 border-t border-[#713600]/15 flex flex-wrap items-center justify-between gap-3">
            {/* Navigazione Progetti nel Footer per ergonomia mobile */}
            {totalProjects > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevProject}
                  className="px-3 py-1.5 rounded-full bg-[#F8F5EE] text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] border border-[#713600]/25 transition-all text-xs font-mono font-semibold flex items-center gap-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#44553C]"
                  aria-label="Progetto precedente"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prec</span>
                </button>

                <span className="text-xs font-mono font-bold text-black px-1.5">
                  {currentIdx + 1} / {totalProjects}
                </span>

                <button
                  type="button"
                  onClick={handleNextProject}
                  className="px-3 py-1.5 rounded-full bg-[#F8F5EE] text-[#713600] hover:bg-[#713600] hover:text-[#F8F5EE] border border-[#713600]/25 transition-all text-xs font-mono font-semibold flex items-center gap-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#44553C]"
                  aria-label="Progetto successivo"
                >
                  <span>Succ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#713600] text-[#F8F5EE] hover:bg-[#44553C] transition-colors ml-auto shadow-sm"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
