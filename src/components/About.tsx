import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle } from '@phosphor-icons/react';
import autoAnhaenger from '../../brand_assets/Autoanhänger_mit_G-Klasse.webp';

const features = [
  'Aluminium-Anhänger von Z-Trailer',
  'Geeignet für Fahrzeuge vom Fiat 500 bis RS6',
  'Spurplatten-System für sicheres Aufladen',
  'Persönliche Beratung & flexible Termine',
  'Standort Sonthofen im Allgäu',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 lg:py-40 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Asymmetric 3fr / 2fr grid — taste-skill DESIGN_VARIANCE 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-center">
          {/* Left: text content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4"
            >
              Über uns
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-black tracking-tighter leading-none text-white mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              ALLTEC —<br />
              <span className="text-zinc-400">Ihr Vermieter</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                Das Unternehmen ALLTEC wurde 2022 von Hochstatter Lukas in Sonthofen
                gegründet. Anfang 2023 haben wir uns für den Kauf eines neuen Anhängers
                der Firma Z-Trailer entschieden.
              </p>
              <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                Mit einem sehr geringen Eigengewicht durch seinen Aluminiumaufbau und
                seiner Größe an sich, passen auf diesen Anhänger jegliche Fahrzeuge —
                vom kleinen KFZ wie dem Fiat 500 bis zum großen RS6 mit Spurplatten.
              </p>
            </motion.div>

            {/* Feature list */}
            <motion.ul variants={containerVariants} className="space-y-3">
              {features.map((f) => (
                <motion.li
                  key={f}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="text-white shrink-0"
                  />
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: image card with offset — subtle depth */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Offset background card */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                transform: 'translate(16px, 16px)',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#1c1c1c',
              }}
            />
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src={autoAnhaenger}
                alt="ALLTEC Autoanhänger mit G-Klasse"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1280}
              />
              {/* Subtle dark vignette on image */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 50%)',
                }}
              />
              {/* Floating label */}
              <div
                className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(17,17,17,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <p className="text-xs text-zinc-400 tracking-wider uppercase mb-0.5">Z-Trailer</p>
                <p className="text-sm font-semibold text-white">Aluminium-Aufbau</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row — asymmetric, left-pushed */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          {[
            { value: '2022', label: 'Gegründet' },
            { value: '3+', label: 'Anhänger im Fuhrpark' },
            { value: '87527', label: 'Sonthofen' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
