import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Star, ArrowUpRight } from '@phosphor-icons/react';
import fordMitAnhaenger from '../../brand_assets/Ford_mit_Anhänger.webp';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#111111]"
    >
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, #111111 0%, transparent 100%)',
        }}
      />

      {/* Content — left-aligned, asymmetric (taste-skill anti-center-bias rule) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-20">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6"
          >
            Sonthofen im Allgäu
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-black tracking-tighter leading-none text-white mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            ANHÄNGER
            <br />
            <span className="text-zinc-300">VERMIETUNG</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-[52ch]"
          >
            Premium-Anhänger für jeden Anlass — vom kleinen Fiat 500 bis zum
            großen RS6. Flexible Vermietung mit persönlicher Beratung.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToContact}
              className="text-sm font-semibold text-zinc-950 bg-white px-7 py-3.5 rounded hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200"
            >
              Anfrage stellen
            </button>
            <button
              onClick={scrollDown}
              className="text-sm font-semibold text-white border border-white/20 px-7 py-3.5 rounded hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
            >
              Mehr erfahren
            </button>
          </motion.div>

          {/* Google rating badge */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
            href="https://share.google/terGN8aPecS9CBDz6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/[0.15] transition-all duration-200"
          >
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} weight="fill" className="text-amber-400" />
              ))}
            </span>
            <span className="text-sm font-semibold text-white">4,8</span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">44 Rezensionen auf Google</span>
            <ArrowUpRight size={12} className="text-zinc-500" />
          </motion.a>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center gap-3 text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors"
            onClick={scrollDown}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} weight="bold" />
            </motion.div>
            <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Ford image — 62% container from right, zoomed composition */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 hidden lg:block overflow-hidden"
        style={{ width: '62%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
      >
        <img
          src={fordMitAnhaenger}
          alt=""
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)', objectPosition: '65% center' }}
          loading="lazy"
          width={2500}
          height={1667}
        />
      </motion.div>

      {/* Section-level fades — span full viewport, no container boundary visible */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Left fade — solid until container edge, smooth fade over it */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #111111 0%, #111111 38%, rgba(17,17,17,0.7) 50%, rgba(17,17,17,0.1) 62%, transparent 74%)',
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #111111 0%, transparent 22%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #111111 0%, transparent 28%)',
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, #111111 0%, transparent 10%)',
          }}
        />
      </div>

      {/* Right-side subtle stat */}
      <motion.div
        className="absolute right-8 lg:right-12 bottom-20 hidden lg:flex flex-col items-end gap-1 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-4xl font-black text-white tracking-tighter">2022</span>
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Gegründet</span>
      </motion.div>
    </section>
  );
}
