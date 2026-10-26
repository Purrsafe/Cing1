import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { GlassWater, Heart, Music, Sparkles, Calendar as CalendarIcon, Download, Check } from 'lucide-react';
import domeWatermarkImg from '../../assets/image_5cc2c043.png';

interface BanquetInfoPageProps {
  onNext: () => void;
}

export const BanquetInfoPage: React.FC<BanquetInfoPageProps> = ({ onNext }) => {
  // Wedding target timestamp: September 18, 2027 18:00 GMT+7
  const targetDate = new Date('2027-09-18T18:00:00+07:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedCalendar, setCopiedCalendar] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timelineItems = [
    {
      time: '17:30',
      title: 'Đón Tiếp Quan Khách',
      desc: 'Tiệc cocktail nhẹ, chụp hình lưu niệm cùng Cô Dâu & Chú Rể tại tiền sảnh',
      icon: GlassWater,
    },
    {
      time: '18:30',
      title: 'Cử Hành Hôn Lễ',
      desc: 'Nghi thức trao lời ước nguyện trăm năm, trao nhẫn và rót rượu mừng tân hôn',
      icon: Heart,
    },
    {
      time: '19:00',
      title: 'Khai Tiệc Dạ Yến',
      desc: 'Thưởng thức ẩm thực cao cấp trong không gian hòa tấu thính phòng cổ điển',
      icon: Sparkles,
    },
    {
      time: '20:30',
      title: 'Âm Nhạc & Giao Lưu',
      desc: 'Tung hoa cưới, những lời chúc thân tình và lưu giữ khoảnh khắc ngọt ngào',
      icon: Music,
    },
  ];

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent('Lễ Thành Hôn: Dung Minh Cường & Phạm Thị Diễm Trinh | Hotel Grand Saigon');
    const details = encodeURIComponent('Trân trọng kính mời quý khách tham dự lễ cưới tại Khách sạn Grand Saigon (08 Đồng Khởi, Q.1, TP. HCM)');
    const location = encodeURIComponent('Hotel Grand Saigon, 08 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270918T103000Z/20270918T150000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Cuong and Trinh Wedding//Grand Saigon//VI',
      'BEGIN:VEVENT',
      'UID:wedding-cuong-trinh-2027@grandsaigon.com',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20270918T103000Z',
      'DTEND:20270918T150000Z',
      'SUMMARY:Lễ Thành Hôn: Dung Minh Cường & Phạm Thị Diễm Trinh',
      'DESCRIPTION:Tiệc cưới trang trọng tổ chức tại Khách sạn Grand Saigon.',
      'LOCATION:Hotel Grand Saigon, 08 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Thiep-Cuoi-Cuong-Trinh-18-09-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedCalendar(true);
    setTimeout(() => setCopiedCalendar(false), 3000);
  };

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

      {/* Background Architectural Dome Watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 pointer-events-none opacity-[0.05] w-80 h-80">
        <img
          src={domeWatermarkImg}
          alt=""
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center shrink-0 pt-0.5 sm:pt-1 flex flex-col items-center">
        <div className="sketch-embossed mb-0.5">
          <WhiteLilyMotif variant="seal" size={38} tone="sepia" />
        </div>
        <span className="text-[10px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#4A3622] font-semibold text-embossed">
          CHƯƠNG TRÌNH HÔN LỄ
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide mt-0.5">
          Thông Tin Buổi Tiệc
        </h2>
        <p className="text-[11px] sm:text-xs text-[#382618] font-serif font-medium mt-0.5">
          Khách Sạn Grand Saigon · Thứ Bảy, 18 Tháng 9 Năm 2027
        </p>
      </div>

      {/* Core Content Area - Vertically centered from top to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto space-y-2.5 sm:space-y-3.5 max-w-xl mx-auto w-full py-1">
        {/* Countdown Box */}
        <div className="bg-[#FAF7F2]/95 rounded-xl sm:rounded-2xl border border-[#B38E5A]/50 p-2 sm:p-3 shadow-xs text-center backdrop-blur-xs card-embossed">
          <span className="text-[9px] sm:text-xs tracking-widest uppercase text-[#4A3622] font-serif font-bold block mb-1.5 text-embossed">
            ĐẾM NGƯỢC ĐẾN NGÀY TRỌNG ĐẠI (18 · 09 · 2027)
          </span>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-sm mx-auto">
            <div className="flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-lg bg-white border border-[#B38E5A]/35 shadow-2xs">
              <span className="text-lg sm:text-2xl font-serif font-bold text-[#1A130E] tabular-nums">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-[#4A3622] font-serif font-semibold">Ngày</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-lg bg-white border border-[#B38E5A]/35 shadow-2xs">
              <span className="text-lg sm:text-2xl font-serif font-bold text-[#1A130E] tabular-nums">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-[#4A3622] font-serif font-semibold">Giờ</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-lg bg-white border border-[#B38E5A]/35 shadow-2xs">
              <span className="text-lg sm:text-2xl font-serif font-bold text-[#1A130E] tabular-nums">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-[#4A3622] font-serif font-semibold">Phút</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-lg bg-white border border-[#B38E5A]/35 shadow-2xs">
              <span className="text-lg sm:text-2xl font-serif font-bold text-[#6E4E24] tabular-nums">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-[#4A3622] font-serif font-semibold">Giây</span>
            </div>
          </div>
        </div>

        {/* Timeline Sequence */}
        <div className="bg-[#FAF7F2]/90 rounded-xl sm:rounded-2xl border border-[#B38E5A]/45 p-2.5 sm:p-4 shadow-xs backdrop-blur-xs card-embossed">
          <h3 className="text-[11px] sm:text-xs font-serif font-bold text-[#1A130E] uppercase tracking-wider mb-2 text-center text-embossed-title">
            LỊCH TRÌNH HÔN LỄ (18.09.2027)
          </h3>
          <div className="relative pl-5 sm:pl-6 space-y-2 sm:space-y-2.5 before:content-[''] before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-[1.5px] before:bg-[#B38E5A]/60">
            {timelineItems.map((item, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="relative group"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-5 sm:-left-6 top-0.5 w-3 h-3 rounded-full bg-[#FAF7F2] border-2 border-[#6E4E24] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#6E4E24]" />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#6E4E24] tabular-nums whitespace-nowrap">
                      {item.time}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A130E] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#382618] font-sans leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Add to Calendar */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 pt-0.5">
          <button
            onClick={handleAddToGoogleCalendar}
            className="flex-1 max-w-[210px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#292524] text-[#FAF7F2] text-[11px] sm:text-xs font-serif font-semibold hover:bg-black transition-all shadow-xs"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-[#EADBB8] shrink-0" />
            <span className="truncate">Thêm Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadICS}
            className="flex-1 max-w-[210px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#B38E5A]/60 text-[#2B1D12] text-[11px] sm:text-xs font-serif font-semibold hover:bg-stone-50 transition-all shadow-xs"
          >
            {copiedCalendar ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-bold truncate">Đã tải lịch</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#6E4E24] shrink-0" />
                <span className="truncate">Tải cho iPhone / iCal</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
