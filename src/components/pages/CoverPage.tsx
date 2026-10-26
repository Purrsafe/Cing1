import React from 'react';
import { motion } from 'motion/react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import coverSketchImg from '../../assets/schetch_clean_perfect.jpg';

interface CoverPageProps {
  onNext: () => void;
  guestName?: string;
  groomName?: string;
  brideName?: string;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onNext,
  guestName = 'Quý Khách & Gia Đình',
  groomName = 'Dung Minh Cường',
  brideName = 'Phạm Thị Diễm Trinh',
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center text-center p-3 sm:p-5 md:p-6 overflow-hidden bg-[#F7F2E8]">
      {/* Full Bleed Architectural Sketch Cover Background (Cleaned without Đồng Khởi) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src={coverSketchImg}
          alt="Khách sạn Grand Saigon 1930"
          className="w-full h-full object-cover object-bottom sm:object-center filter contrast-[1.12] brightness-[1.01] sketch-embossed opacity-55 sm:opacity-60 transition-transform duration-1000 scale-102"
        />
        {/* Soft Warm Cream Scrim to enhance contrast & embossed depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F2E8]/90 via-[#F7F2E8]/45 to-[#F7F2E8]/92 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#F7F2E8]/25 to-[#F7F2E8]/70 pointer-events-none" />
      </div>

      {/* Delicate Embossed Corner Accents */}
      <WhiteLilyMotif variant="corner" size={40} className="absolute top-2.5 left-2.5 z-10 opacity-75" />
      <WhiteLilyMotif variant="corner" size={40} className="absolute top-2.5 right-2.5 -scale-x-100 z-10 opacity-75" />
      <WhiteLilyMotif variant="corner" size={40} className="absolute bottom-2.5 left-2.5 -scale-y-100 z-10 opacity-75" />
      <WhiteLilyMotif variant="corner" size={40} className="absolute bottom-2.5 right-2.5 -scale-100 z-10 opacity-75" />

      {/* Top Section: Crowned by Signature White Lily Logo at the very top */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full flex flex-col items-center pt-2 sm:pt-4"
      >
        {/* Logo hoa Lily ở trang 1 đặt lên trên cùng để nổi bật */}
        <div className="flex items-center justify-center mb-2 sketch-embossed">
          <WhiteLilyMotif variant="seal" size={52} tone="sepia" />
        </div>

        <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#4A3622] font-semibold mb-1 text-embossed uppercase">
          GRAND HOTEL SAIGON
        </span>

        {/* Tiêu đề trang dùng font Cormorant Garamond đồng bộ mẫu Quý Khách & Gia Đình */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide">
          Thiệp Mời Thành Hôn
        </h1>

        {/* Personalized Guest Badge with Embossed Letterpress Styling */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-2.5 px-4 py-1.5 rounded-full border border-[#B38E5A]/70 bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs card-embossed inline-flex items-center gap-2 max-w-[90vw]"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#6E4E24] font-serif font-bold">
              Kính mời
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6E4E24]" />
            <span className="text-xs sm:text-base font-serif font-bold text-[#1A130E] truncate">
              {guestName}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Center Section: Couple Typography (High Contrast & Prominent) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
        className="relative z-10 my-auto w-full max-w-md flex flex-col items-center py-2 px-2"
      >
        <div className="flex flex-col items-center w-full">
          {/* Dung Minh Cường & Phạm Thị Diễm Trinh với font Cormorant Garamond sắc nét, chuẩn phong cách */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#1A130E] font-bold tracking-tight leading-tight text-embossed-dark">
            {groomName}
          </h2>
          <span className="text-2xl sm:text-4xl font-serif text-[#6E4E24] my-1 font-bold italic">
            &amp;
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#1A130E] font-bold tracking-tight leading-tight text-embossed-dark">
            {brideName}
          </h2>

          <div className="flex items-center gap-3 mt-3">
            <div className="h-[1.5px] w-12 bg-[#B38E5A]" />
            <p className="text-xs sm:text-base tracking-[0.18em] uppercase text-[#382618] font-serif font-bold text-embossed flex items-center gap-1.5">
              <span>Save Our Date</span>
              <span>·</span>
              <span className="text-sm sm:text-lg font-bold tracking-wider text-[#1A130E]">18 · 09 · 2027</span>
            </p>
            <div className="h-[1.5px] w-12 bg-[#B38E5A]" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Section: Date, Address & Swipe Prompt (High Contrast) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full flex flex-col items-center pb-2.5 sm:pb-3"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-serif mb-3">
          <span className="inline-flex items-center gap-1.5 text-[#2E1F14] font-bold text-embossed">
            <Calendar className="w-4 h-4 text-[#6E4E24]" />
            <span>Thứ Bảy, <strong className="text-sm sm:text-base font-bold text-[#1A130E]">18</strong> Tháng <strong className="text-sm sm:text-base font-bold text-[#1A130E]">9</strong> Năm <strong className="text-sm sm:text-base font-bold text-[#1A130E]">2027</strong></span>
          </span>
          <span className="hidden sm:inline text-[#B38E5A] font-bold">·</span>
          <span className="inline-flex items-center gap-1.5 text-[#2E1F14] font-bold text-center text-embossed">
            <MapPin className="w-4 h-4 text-[#6E4E24] shrink-0" />
            <span><strong className="text-sm sm:text-base font-bold text-[#1A130E]">08</strong> Đồng Khởi, Bến Nghé, Quận <strong className="text-sm sm:text-base font-bold text-[#1A130E]">1</strong>, TP. HCM</span>
          </span>
        </div>

        {/* Interactive Flip Up Prompt */}
        <button
          onClick={() => {
            try {
              window.dispatchEvent(new Event('start-wedding-audio'));
            } catch {}
            onNext();
          }}
          className="group flex flex-col items-center gap-1 text-[#382618] hover:text-black active:scale-95 transition-all focus:outline-none py-1"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.24em] font-display font-bold text-embossed">
            Vuốt lên để mở thiệp
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#6E4E24] group-hover:scale-110 transition-transform" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
};
