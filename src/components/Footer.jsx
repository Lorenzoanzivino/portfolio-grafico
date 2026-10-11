export default function Footer() {
  return (
    <footer className="w-full border-t border-[#713600]/15 bg-[#F8F5EE] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <p style={{ color: '#713600' }} className="text-[#713600] font-bold">
          © 2026 Lorenzo Anzivino. Tutti i diritti riservati.
        </p>
        <p style={{ color: '#713600' }} className="text-center sm:text-right text-[#713600] font-medium opacity-90">
          Designed &amp; Developed with React &amp; Tailwind CSS • Hosted on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
