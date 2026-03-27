import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import autoImg from '../../brand_assets/3000kg_Autoanhänger.jpg';
import planenImg from '../../brand_assets/750kg_Planenanhänger.jpg';
import motorradImg from '../../brand_assets/750kg_Motorrad.jpg';

type Spec = { label: string; value: string };
type Pricing = { label: string; price: string }[];

type Trailer = {
  id: number;
  name: string;
  model: string;
  tag: string;
  img: string;
  imgPosition: string;
  description: string;
  specs: Spec[];
  highlights: string[];
  pricing: Pricing;
  large: boolean;
};

const trailers: Trailer[] = [
  {
    id: 1,
    name: 'Auto-Transportanhänger',
    model: 'Z-Trailer AT30-21/48',
    tag: 'Verfügbar',
    img: autoImg,
    imgPosition: 'center 55%',
    description:
      'Kippbarer Aluminium-Autotransporter für Fahrzeuge von Kleinwagen bis SUV. Geringes Eigengewicht, maximale Nutzlast.',
    specs: [
      { label: 'Nutzlast', value: 'ca. 2.460 kg' },
      { label: 'Ladebreite', value: '2,10 m' },
      { label: 'Ladelänge', value: '4,80 m' },
    ],
    highlights: ['Kippbar', '80 km/h zugelassen', 'Seilwinde optional', 'Rampen ausziehbar'],
    pricing: [
      { label: 'Tag', price: '65 €' },
      { label: 'Weiterer Tag', price: '50 €' },
      { label: 'Wochenende', price: '150 €' },
    ],
    large: true,
  },
  {
    id: 2,
    name: 'Planenanhänger',
    model: 'Humbaur HA752513',
    tag: 'Verfügbar',
    img: planenImg,
    imgPosition: 'center 70%',
    description: 'Klasse B genügt. Für Möbel, Kartonagen und Gartenabfälle.',
    specs: [
      { label: 'Nutzlast', value: 'ca. 520 kg' },
      { label: 'Innenmaße', value: '251 × 131 × 180 cm' },
    ],
    highlights: ['Klasse B genügt', '750 kg ungebremst'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
    large: false,
  },
  {
    id: 3,
    name: 'Motorradanhänger',
    model: 'Humbaur HM752113',
    tag: 'Verfügbar',
    img: motorradImg,
    imgPosition: 'center 60%',
    description: '3 Stellplätze mit Zurrpunkten und montierter Ladeschiene.',
    specs: [
      { label: 'Nutzlast', value: '500 kg' },
      { label: 'Stellplätze', value: '3' },
    ],
    highlights: ['3 Stellplätze', 'Rampe montiert'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
    large: false,
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

function LargeCard({ trailer, inView }: { trailer: Trailer; inView: boolean }) {
  return (
    <motion.div
      className="col-span-2 rounded-2xl overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1c1c1c' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: 0, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Image */}
      <div className="relative h-72 lg:h-80 overflow-hidden">
        <img
          src={trailer.img}
          alt={trailer.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: trailer.imgPosition }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, rgba(28,28,28,0.3) 50%, transparent 80%)',
          }}
        />
        {/* Tag */}
        <span
          className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            color: '#a3e635',
          }}
        >
          {trailer.tag}
        </span>
        {/* Zulassung badge */}
        <span
          className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(6px)',
            color: '#e5e5e5',
          }}
        >
          3.000 kg
        </span>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">{trailer.model}</p>
        <h3 className="text-lg font-black tracking-tight text-white mb-2">{trailer.name}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-5 max-w-[55ch]">{trailer.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {trailer.specs.map(({ label, value }) => (
            <div
              key={label}
              className="px-3 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {trailer.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] text-zinc-400 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Pricing + CTA */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {trailer.pricing.map(({ label, price }) => (
              <div key={label} className="flex items-baseline gap-1">
                <span className="text-base font-black text-white">{price}</span>
                <span className="text-[11px] text-zinc-500">/ {label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToContact}
            className="shrink-0 flex items-center gap-2 text-xs font-semibold text-zinc-950 bg-white px-5 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 group/btn"
          >
            Jetzt anfragen
            <ArrowRight size={13} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SmallCard({ trailer, delay, inView }: { trailer: Trailer; delay: number; inView: boolean }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden group flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1c1c1c' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trailer.img}
          alt={trailer.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: trailer.imgPosition }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.95) 0%, transparent 60%)' }}
        />
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
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">{trailer.model}</p>
        <h3 className="font-bold text-white tracking-tight mb-1.5">{trailer.name}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-4">{trailer.description}</p>

        {/* Specs */}
        <div className="space-y-2 mb-4">
          {trailer.specs.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{label}</span>
              <span className="text-xs font-semibold text-zinc-200">{value}</span>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
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

        {/* Pricing + CTA */}
        <div
          className="flex items-center justify-between gap-3 pt-4 mt-auto"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-white">{trailer.pricing[0].price}</span>
            <span className="text-[11px] text-zinc-500">/ Tag</span>
          </div>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group/btn"
          >
            Anfragen
            <ArrowRight size={12} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
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
