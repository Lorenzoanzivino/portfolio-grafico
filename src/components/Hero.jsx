import { ArrowDown, CheckCircle2, Sparkles } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';

export default function Hero() {
  return (
    <section
      id="intro"
      className="relative min-h-[85vh] flex items-center pt-28 pb-20 md:py-32 scroll-mt-20 overflow-hidden bg-[#F8F5EE]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonna Sinistra: Rigorosamente allineata a sinistra con colore #713600 e descrizioni in nero */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#44553C]/10 border border-[#44553C]/25 text-xs font-semibold tracking-wider uppercase text-[#44553C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio di Progettazione Grafica &amp; Stampa</span>
            </div>

            {/* Titolo Principale forzato con il colore esatto #713600 */}
            <h1
              style={{ color: '#713600' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#713600] tracking-tight leading-[1.12]"
            >
              Progettazione visiva &amp; Grafica pubblicitaria.
            </h1>

            {/* Descrizione del corpo in nero come da eccezione rigorosa */}
            <p className="text-base sm:text-lg text-black leading-relaxed font-sans max-w-xl">
              Specializzato nello sviluppo di identità visive per brand contemporanei, impaginazione editoriale di prestigio e consulenza tecnica per la prestampa. Dalla formulazione del monogramma alla gestione rigorosa dei profili colore e delle finiture cartotecniche di pregio.
            </p>

            {/* Dettagli competenze in pillole */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#713600]">
                <CheckCircle2 className="w-4 h-4 text-[#44553C] shrink-0" />
                <span>Identità Visiva &amp; Marchi</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#713600]">
                <CheckCircle2 className="w-4 h-4 text-[#44553C] shrink-0" />
                <span>Controllo Prestampa &amp; CMYK</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#713600]">
                <CheckCircle2 className="w-4 h-4 text-[#44553C] shrink-0" />
                <span>Nobilitazioni &amp; Cartotecnica</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#713600]">
                <CheckCircle2 className="w-4 h-4 text-[#44553C] shrink-0" />
                <span>Editoria &amp; Campagne Affissioni</span>
              </div>
            </div>

            {/* Call to action scroll ai progetti */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#progetti"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#44553C] text-[#F8F5EE] font-medium text-sm shadow-md hover:bg-[#33412D] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Esplora i progetti 3D</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <span className="text-xs text-black font-mono hidden sm:inline">
                ✦ Interazione 3D abilitata
              </span>
            </div>
          </div>

          {/* Colonna Destra: Artwork / Logo Scenico integrato (Nascosto su Mobile, visibile da tablet/desktop) */}
          <div className="hidden md:flex items-center justify-center lg:justify-end">
            <div className="relative max-w-sm lg:max-w-md w-full">
              {/* Bagliori ambientali d'accento dietro l'opera */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#44553C]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#713600]/15 blur-3xl pointer-events-none" />

              {/* Artwork sospeso: bordi arrotondati, ombra 2xl, rotate-1, nessun hover scale */}
              <img
                src={resolveAsset('/assets/logoPersonale.jpg')}
                alt="Lorenzo Anzivino Graphic Visual Design"
                className="relative z-10 w-full h-auto max-h-[460px] object-cover rounded-3xl shadow-2xl shadow-black/20 rotate-1 border border-[#713600]/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
