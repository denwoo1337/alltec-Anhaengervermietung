import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import GalleryLightbox from './GalleryLightbox';

const IMAGES: string[] = [
  "/galerie/09ca22b3-06b9-46b0-949a-71dfb90169dd.webp",
  "/galerie/1ad3c858-7639-4002-8fbd-f0ca29010f58.webp",
  "/galerie/65c9594f-7b95-4f5c-9e15-3cb1e05670df.webp",
  "/galerie/8c156413-2e97-4177-8f89-c9aef96be2b3_(1).webp",
  "/galerie/90902ab7-2e22-431f-8b48-6c72480d8f1b_(1).webp",
  "/galerie/b21ed1c6-b854-4bd1-99f5-e45249aedf85.webp",
  "/galerie/ed693693-a4c8-4eb6-b676-2407a5cec608.webp",
  "/galerie/ford_mit_anhänger.webp",
  "/galerie/img_0912.webp",
  "/galerie/img_1371.webp",
  "/galerie/img_1807.webp",
  "/galerie/img_1837_(1).webp",
  "/galerie/img_2482.webp",
  "/galerie/img_2491_(1).webp",
  "/galerie/img_3012_(1).webp",
  "/galerie/img_3013.webp",
  "/galerie/img_4323_(1).webp",
  "/galerie/img_4599.webp",
  "/galerie/img_4599_(1).webp",
  "/galerie/img_4779.webp",
  "/galerie/img_5029_(1).webp",
  "/galerie/img_5175.webp",
  "/galerie/img_5679.webp",
  "/galerie/img_6076_(1).webp",
  "/galerie/img_6077.webp",
  "/galerie/img_6254.webp",
  "/galerie/img_6347.webp",
  "/galerie/img_7015.webp",
  "/galerie/img_8559.webp",
  "/galerie/img_8717_jpg.webp",
  "/galerie/img_8723.webp",
  "/galerie/img_9196.webp",
  "/galerie/img_9686_(1).webp",
];

const INITIAL_COUNT = 6;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const initialImages = IMAGES.slice(0, INITIAL_COUNT);
  const remainingImages = IMAGES.slice(INITIAL_COUNT);

  return (
    <section id="gallery" className="py-28 lg:py-40" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">
            Galerie
          </p>
          <h2
            className="font-black tracking-tighter leading-none text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            EINDRÜCKE /
            <br />
            <span className="text-zinc-400">VERMIETUNGEN</span>
          </h2>
        </motion.div>

        {/* Initial 6 images — always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {initialImages.map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              index={i}
              inView={inView}
              delay={i * 0.07}
              onClick={setLightboxIndex}
            />
          ))}
        </div>

        {/* Remaining images — animated expand */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mt-3 lg:mt-4">
            {remainingImages.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                index={INITIAL_COUNT + i}
                inView={inView}
                delay={i * 0.04}
                onClick={setLightboxIndex}
              />
            ))}
          </div>
        </motion.div>

        {/* Expand / Collapse button */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200"
            style={{ color: expanded ? '#a3e635' : '#52525b' }}
          >
            <span>
              {expanded
                ? 'Weniger anzeigen'
                : `Alle ${IMAGES.length} Bilder anzeigen`}
            </span>
            <CaretDown
              size={12}
              weight="bold"
              style={{
                transition: 'transform 0.35s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={IMAGES}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryImage({
  src,
  index,
  inView,
  delay,
  onClick,
}: {
  src: string;
  index: number;
  inView: boolean;
  delay: number;
  onClick: (index: number) => void;
}) {
  return (
    <motion.div
      className="relative h-52 overflow-hidden rounded-xl cursor-pointer group"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onClick={() => onClick(index)}
    >
      <img
        src={src}
        alt={`Galerie Bild ${index + 1}`}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width={800}
        height={552}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.35)' }}
      >
        <span className="text-white text-xs font-semibold tracking-widest uppercase">Ansehen</span>
      </div>
    </motion.div>
  );
}
