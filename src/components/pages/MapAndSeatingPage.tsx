import React, { useState } from 'react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { MapPin, Navigation, Copy, Check, Car, Bike, ExternalLink, Compass } from 'lucide-react';
import domeWatermarkImg from '../../assets/image_5cc2c043.png';

interface MapAndSeatingPageProps {
  onNext: () => void;
}

export const MapAndSeatingPage: React.FC<MapAndSeatingPageProps> = ({ onNext }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const venueAddress = '08 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`Khách sạn Grand Saigon, ${venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Hotel+Grand+Saigon+08+Dong+Khoi+Ben+Nghe+District+1+Ho+Chi+Minh+City',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenAppleMaps = () => {
    window.open(
      'https://maps.apple.com/?q=Hotel+Grand+Saigon&address=08+Dong+Khoi,+District+1,+Ho+Chi+Minh+City',
      '_blank',
      'noopener,noreferrer'
    );
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

      {/* Architectural Watermark in Background */}
      <div className="absolute left-6 bottom-4 pointer-events-none opacity-[0.05] w-80 h-80">
        <img
          src={domeWatermarkImg}
          alt=""
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      {/* Header with High-Contrast Typography */}
      <div className="relative z-10 flex flex-col items-center text-center shrink-0 pt-1">
        <div className="sketch-embossed mb-1">
          <WhiteLilyMotif variant="seal" size={44} tone="sepia" />
        </div>
        <span className="text-[10px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#4A3622] font-semibold text-embossed">
          CHỈ DẪN ĐƯỜNG ĐI
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide mt-0.5">
          Bản Đồ Đến Khách Sạn
        </h2>
        <p className="text-[11px] sm:text-xs text-[#382618] font-serif font-medium mt-0.5">
          Khách Sạn Grand Saigon Since 1930 · 08 Đồng Khởi, Quận 1, TP. HCM
        </p>
      </div>

      {/* Main Container - Sized to fit 100% on mobile without scroll */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto space-y-2.5 max-w-2xl mx-auto w-full py-1">
        {/* Map Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-[#B38E5A]/50 shadow-sm bg-white aspect-[16/10] sm:aspect-[16/9] max-h-[38vh] sm:max-h-[42vh]">
          <iframe
            title="Bản đồ Hotel Grand Saigon"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5085817658745!2d106.70298137586864!3d10.772304959266395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4400494ecf%3A0xe6bf44b5fe4a3dfb!2sGrand%20Hotel%20Saigon!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Badge */}
          <div className="absolute top-2 left-2 bg-[#FAF7F2]/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#B38E5A]/60 shadow-xs hidden sm:flex items-center gap-2">
            <WhiteLilyMotif variant="sketch" size={28} tone="sepia" className="shrink-0" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#4A3622] font-serif font-bold block leading-none">
                ĐIỂM HẸN TÂN HÔN
              </span>
              <h4 className="text-[11px] font-serif font-bold text-[#1A130E] leading-tight">
                Grand Hotel Saigon (08 Đồng Khởi)
              </h4>
            </div>
          </div>
        </div>

        {/* Address Bar & Navigation Actions */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2]/95 border border-[#B38E5A]/45 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs card-embossed">
          <div className="text-center sm:text-left min-w-0">
            <span className="text-[9px] tracking-widest uppercase text-[#4A3622] font-serif font-bold block">
              ĐỊA CHỈ TỔ CHỨC
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#1A130E] font-serif truncate">
              {venueAddress}
            </p>
            <span className="text-[10px] sm:text-[11px] text-[#4A3622] font-serif font-medium leading-tight block">
              Góc Đồng Khởi &amp; Ngô Đức Kế · Gần Bến Bạch Đằng &amp; Phố đi bộ Nguyễn Huệ
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={handleCopyAddress}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-[#B38E5A]/70 bg-white hover:bg-stone-50 text-[11px] font-serif font-bold text-[#2B1D12] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#6E4E24]" />
                  <span>Sao chép</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenGoogleMaps}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-[#1A130E] hover:bg-black text-[#FAF7F2] text-[11px] font-serif font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Navigation className="w-3 h-3 text-[#EADBB8]" />
              <span>Chỉ Đường Maps</span>
            </button>

            <button
              onClick={handleOpenAppleMaps}
              className="px-2.5 py-1.5 rounded-lg border border-[#B38E5A]/60 bg-white hover:bg-stone-50 text-[11px] font-serif text-[#2B1D12] font-semibold transition-colors hidden md:flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3 text-[#4A3622]" />
              <span>Apple Maps</span>
            </button>
          </div>
        </div>

        {/* Heritage Note Banner */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2]/80 border border-[#B38E5A]/30 flex items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#6E4E24] shrink-0" />
            <p className="text-[10px] sm:text-[11px] font-serif text-[#1A130E] font-medium leading-tight">
              Khu vực trung tâm Quận 1, khuyến khích Quý vị đi bằng taxi hoặc xe công nghệ nếu có dùng bia rượu để chung vui trọn vẹn và an toàn.
            </p>
          </div>
          <WhiteLilyMotif variant="sketch" size={32} tone="sepia" className="shrink-0 hidden sm:inline-flex" />
        </div>
      </div>
    </div>
  );
};
