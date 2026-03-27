import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';

type Props = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

export default function GalleryLightbox({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Schließen"
      >
        <X size={24} weight="bold" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 text-zinc-400 hover:text-white transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Vorheriges Bild"
      >
        <ArrowLeft size={28} weight="bold" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Galerie Bild ${index + 1}`}
          className="object-contain rounded-lg shadow-2xl"
          style={{ maxWidth: '90vw', maxHeight: '85vh' }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-4 text-zinc-400 hover:text-white transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Nächstes Bild"
      >
        <ArrowRight size={28} weight="bold" />
      </button>

      {/* Counter */}
      <p
        className="absolute bottom-6 text-zinc-500 text-xs tracking-widest"
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {images.length}
      </p>
    </motion.div>
  );
}
