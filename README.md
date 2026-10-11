# Portfolio Grafico — Lorenzo Anzivino

Single Page Application (SPA) Portfolio sviluppata con **React 19**, **Vite**, **Tailwind CSS** e **Lucide React**, ottimizzata per il deploy su **GitHub Pages** con percorsi relativi (`base: './'`).

---

## 🎨 Design System: Regola 60/30/10

L'interfaccia adotta un'armonia cromatica sobria, calda ed editoriale:

- **Base (60%) — Crema / Panna**: Sfondo dell'applicazione (`#F8F5EE`), Sfondo card (`#FFFFFF` o `#FDFBF7`).
- **Secondario (30%) — Tonalità Calda Cuoio / Terra Bruciata (`#713600`)**: Testi primari, branding Navbar, titoli incisivi (`h1`, `h2`, `h3`), bordi e cornici strutturali.
- **Accento (10%) — Verde Bosco / Oliva**: Dettagli interattivi, pulsanti, badge di categoria, controlli e indicatori (`#44553C`). Alternativa calda Terracotta (`#B85D43`).
- **Eccezione Rigorosa — Nero Assoluto (`#000000` / `text-black`)**: Tutti i testi descrittivi, schede tecniche e paragrafi di lettura per garantire contrasto e massima leggibilità.

### Tipografia e Spaziature
- **Titoli**: *Playfair Display* (Serif a basso contrasto per eleganza classica e rigore editoriale, colore `#713600`).
- **Testo Body**: *Plus Jakarta Sans* e *Inter* (Sans-serif neutro e ad alta leggibilità in nero assoluto).
- **Contenitore**: `max-w-7xl mx-auto px-6 sm:px-12 lg:px-20`.
- **Spaziature di Sezione**: `min-h-[85vh]` e `py-24`.

---

## 🚀 Architettura dell'Applicazione

### 1. Navbar Fissa (`fixed top-0 z-50`)
- Effetto vetro sfocato `backdrop-blur-md bg-[#F8F5EE]/95 border-b border-[#713600]/15`.
- Sinistra: Logo testuale `"Lorenzo Anzivino | Graphic Design | Portfolio"` con scorrimento fluido in cima (`window.scrollTo({ top: 0, behavior: 'smooth' })`) in tonalità `#713600`.
- Destra: Collegamento diretto `"I miei progetti"` ad ancoraggio `#progetti` in tonalità `#713600`.

### 2. Hero Section (`id="intro"`)
- Layout a 2 colonne desktop centrate verticalmente:
  - **Colonna Sinistra**: Allineata a sinistra con titolo incisivo *"Progettazione visiva & Grafica pubblicitaria."* (`#713600`), descrizione in nero pieno (`text-black`), sintesi delle competenze (identità visiva, prestampa FOGRA39, nobilitazioni cartotecniche) e CTA di scorrimento.
  - **Colonna Destra**: Card composita con ritratto fotografico professionale, badge astratto delle certificazioni di prestampa e finiture materiche.

### 3. Carosello Progetti 3D (`id="progetti"`)
- Palcoscenico prospettico con `perspective: 1200px` e `transform-style: preserve-3d`.
- Disposizione delle card lungo un arco sull'asse Y:
  - **Card Centrale (Attiva)**: `rotateY(0deg) translateZ(0px) scale(1)`, opacità 100%, ombra profonda `shadow-2xl`. Al click apre la modale di dettaglio fullscreen.
  - **Card Laterali**: Ruotate (`±22deg`), traslate indietro lungo Z (`translateZ(-140px)`), scalate (`scale(0.82)`), opacizzate (`opacity: 0.55`) e con filtro desaturato (`grayscale(30%)`). Al click ruotano al centro.
- **Interazioni**:
  - Drag / Swipe touch e mouse con **tolleranza di 5px** (per distinguere nitidamente il click dal trascinamento).
  - Frecce di navigazione (`ChevronLeft` / `ChevronRight`) e indicatori a pallini (dots) interattivi con bordi e accenti `#713600`.

### 4. Modale Dettaglio Progetto (Fullscreen)
- Overlay `fixed inset-0 z-50 bg-[#713600]/80 backdrop-blur-md` con blocco automatico dello scroll del body (`overflow: hidden`).
- **Galleria Mockup 2D**: Scorrimento orizzontale delle viste di stampa, con ingrandimento e miniature selezionabili.
- **Pannello Tecnico**: Titolo, Categoria, Descrizione approfondita e Scheda Tecnica con Profili Colore (FOGRA39 / Pantone), Dimensioni, Carte e Software usati.
- **Chiusura**: Icona X, tasto `Escape`, o click sull'overlay esterno.

### 5. Footer Minimale
- Indicazione copyright: `"© 2026 Lorenzo Anzivino. Tutti i diritti riservati."`
- Crediti di sviluppo: `"Designed & Developed with React & Tailwind CSS • Hosted on GitHub Pages."`

---

## 🛠️ Comandi

```bash
# 1. Installazione dipendenze
npm install

# 2. Sviluppo in locale
npm run dev

# 3. Build di produzione
npm run build

# 4. Deploy automatico su GitHub Pages
npm run deploy
```
