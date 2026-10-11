import { ArrowDown, CheckCircle2, Palette, Printer, Sparkles } from 'lucide-react';
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

          {/* Colonna Destra: Ritratto fotografico professionale & Badge astratto */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-white p-4 sm:p-5 shadow-2xl border border-[#713600]/15 flex flex-col justify-between overflow-hidden group">
              {/* Sfondo geometrico astratto */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#44553C]/15 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#B85D43]/15 blur-2xl pointer-events-none" />

              {/* Contenitore Immagine / Ritratto fotografico */}
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-[#713600]/5 border border-[#713600]/10 flex items-center justify-center">
                <img
                  src={resolveAsset('/assets/logoPersonale.jpg')}
                  alt="Lorenzo Anzivino Ritratto Grafico"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) {
                      e.target.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback astratto se l'immagine non è disponibile */}
                <div className="hidden absolute inset-0 flex-col items-center justify-center p-6 text-center bg-[#F8F5EE]">
                  <Palette className="w-16 h-16 text-[#44553C] mb-3" />
                  <span className="font-serif text-2xl font-bold text-[#713600]">Lorenzo Anzivino</span>
                  <span className="text-xs text-black mt-1 uppercase tracking-widest font-mono">Graphic &amp; Visual Design</span>
                </div>

                {/* Badge Sovraimpresso in basso */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#F8F5EE]/95 backdrop-blur-md border border-[#713600]/15 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#44553C] text-[#F8F5EE] flex items-center justify-center font-bold text-xs">
                      <Printer className="w-4 h-4 text-[#F8F5EE]" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#713600]">Art Direction &amp; Stampa</p>
                      <p className="text-[10px] text-black font-mono">FOGRA39 • ISO 12647-2</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#44553C]/15 text-[#44553C] border border-[#44553C]/25">
                    Attivo 2026
                  </span>
                </div>
              </div>

              {/* Didascalia inferiore della card: descrizione in nero */}
              <div className="pt-4 flex items-center justify-between text-xs text-black">
                <span className="font-mono">PROGETTAZIONE EDITORIALE</span>
                <span className="text-[#44553C] font-semibold">✦ MILANO / REMOTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
