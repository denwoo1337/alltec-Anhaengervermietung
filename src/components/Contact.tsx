import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Phone, Envelope, InstagramLogo, Plus, Minus } from '@phosphor-icons/react';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const faqs = [
  {
    frage: 'Wo kann ich in Sonthofen oder Immenstadt einen Anhänger mieten?',
    antwort:
      'ALLTEC Anhängervermietung befindet sich in Sonthofen (87527), Metzlerstraße 14 – nur wenige Minuten von Immenstadt im Allgäu (87509) entfernt. Der Standort ist gut erreichbar für Kunden aus dem gesamten Oberallgäu, darunter Kempten, Oberstdorf und Bad Hindelang. Eine vorherige telefonische Absprache ist erforderlich.',
  },
  {
    frage: 'Welche Anhänger stehen zur Miete zur Verfügung?',
    antwort:
      'Wir vermieten verschiedene PKW-Anhänger für Transport, Umzug und Gartenarbeiten – von kleinen Kofferanhängern bis hin zu größeren Transportanhängern. Rufen Sie uns an oder schreiben Sie uns, um die aktuelle Verfügbarkeit und das passende Modell für Ihr Vorhaben zu klären.',
  },
  {
    frage: 'Wie weit im Voraus muss ich einen Anhänger reservieren?',
    antwort:
      'Wir empfehlen eine Reservierung mindestens 1–2 Tage im Voraus, besonders an Wochenenden und in der Hauptsaison (Mai–Oktober). Für kurzfristige Anfragen im Raum Sonthofen und Immenstadt stehen wir gerne telefonisch zur Verfügung – oft lässt sich auch mit kurzer Vorlaufzeit etwas organisieren.',
  },
  {
    frage: 'Was benötige ich für die Anmietung eines Anhängers?',
    antwort:
      'Für die Anmietung benötigen Sie einen gültigen Führerschein (Klasse B für Anhänger bis 750 kg Gesamtmasse zulässig, Klasse BE für schwerere Anhänger) sowie ein passendes Zugfahrzeug mit Anhängerkupplung. Eine Kaution kann anfallen. Bitte nehmen Sie vorab telefonisch Kontakt auf.',
  },
  {
    frage: 'Liefert ALLTEC Anhänger auch im Allgäu aus?',
    antwort:
      'Derzeit ist die Abholung am Standort in Sonthofen die Standardoption. Bei Interesse an einer Lieferung in den Raum Immenstadt, Oberstdorf oder Kempten sprechen Sie uns bitte direkt an – wir besprechen dann individuell, was möglich ist.',
  },
];

function FaqItem({ frage, antwort, index }: { frage: string; antwort: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + index * 0.07, duration: 0.5, ease: 'easeOut' }}
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-zinc-200 leading-snug group-hover:text-white transition-colors">
          {frage}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors"
          style={{ background: open ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)' }}
        >
          {open ? (
            <Minus size={13} weight="bold" className="text-white" />
          ) : (
            <Plus size={13} weight="bold" className="text-zinc-400" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-400 leading-relaxed pb-5 pr-10">{antwort}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#111111]">
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
            Kontakt & FAQ
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-black tracking-tighter leading-none text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            SPRECHEN SIE
            <br />
            <span className="text-zinc-400">UNS AN</span>
          </motion.h2>
        </motion.div>

        {/* Split layout: info left, FAQ right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[40ch]">
              Gerne beraten wir Sie unverbindlich. Senden Sie uns Ihre Anfrage oder
              melden Sie sich direkt telefonisch.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Adresse',
                  lines: ['ALLTEC', 'Metzlerstraße 14', 'D-87527 Sonthofen'],
                },
                {
                  icon: Phone,
                  label: 'Telefon',
                  lines: ['+49 176 70 59 06 69'],
                  href: 'tel:+4917670590669',
                },
                {
                  icon: Envelope,
                  label: 'E-Mail',
                  lines: ['hochstatter.lukas@web.de'],
                  href: 'mailto:hochstatter.lukas@web.de',
                },
                {
                  icon: InstagramLogo,
                  label: 'Instagram',
                  lines: ['@__alltec__'],
                  href: 'https://instagram.com/__alltec__',
                },
              ].map(({ icon: Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Icon size={16} weight="bold" className="text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
                    {lines.map((line, i) =>
                      href && i === 0 ? (
                        <a
                          key={line}
                          href={href}
                          className="block text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-zinc-300">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-xs text-zinc-600 leading-relaxed">
              Standort nur nach telefonischer Absprache erreichbar.
            </p>
          </motion.div>

          {/* Right: FAQ accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-6">
              Häufige Fragen
            </p>
            <div>
              {faqs.map((item, i) => (
                <FaqItem key={i} index={i} frage={item.frage} antwort={item.antwort} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
