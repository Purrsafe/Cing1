import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, BookOpen } from 'lucide-react';

interface PageFlipContainerProps {
  children: React.ReactNode[];
  pageTitles: string[];
  currentPage: number;
  onPageChange: (pageIndex: number) => void;
}

export const PageFlipContainer: React.FC<PageFlipContainerProps> = ({
  children,
  pageTitles,
  currentPage,
  onPageChange,
}) => {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isFlipping, setIsFlipping] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Soft delicate paper flip sound
  const playPageTurnSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 0.16;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1300, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
      bandpass.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  const totalPages = children.length;

  const goToPage = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalPages || newIndex === currentPage || isFlipping) {
        return;
      }
      playPageTurnSound();
      setDirection(newIndex > currentPage ? 'forward' : 'backward');
      setIsFlipping(true);
      onPageChange(newIndex);
      setTimeout(() => setIsFlipping(false), 750);
    },
    [currentPage, isFlipping, onPageChange, playPageTurnSound, totalPages]
  );

  const next = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const prev = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Handle Wheel Scroll (Debounced)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollable = (e.target as HTMLElement).closest('.allow-scroll');
      if (scrollable) {
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 5;
        const atTop = scrollable.scrollTop <= 5;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 750) return;

      if (Math.abs(e.deltaY) > 25) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          next();
        } else {
          prev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [next, prev]);

  // Handle Keyboard Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Touch Swipe for Mobile (Up/Down)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Mobile vertical swipe
    if (Math.abs(diffY) > 35 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Flip variants for Short Edge vertical book flip
  const flipVariants = {
    initial: (dir: 'forward' | 'backward') => ({
      rotateX: dir === 'forward' ? 75 : -75,
      opacity: 0,
      scale: 0.95,
      y: dir === 'forward' ? 80 : -80,
      transformOrigin: dir === 'forward' ? 'top center' : 'bottom center',
    }),
    animate: {
      rotateX: 0,
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin: 'center center',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: 'forward' | 'backward') => ({
      rotateX: dir === 'forward' ? -75 : 75,
      opacity: 0,
      scale: 0.95,
      y: dir === 'forward' ? -80 : 80,
      transformOrigin: dir === 'forward' ? 'top center' : 'bottom center',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden bg-cream-paper select-none flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '2000px' }}
    >
      {/* Top Short Edge Hinge Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-b from-[#7A6142]/40 via-[#BA9560]/30 to-transparent z-40 pointer-events-none" />

      {/* Viewport for Pages: Full bleed on mobile, framed on desktop */}
      <div className="relative w-full h-full flex items-center justify-center p-0 sm:p-3 md:p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full sm:max-w-md md:max-w-2xl lg:max-w-4xl sm:max-h-[94vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-[0_12px_40px_rgba(42,34,24,0.12)] bg-[#F8F5EE] border-0 sm:border border-[#C5A880]/50 overflow-hidden relative flex flex-col"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Subtle inner edge highlight on desktop */}
            <div className="absolute inset-0 pointer-events-none border border-white/60 rounded-none sm:rounded-2xl md:rounded-3xl z-30" />
            
            {/* Curated Page Content with Mobile Scroll Ergonomics */}
            <div className="relative z-10 w-full h-full flex flex-col overflow-y-auto no-scrollbar allow-scroll">
              {children[currentPage]}
            </div>

            {/* Bottom paper shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#8C714E]/10 to-transparent pointer-events-none z-20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Left: Page Title Indicator (Desktop) */}
      <div className="fixed top-3.5 left-3.5 z-40 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EB]/95 border border-[#C5A880]/50 text-[#5C4A34] text-xs font-serif backdrop-blur-md shadow-xs">
        <BookOpen className="w-3.5 h-3.5 text-[#8C714E]" />
        <span>Trang {currentPage + 1} / {totalPages}:</span>
        <span className="font-semibold text-[#1C1917]">{pageTitles[currentPage]}</span>
      </div>

      {/* Right Rail: Navigation Dots (Hidden on small mobile screens to prevent clutter) */}
      <div className="fixed right-2.5 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-2.5">
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx)}
            className="group relative flex items-center justify-end p-1 focus:outline-none"
            aria-label={`Trang ${idx + 1}: ${pageTitles[idx]}`}
          >
            <span className="absolute right-7 px-2.5 py-1 rounded bg-[#26201A] text-[#F7F3EB] text-xs font-serif whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              {pageTitles[idx]}
            </span>
            <div
              className={`transition-all duration-300 rounded-full ${
                currentPage === idx
                  ? 'w-2 h-6 bg-[#8C714E] shadow-xs'
                  : 'w-1.5 h-1.5 bg-[#C5A880]/50 group-hover:bg-[#8C714E]'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Super Compact, Minimal Page Counter Pill (image 1) */}
      <div className="fixed bottom-2 right-2 sm:bottom-3 sm:right-4 z-40 flex items-center gap-0.5 bg-[#FAF7F2]/88 backdrop-blur-xs px-2 py-0.5 rounded-full border border-[#C5A880]/50 shadow-2xs card-embossed scale-95 sm:scale-100">
        <button
          onClick={prev}
          disabled={currentPage === 0}
          className={`p-0.5 rounded-full transition-colors ${
            currentPage === 0
              ? 'text-stone-300 cursor-not-allowed opacity-30'
              : 'text-[#8C714E] hover:text-[#5C4A34] active:scale-90'
          }`}
          title="Trang trước"
          aria-label="Trang trước"
        >
          <ChevronUp className="w-3 h-3" />
        </button>

        <span className="text-[10px] font-serif font-bold text-[#6E4E24] px-1 tabular-nums tracking-normal">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={next}
          disabled={currentPage === totalPages - 1}
          className={`p-0.5 rounded-full transition-colors ${
            currentPage === totalPages - 1
              ? 'text-stone-300 cursor-not-allowed opacity-30'
              : 'text-[#8C714E] hover:text-[#5C4A34] active:scale-90'
          }`}
          title="Trang sau"
          aria-label="Trang sau"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
