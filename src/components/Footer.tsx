import { Link } from 'react-router-dom';
import { InstagramLogo, Phone } from '@phosphor-icons/react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center leading-none select-none">
            <span className="text-white font-bold text-xs tracking-[0.15em] uppercase">ALL</span>
            <div className="w-full h-px bg-white my-[2px]" />
            <span className="text-white font-bold text-xs tracking-[0.15em] uppercase">TEC</span>
          </div>

          {/* Center: legal */}
          <p className="text-xs text-zinc-600 text-center">
            © {year} ALLTEC Anhängervermietung · Hochstatter Lukas · Sonthofen
            <span className="mx-2 text-zinc-700">·</span>
            <Link
              to="/impressum"
              className="hover:text-zinc-400 transition-colors"
            >
              Impressum
            </Link>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/__alltec__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogo size={20} weight="bold" />
            </a>
            <a
              href="tel:+4917670590669"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Telefon"
            >
              <Phone size={20} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
