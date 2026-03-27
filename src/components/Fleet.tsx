import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { CaretDown, ArrowRight } from '@phosphor-icons/react';
import autoImg from '../../brand_assets/3000kg_Autoanhänger.jpg';
import planenImg from '../../brand_assets/750kg_Planenanhänger.jpg';
import motorradImg from '../../brand_assets/750kg_Motorrad.jpg';

type Spec = { label: string; value: string };
type PriceEntry = { label: string; price: string };

type Trailer = {
  id: number;
  name: string;
  model: string;
  tag: string;
  zulassung: string;
  keySpec: string;
  img: string;
  imgPosition: string;
  specs: Spec[];
  highlights: string[];
  pricing: PriceEntry[];
};

const trailers: Trailer[] = [
  {
    id: 1,
    name: 'Auto-Transportanhänger',
    model: 'Z-Trailer AT30-21/48',
    tag: 'Verfügbar',
    zulassung: '3.000 kg',
    keySpec: 'Nutzlast 2.460 kg · Ladelänge 4,80 m',
    img: autoImg,
    imgPosition: 'center 55%',
    specs: [
      { label: 'Zulassung', value: '3.000 kg' },
      { label: 'Nutzlast', value: 'ca. 2.460 kg' },
      { label: 'Eigengewicht', value: 'ca. 540 kg' },
      { label: 'Ladebreite', value: '2,10 m' },
      { label: 'Ladelänge', value: '4,80 m' },
    ],
    highlights: ['Kippbar', '80 km/h zugelassen', 'Seilwinde optional', 'Rampen ausziehbar'],
    pricing: [
      { label: 'Tag', price: '65 €' },
      { label: 'Weiterer Tag', price: '50 €' },
      { label: 'Wochenende', price: '150 €' },
    ],
  },
  {
    id: 2,
    name: 'Planenanhänger',
    model: 'Humbaur HA752513',
    tag: 'Verfügbar',
    zulassung: '750 kg',
    keySpec: 'Nutzlast 520 kg · Klasse B genügt',
    img: planenImg,
    imgPosition: 'center 70%',
    specs: [
      { label: 'Zulassung', value: '750 kg ungebremst' },
      { label: 'Nutzlast', value: 'ca. 520 kg' },
      { label: 'Innenlänge', value: '251 cm' },
      { label: 'Innenbreite', value: '131 cm' },
      { label: 'Innenhöhe', value: '180 cm' },
    ],
    highlights: ['Klasse B genügt', '750 kg ungebremst', 'Hochplane'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
  },
  {
    id: 3,
    name: 'Motorradanhänger',
    model: 'Humbaur HM752113',
    tag: 'Verfügbar',
    zulassung: '750 kg',
    keySpec: 'Nutzlast 500 kg · 3 Stellplätze',
    img: motorradImg,
    imgPosition: 'center 60%',
    specs: [
      { label: 'Zulassung', value: '750 kg ungebremst' },
      { label: 'Nutzlast', value: '500 kg' },
      { label: 'Innenlänge', value: '209 cm' },
      { label: 'Innenbreite', value: '136 cm' },
      { label: 'Stellplätze', value: '3' },
    ],
    highlights: ['3 Stellplätze', 'Rampe montiert', 'Zurrpunkte', '750 kg ungebremst'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
}

function TrailerCard({
  trailer,
  delay,
  inView,
}: {
  trailer: Trailer;
  delay: number;
  inView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1c1c1c' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={trailer.img}
          alt={trailer.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            objectPosition: trailer.imgPosition,
            transform: isOpen ? 'scale(1)' : undefined,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, rgba(28,28,28,0.2) 50%, transparent 80%)',
          }}
        />
        {/* Badges */}
        <span
          className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            color: '#a3e635',
          }}
        >
          {trailer.tag}
        </span>
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(6px)',
            color: '#e5e5e5',
          }}
        >
          {trailer.zulassung}
        </span>
      </div>

      {/* Collapsed header — always visible */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-0.5">{trailer.model}</p>
          <h3 className="text-sm font-bold text-white tracking-tight mb-1">{trailer.name}</h3>
          <p className="text-xs text-zinc-500">{trailer.keySpec}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-black text-white leading-none">{trailer.pricing[0].price}</p>
          <p className="text-[10px] text-zinc-600 mb-1">/ Tag</p>
          <div
            className="flex items-center justify-end gap-1 text-[11px] font-semibold transition-colors duration-200"
            style={{ color: isOpen ? '#a3e635' : '#52525b' }}
          >
            <span>{isOpen ? 'Schließen' : 'Details'}</span>
            <CaretDown
              size={11}
              weight="bold"
              style={{
                transition: 'transform 0.35s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-4 pb-4 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Technische Daten */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Technische Daten
              </p>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {trailer.specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="px-2.5 py-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Ausstattung */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Ausstattung
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {trailer.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] text-zinc-400 px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem' }} />

              {/* Preise */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Preise
              </p>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {trailer.pricing.map(({ label, price }) => (
                  <div
                    key={label}
                    className="px-2 py-2 rounded-lg text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm font-black text-white">{price}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToContact();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-zinc-950 bg-white px-4 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 group/btn"
              >
                Jetzt anfragen
                <ArrowRight size={12} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Fleet() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [large, ...small] = trailers;

  return (
    <section id="fleet" className="py-28 lg:py-40" style={{ background: '#0e0e0e' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4"
          >
            Fuhrpark
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              variants={itemVariants}
              className="font-black tracking-tighter leading-none text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              AKTUELLER
              <br />
              <span className="text-zinc-400">FUHRPARK</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 text-sm max-w-[45ch] leading-relaxed md:text-right"
            >
              Hier finden Sie alle Anhänger, die sich aktuell in unserem Fuhrpark
              befinden. Im Laufe des Jahres werden weitere dazukommen.
            </motion.p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          <LargeCard trailer={large} inView={inView} />
          {small.map((trailer, i) => (
            <SmallCard key={trailer.id} trailer={trailer} delay={(i + 1) * 0.14} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-zinc-400 text-sm max-w-[45ch] leading-relaxed">
            Lieferung & Abholung des Anhängers vor Ihre Haustür in Sonthofen, Immenstadt
            und Oberstdorf für je 15 €.
          </p>
          <button
            onClick={scrollToContact}
            className="shrink-0 text-sm font-semibold text-zinc-950 bg-white px-6 py-3 rounded hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200"
          >
            Anfrage stellen
          </button>
        </motion.div>
      </div>
    </section>
  );
}
