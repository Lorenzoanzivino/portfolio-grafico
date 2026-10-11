import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';

export default function ProjectsCarousel3D({ projects = [], onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const total = projects.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (idx) => {
    setActiveIndex(idx);
  };

  // Navigazione tastiera freccia dx/sx
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Gestione Drag & Swipe con soglia di tolleranza di 5px
  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
    hasDraggedRef.current = false;
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    dragCurrentX.current = clientX;
    const diff = Math.abs(clientX - dragStartX.current);
    if (diff > 5) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const diffX = dragCurrentX.current - dragStartX.current;
    if (Math.abs(diffX) > 25) {
      if (diffX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    } else {
      hasDraggedRef.current = false;
    }
  };

  // Gestione del Click sulla Card
  const handleCardClick = (e, index, isCenter, project) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return;

    if (isCenter) {
      onSelectProject(project, index);
    } else {
      setActiveIndex(index);
    }
  };

  if (!projects || total === 0) return null;

  return (
    <section
      id="progetti"
      className="relative min-h-screen flex flex-col justify-center py-10 lg:py-12 scroll-mt-20 overflow-hidden select-none bg-[#F8F5EE]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full flex flex-col justify-center">
        {/* Intestazione Sezione: Margini ridotti per alzare il carosello */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44553C]/10 border border-[#44553C]/25 text-xs font-semibold uppercase tracking-wider text-[#44553C] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Archivio Lavori • Rotazione 3D</span>
          </div>

          <h2
            style={{ color: '#713600' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#713600] tracking-tight mb-1.5"
          >
            I Miei Progetti Selezionati
          </h2>

          <p className="text-xs sm:text-sm text-black font-sans">
            Clicca su una card laterale per portarla al centro. Clicca sulla card centrale per visualizzare la scheda tecnica completa.
          </p>
        </div>

        {/* Palcoscenico 3D: Posizionato più in alto con altezza ottimizzata */}
        <div
          className="relative w-full h-[450px] sm:h-[480px] md:h-[490px] mt-2 sm:mt-3 flex items-center justify-center perspective-1200 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {projects.map((project, index) => {
              let offset = index - activeIndex;
              if (offset > Math.floor(total / 2)) offset -= total;
              if (offset < -Math.floor(total / 2)) offset += total;

              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;

              const rotateY = isCenter ? 0 : offset > 0 ? -22 : 22;
              const translateXPercent = offset * 66;
              const translateZ = isCenter ? 0 : -140 * Math.abs(offset);
              const scale = isCenter ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.12);
              const opacity = isCenter ? 1 : 0.55;
              const zIndex = 30 - Math.abs(offset) * 5;

              return (
                <div
                  key={project.id}
                  onClick={(e) => handleCardClick(e, index, isCenter, project)}
                  style={{
                    transform: `translateX(${translateXPercent}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: isCenter ? 'none' : 'grayscale(30%)',
                    backgroundColor: '#FFFFFF',
                    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease, filter 0.4s ease',
                  }}
                  className={`absolute w-[290px] sm:w-[350px] md:w-[390px] rounded-3xl overflow-hidden border-2 bg-white ${
                    isCenter
                      ? 'shadow-2xl border-[#713600]/30 ring-2 ring-[#44553C]/20 opacity-100 cursor-pointer'
                      : 'shadow-lg border-[#713600]/15 cursor-pointer hover:opacity-80'
                  }`}
                >
                  {/* Immagine 16:9 del Mockup */}
                  <div className="relative w-full aspect-video overflow-hidden bg-[#713600]/5">
                    <img
                      src={resolveAsset(project.coverImage)}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Categoria in alto a sinistra */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#44553C] text-[#F8F5EE] shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Badge interattivo sulla card centrale */}
                    {isCenter && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF]/95 border border-[#713600]/20 text-[#713600] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                          <Eye className="w-3.5 h-3.5 text-[#44553C]" />
                          Dettagli
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Testi della Card con colore NERO ASSOLUTO per titolo e descrizione */}
                  <div className="p-5 sm:p-6 text-left bg-white">
                    <h3
                      style={{ color: '#000000' }}
                      className="text-lg sm:text-xl font-serif font-bold text-black tracking-tight mb-1.5 line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{ color: '#000000' }}
                      className="text-xs sm:text-sm text-black font-sans line-clamp-2"
                    >
                      {project.shortDescription || project.description}
                    </p>

                    {/* Barra inferiore card */}
                    <div className="mt-4 pt-3 border-t border-[#713600]/15 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-black font-medium">{project.specs?.year || '2026'}</span>
                      {isCenter ? (
                        <span className="text-[#44553C] font-bold">
                          Click per aprire modale →
                        </span>
                      ) : (
                        <span className="text-[#713600]/60">
                          Click per centrare
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controlli Inferiori: Agganciati visivamente alla base della card (mt-2 sm:mt-3) */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-4 sm:gap-5">
          {/* Freccia Sinistra */}
          <button
            type="button"
            onClick={goToPrev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#713600]/20 text-[#713600] hover:bg-[#44553C] hover:text-[#F8F5EE] hover:border-[#44553C] flex items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#44553C]"
            aria-label="Progetto precedente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicatori per tutti i progetti */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[#713600]/15 shadow-inner max-w-[70vw] sm:max-w-none overflow-x-auto">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goToIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 shrink-0 focus:outline-none ${
                  idx === activeIndex
                    ? 'w-6 sm:w-7 bg-[#44553C]'
                    : 'w-2 sm:w-2.5 bg-[#713600]/20 hover:bg-[#44553C]/60'
                }`}
                aria-label={`Vai al progetto ${idx + 1}: ${p.title}`}
                aria-current={idx === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Freccia Destra */}
          <button
            type="button"
            onClick={goToNext}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#713600]/20 text-[#713600] hover:bg-[#44553C] hover:text-[#F8F5EE] hover:border-[#44553C] flex items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#44553C]"
            aria-label="Progetto successivo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Contatore numerico */}
        <div className="mt-1 sm:mt-1.5 text-center">
          <span className="text-[11px] font-mono text-black">
            <strong className="text-[#713600]">{activeIndex + 1}</strong> di {total} progetti
          </span>
        </div>
      </div>
    </section>
  );
}
