import React from 'react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { Car, Bike, Sparkles, ShieldCheck, Coffee } from 'lucide-react';

interface DressCodeAndParkingPageProps {
  onNext?: () => void;
}

export const DressCodeAndParkingPage: React.FC<DressCodeAndParkingPageProps> = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2.5 sm:p-4 md:p-6 bg-heritage-page overflow-hidden">
      {/* Impressive Heritage Gold Filigree Inner Frame */}
      <div className="absolute inset-1.5 sm:inset-4 rounded-2xl border border-[#B38E5A]/35 pointer-events-none z-0" />
      <div className="absolute inset-2.5 sm:inset-5 rounded-xl border border-[#B38E5A]/20 pointer-events-none z-0" />

      {/* Heritage Corner Flourishes */}
      <WhiteLilyMotif variant="corner" size={32} className="absolute top-2.5 left-2.5 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={32} className="absolute top-2.5 right-2.5 -scale-x-100 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={32} className="absolute bottom-2.5 left-2.5 -scale-y-100 z-10 opacity-70" />
      <WhiteLilyMotif variant="corner" size={32} className="absolute bottom-2.5 right-2.5 -scale-100 z-10 opacity-70" />

      {/* Header */}
      <div className="relative z-10 text-center shrink-0 pt-0.5 sm:pt-1 flex flex-col items-center">
        <div className="sketch-embossed mb-0.5">
          <WhiteLilyMotif variant="seal" size={38} tone="sepia" />
        </div>
        <span className="text-[10px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#4A3622] font-semibold text-embossed">
          TIỆN ÍCH &amp; ĐÓN TIẾP
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide mt-0.5">
          Trang Phục, Bãi Xe &amp; Tiện Ích
        </h2>
        <p className="text-[11px] sm:text-xs text-[#382618] font-serif font-medium mt-0.5">
          Khách Sạn Grand Saigon · Chu đáo từng khoảnh khắc đón tiếp
        </p>
      </div>

      {/* Content Area - Vertically centered from top to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto space-y-2 sm:space-y-2.5 max-w-xl mx-auto w-full py-1">
        {/* Card 1: Dress Code */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#FAF7F2]/95 border border-[#B38E5A]/50 shadow-xs backdrop-blur-xs card-embossed">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6E4E24]" />
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#4A3622] font-serif font-bold text-embossed">
                TRANG PHỤC THAM DỰ (DRESS CODE)
              </span>
            </div>
            <span className="text-[10.5px] text-[#6E4E24] font-serif font-semibold hidden sm:inline">
              Sang trọng &amp; Nhã nhặn
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A130E] leading-snug">
            Trắng Tinh Khôi, Kem Nhạt &amp; Vàng Champagne
          </h4>
          <p className="text-[10.5px] sm:text-xs text-[#382618] font-sans leading-tight mt-0.5">
            Khuyến khích trang phục màu sắc thanh lịch hòa hợp cùng sắc hoa Lily trắng và không gian cổ điển Grand Saigon.
          </p>

          {/* Color Palette Swatches */}
          <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-[#B38E5A]/30">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFFFFF] border border-stone-300 shadow-2xs" title="Trắng tinh khôi" />
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FAF5EE] border border-stone-300 shadow-2xs" title="Kem nhạt" />
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#EADBB8] border border-stone-300 shadow-2xs" title="Vàng Champagne" />
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#292524] border border-stone-400 shadow-2xs" title="Âu phục Đen/Xám" />
            </div>
            <span className="text-[10.5px] sm:text-xs text-[#4A3622] font-serif font-semibold ml-1">
              Trắng · Kem · Vàng Champagne · Âu Phục
            </span>
          </div>
        </div>

        {/* Card 2: Rooftop Grand Lounge for early arrival / sightseeing */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#FAF7F2]/95 border border-[#B38E5A]/50 shadow-xs backdrop-blur-xs flex items-start gap-2.5 card-embossed">
          <div className="p-1.5 rounded-lg bg-white border border-[#B38E5A]/50 shrink-0 mt-0.5">
            <Coffee className="w-4 h-4 text-[#6E4E24]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A130E] leading-snug">
                Rooftop Grand Lounge (Tầng 20)
              </h4>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#F5EFE6] text-[#6E4E24] font-serif font-semibold border border-[#B38E5A]/30">
                Check-in sớm
              </span>
            </div>
            <p className="text-[10.5px] sm:text-xs text-[#382618] font-sans leading-tight mt-0.5">
              Dành cho Quý khách đến sớm hoặc muốn tham quan, ngắm trọn vẹn khung cảnh sông Sài Gòn và trung tâm thành phố từ trên cao trước khi bước vào sảnh dạ tiệc.
            </p>
          </div>
        </div>

        {/* Card 3: Parking for Cars */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2]/95 border border-[#B38E5A]/50 shadow-xs backdrop-blur-xs flex items-start gap-2.5 card-embossed">
          <div className="p-1.5 rounded-lg bg-white border border-[#B38E5A]/50 shrink-0 mt-0.5">
            <Car className="w-4 h-4 text-[#6E4E24]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A130E] leading-snug">
              Bãi Đỗ Xe Ô Tô
            </h4>
            <p className="text-[10.5px] sm:text-xs text-[#382618] font-sans leading-tight mt-0.5">
              Tầng hầm khách sạn Grand Saigon (Lối vào phía đường Ngô Đức Kế). Đội ngũ an ninh hỗ trợ điều phối chu đáo.
            </p>
          </div>
        </div>

        {/* Card 4: Parking for Motorcycles */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2]/95 border border-[#B38E5A]/50 shadow-xs backdrop-blur-xs flex items-start gap-2.5 card-embossed">
          <div className="p-1.5 rounded-lg bg-white border border-[#B38E5A]/50 shrink-0 mt-0.5">
            <Bike className="w-4 h-4 text-[#6E4E24]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A130E] leading-snug">
              Bãi Giữ Xe Máy (Miễn Phí)
            </h4>
            <p className="text-[10.5px] sm:text-xs text-[#382618] font-sans leading-tight mt-0.5">
              Hầm giữ xe máy chuyên dụng ngay cạnh sảnh chính (hoàn toàn miễn phí vé cho toàn bộ khách mời).
            </p>
          </div>
        </div>

        {/* Reassurance Footer with Reception Time in font-serif */}
        <div className="p-2 rounded-xl bg-[#FAF7F2]/90 border border-[#B38E5A]/40 flex items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6E4E24] shrink-0" />
            <p className="text-[10.5px] sm:text-xs font-serif text-[#1A130E] font-medium leading-normal">
              Khung giờ đón khách: <strong className="font-serif font-bold text-[#6E4E24]">17:30 - 21:30</strong> tại số 08 Đồng Khởi. Đội ngũ an ninh luôn sẵn sàng đón tiếp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
