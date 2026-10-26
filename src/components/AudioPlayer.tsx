import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import weddingAudioUrl from '../assets/Procession_de_Mariage_e10493be.mp3';

const AUDIO_SRC = weddingAudioUrl;
const MASTER_VOLUME = 0.50; // 50% volume as requested

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = MASTER_VOLUME;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.warn('Playback blocked until gesture:', err);
        });
    }
  }, []);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = MASTER_VOLUME;

    // 1. Attempt immediate unmuted autoplay
    const attemptUnmuted = audio.play();
    if (attemptUnmuted !== undefined) {
      attemptUnmuted
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // 2. If unmuted autoplay blocked by browser policy:
          // Start playing muted so audio buffer is primed and running
          audio.muted = true;
          audio
            .play()
            .then(() => {
              // Muted playback started successfully; will unmute on first gesture
            })
            .catch(() => {});
        });
    }

    // 3. Capture ANY user interaction on the entire document (touch, tap, click, swipe)
    const handleGesture = () => {
      startMusic();
      removeListeners();
    };

    const removeListeners = () => {
      ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'wheel'].forEach(evt => {
        document.removeEventListener(evt, handleGesture, true);
      });
      window.removeEventListener('start-wedding-audio', handleGesture);
    };

    ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'wheel'].forEach(evt => {
      document.addEventListener(evt, handleGesture, { capture: true });
    });
    window.addEventListener('start-wedding-audio', handleGesture);

    return () => {
      removeListeners();
    };
  }, [startMusic]);

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-50 flex items-center gap-2">
      {/* Hidden persistent native audio element in DOM with autoPlay and playsInline */}
      <audio
        ref={audioRef}
        id="wedding-bgm"
        src={AUDIO_SRC}
        autoPlay
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Tắt âm nhạc' : 'Bật nhạc lễ cưới: Procession de Mariage (50%)'}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-xs card-embossed ${
          isPlaying
            ? 'bg-[#FAF7F2]/95 border-[#C5A880] text-[#7A5B30]'
            : 'bg-[#F7F3EB]/90 border-[#C5A880]/50 text-stone-600 hover:border-[#8C714E] hover:text-[#7A5B30]'
        }`}
      >
        <span className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C714E] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#8C714E] rounded-full animate-ping" />
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" />
          )}
        </span>
        <span className="text-[11px] sm:text-xs font-serif tracking-wider whitespace-nowrap hidden sm:inline text-embossed">
          {isPlaying ? 'Procession de Mariage (50%)' : 'Phát nhạc nền'}
        </span>
      </button>
    </div>
  );
};
