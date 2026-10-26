import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { GalleryPhoto } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const WEDDING_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'GRAND SAIGON',
    caption: 'Không gian tiệc cưới Grand Hotel Saigon',
    tag: 'GRAND SAIGON',
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    title: 'HOA CƯỚI TINH KHÔI',
    caption: 'Đóa hoa Lily bạch trà tinh khiết',
    tag: 'HOA CƯỚI TINH KHÔI',
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'KHOẢNH KHẮC VĨNH CỬU',
    caption: 'Vũ điệu khiêu vũ đầu tiên',
    tag: 'KHOẢNH KHẮC VĨNH CỬU',
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    title: 'KỶ VẬT TÌNH YÊU',
    caption: 'Nhẫn cưới tân hôn trăm năm',
    tag: 'KỶ VẬT TÌNH YÊU',
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    title: 'SẢNH DẠ TIỆC',
    caption: 'Không gian dạ yến sang trọng',
    tag: 'SẢNH DẠ TIỆC',
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    title: 'NỤ CƯỜI HẠNH PHÚC',
    caption: 'Nụ cười ngày chung đôi',
    tag: 'NỤ CƯỜI HẠNH PHÚC',
  },
];

interface GalleryPageProps {
  onNext: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth * 0.8;
      const index = Math.round(scrollLeft / (itemWidth || 1));
      setActivePhotoIndex(Math.min(Math.max(index, 0), WEDDING_PHOTOS.length - 1));
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-5 md:p-6 bg-heritage-page overflow-hidden">
      {/* Impressive Heritage Gold Filigree Inner Frame */}
      <div className="absolute inset-2 sm:inset-4 rounded-2xl border border-[#B38E5A]/35 pointer-events-none z-0" />
      <div className="absolute inset-3 sm:inset-5 rounded-xl border border-[#B38E5A]/20 pointer-events-none z-0" />

      {/* Heritage Corner Flourishes */}
      <WhiteLilyMotif variant="corner" size={38} className="absolute top-3 left-3 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={38} className="absolute top-3 right-3 -scale-x-100 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={38} className="absolute bottom-3 left-3 -scale-y-100 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={38} className="absolute bottom-3 right-3 -scale-100 z-10 opacity-70" />

      {/* Header with 2 centered lines per image P4 */}
      <div className="relative z-10 flex flex-col items-center text-center shrink-0 pt-1.5 sm:pt-2">
        <div className="sketch-embossed mb-1.5">
          <WhiteLilyMotif variant="seal" size={48} tone="sepia" />
        </div>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide px-2 flex flex-col items-center text-center">
          <span className="block leading-snug">Khoảnh Khắc Chung Đôi Của</span>
          <span className="inline-block mt-0.5 text-[#6E4E24] font-black underline decoration-[#B38E5A]/80 underline-offset-4 tracking-wider">
            HAI ĐỨA MÌNH
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-[#382618] font-serif italic max-w-md mt-1 px-2 font-medium">
          "Giữa muôn vạn nẻo đường, gặp được người chính là duyên tao ngộ đẹp nhất của thanh xuân."
        </p>
      </div>

      {/* Horizontal Scroll Filmstrip Carousel - Enlarged Photos as requested */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto w-full max-w-5xl mx-auto overflow-hidden py-1.5">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FAF7F2]/95 border border-[#B38E5A]/60 shadow-md text-[#2B1D12] hover:bg-white hover:scale-105 active:scale-95 flex items-center justify-center transition-all backdrop-blur-xs"
          title="Xem ảnh trước"
          aria-label="Xem ảnh trước"
        >
          <ChevronLeft className="w-5 h-5 text-[#382618]" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FAF7F2]/95 border border-[#B38E5A]/60 shadow-md text-[#2B1D12] hover:bg-white hover:scale-105 active:scale-95 flex items-center justify-center transition-all backdrop-blur-xs"
          title="Xem ảnh kế tiếp"
          aria-label="Xem ảnh kế tiếp"
        >
          <ChevronRight className="w-5 h-5 text-[#382618]" />
        </button>

        {/* Horizontal Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-7 sm:px-12 py-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {WEDDING_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group shrink-0 snap-center h-[44vh] sm:h-[50vh] max-h-[420px] aspect-[3/4] max-w-[85vw] rounded-2xl overflow-hidden bg-[#1A130E] border border-[#B38E5A]/50 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#6E4E24] relative"
            >
              {/* Photo Frame - Fits 100% with zero white gaps */}
              <div className="relative w-full h-full overflow-hidden bg-[#1A130E]">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient scrim at bottom just for badge contrast */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                {/* ONLY photo title badge in uppercase */}
                <div className="absolute bottom-3 inset-x-3 flex justify-center">
                  <span className="px-3.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-xs sm:text-sm tracking-wider uppercase font-serif font-bold text-[#FAF7F2] border border-[#B38E5A]/45 shadow-sm text-center">
                    {photo.title}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-2.5 right-2.5 p-2 bg-black/45 rounded-full backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {WEDDING_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const itemWidth = scrollRef.current.clientWidth * 0.8;
                  scrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                activePhotoIndex === i
                  ? 'w-6 h-1.5 bg-[#6E4E24]'
                  : 'w-1.5 h-1.5 bg-[#B38E5A]/40 hover:bg-[#6E4E24]'
              }`}
              title={`Ảnh ${i + 1}`}
              aria-label={`Ảnh ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#1A130E] rounded-2xl overflow-hidden border border-[#B38E5A]/50 flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 text-stone-300 hover:text-white bg-black/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-[#261B12] text-[#FAF7F2] border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-display font-semibold">
                    {selectedPhoto.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-serif italic mt-0.5">
                    {selectedPhoto.caption}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
