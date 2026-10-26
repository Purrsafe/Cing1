import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/assets/aistudio/Procession_de_Mariage_e10493be.mp3';
const MASTER_VOLUME = 0.50; // 50% volume as requested

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and configure audio element
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = MASTER_VOLUME;
    audioRef.current = audio;

    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until gesture
          setIsPlaying(false);
        });
    };

    // Attempt autoplay immediately
    playAudio();

    // In case browser blocks until user interaction, start on first touch/click
    const handleFirstGesture = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
      ['click', 'touchstart', 'touchend', 'scroll'].forEach(evt => {
        window.removeEventListener(evt, handleFirstGesture);
      });
    };

    ['click', 'touchstart', 'touchend', 'scroll'].forEach(evt => {
      window.addEventListener(evt, handleFirstGesture, { passive: true, once: true });
    });

    return () => {
      ['click', 'touchstart', 'touchend', 'scroll'].forEach(evt => {
        window.removeEventListener(evt, handleFirstGesture);
      });
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = MASTER_VOLUME;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.warn('Audio play error:', err);
        });
    }
  };

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-50 flex items-center gap-2">
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
