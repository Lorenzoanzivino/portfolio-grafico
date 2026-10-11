import { Layers } from 'lucide-react';

export default function Navbar() {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#F8F5EE]/95 border-b border-[#713600]/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Sinistra: Testo branding con tonalità #713600 */}
        <button
          onClick={handleScrollTop}
          type="button"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#713600] rounded-lg"
          aria-label="Torna all'inizio della pagina"
        >
          <div
            style={{ borderColor: 'rgba(113, 54, 0, 0.3)', color: '#713600' }}
            className="w-8 h-8 rounded-full bg-[#713600]/10 border border-[#713600]/30 flex items-center justify-center text-[#713600] transition-colors duration-200 shrink-0"
          >
            <Layers className="w-4 h-4 text-[#713600]" />
          </div>
          <span
            style={{ color: '#713600' }}
            className="font-sans text-sm sm:text-base font-bold tracking-tight text-[#713600] select-none"
          >
            Lorenzo Anzivino | Graphic Design | Portfolio
          </span>
        </button>

        {/* Destra: Link navigazione con colore #713600 */}
        <nav>
          <a
            href="#progetti"
            style={{ color: '#713600' }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#713600] hover:opacity-80 transition-opacity duration-200 py-2 px-3.5 rounded-full hover:bg-[#713600]/10"
          >
            <span
              style={{ color: '#713600' }}
              className="text-[#713600] font-bold"
            >
              I miei progetti
            </span>
            <span
              style={{ backgroundColor: '#713600' }}
              className="w-2 h-2 rounded-full bg-[#713600] inline-block shrink-0"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
