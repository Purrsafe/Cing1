import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { RSVPRecord } from '../../types';
import { Heart, MessageCircle, Mail, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import domeWatermarkImg from '../../assets/image_5cc2c043.png';

const NOTIFICATION_EMAIL = 'dmcuong.contact@gmail.com';

interface ThankYouPageProps {
  onRestart: () => void;
  guestName?: string;
  groomName?: string;
  brideName?: string;
  submittedData?: RSVPRecord | null;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  onRestart,
  guestName = 'Quý Khách & Gia Đình',
  groomName = 'Dung Minh Cường',
  brideName = 'Phạm Thị Diễm Trinh',
  submittedData,
}) => {
  const [zaloCopied, setZaloCopied] = useState<boolean>(false);

  const getZaloMessage = () => {
    const name = submittedData?.name || guestName;
    const statusText = submittedData?.attendance === 'attending' ? 'SẼ THAM DỰ' : 'RẤT TIẾC KHÔNG THỂ THAM DỰ';
    const totalGuests = (submittedData?.adultsCount || 1) + (submittedData?.childrenCount || 0);
    return `[XÁC NHẬN THIỆP CƯỚI GRAND SAIGON]\nXin chào Cường & Trinh,\nKhách mời: ${name}\nTrạng thái: ${statusText}\nSố người tham dự: ${totalGuests} người\nLời chúc: ${submittedData?.wishes || 'Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!'}`;
  };

  const handleCopyZaloMessage = () => {
    const text = getZaloMessage();
    navigator.clipboard.writeText(text);
    setZaloCopied(true);
    setTimeout(() => setZaloCopied(false), 3000);
  };

  const handleOpenZalo = () => {
    handleCopyZaloMessage();
    window.open('https://chat.zalo.me/', '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    const name = submittedData?.name || guestName;
    const subject = encodeURIComponent(`[Xác Nhận Thiệp Cưới Grand Saigon] - ${name}`);
    const body = encodeURIComponent(getZaloMessage());
    window.location.href = `mailto:${NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
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

      {/* Background Architectural Dome Watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12 pointer-events-none opacity-[0.05] w-80 h-80">
        <img
          src={domeWatermarkImg}
          alt=""
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center shrink-0 pt-1 flex flex-col items-center">
        <div className="sketch-embossed mb-1">
          <WhiteLilyMotif variant="seal" size={42} tone="sepia" />
        </div>
        <span className="text-[10px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#6E4E24] font-bold text-embossed">
          THƯƠNG GỬI QUÝ QUAN KHÁCH &amp; BẠN BÈ
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide mt-0.5">
          Lời Cảm Ơn Chân Thành
        </h2>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Sparkles className="w-3 h-3 text-[#6E4E24]" />
          <p className="text-[11px] sm:text-xs text-[#382618] font-serif font-semibold">
            Gửi đến {submittedData?.name || guestName}
          </p>
          <Sparkles className="w-3 h-3 text-[#6E4E24]" />
        </div>
      </div>

      {/* Core Gratitude Content - Natural, warm, heartfelt message */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto space-y-2.5 sm:space-y-3 max-w-xl mx-auto w-full py-1">
        {/* Gratitude Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF7F2]/95 border border-[#B38E5A]/55 shadow-xs backdrop-blur-xs text-center card-embossed space-y-2.5"
        >
          {/* Couple Badge */}
          <div className="py-0.5 px-3 rounded-full bg-[#F5EFE6] border border-[#B38E5A]/40 inline-block mx-auto">
            <span className="text-[11px] sm:text-xs font-serif font-bold text-[#6E4E24] tracking-wider uppercase">
              LỜI SAU CÙNG
            </span>
          </div>

          <p className="text-sm sm:text-base font-serif italic text-[#1A130E] leading-relaxed font-semibold">
            "Ngày vui của hai đứa mình sẽ chỉ thật sự trọn vẹn và ý nghĩa khi có sự hiện diện, nụ cười cùng những lời chúc phúc ấm áp từ mọi người."
          </p>

          <div className="h-[1px] w-20 bg-[#B38E5A]/60 mx-auto" />

          <p className="text-xs sm:text-sm font-serif text-[#382618] leading-relaxed font-medium">
            Tụi mình xin gửi lời cảm ơn chân thành nhất đến bạn vì đã luôn yêu thương, đồng hành và dành thời gian quý báu đến chung vui trong ngày trọng đại này. Thương chúc bạn cùng gia đình thật nhiều sức khỏe, luôn ngập tràn niềm vui, bình an và hạnh phúc!
          </p>

          {/* Signatures */}
          <div className="pt-2 border-t border-[#B38E5A]/35 flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6E4E24] font-serif font-semibold">
              Thương mến,
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-sm sm:text-base font-serif font-bold text-[#1A130E]">
                {groomName}
              </span>
              <span className="text-sm font-serif text-[#6E4E24] font-bold italic">&amp;</span>
              <span className="text-sm sm:text-base font-serif font-bold text-[#1A130E]">
                {brideName}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-serif mt-0.5">
              Khách Sạn Grand Saigon
            </span>
          </div>
        </motion.div>

        {/* Quick Send Buttons (Zalo / Email) */}
        <div className="flex flex-row items-center justify-center gap-3 pt-1">
          <button
            onClick={handleOpenZalo}
            className="flex-1 max-w-[210px] py-2.5 px-3.5 rounded-xl bg-[#0068FF] text-white text-xs sm:text-sm font-serif font-bold hover:bg-[#0052cc] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{zaloCopied ? 'Đã sao chép & Mở Zalo' : 'Gửi qua Zalo'}</span>
          </button>

          <button
            onClick={handleOpenMailto}
            className="flex-1 max-w-[210px] py-2.5 px-3.5 rounded-xl bg-[#1A130E] text-white text-xs sm:text-sm font-serif font-bold hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#EADBB8] shrink-0" />
            <span className="truncate">Gửi qua Email</span>
          </button>
        </div>

        {/* Copy Note & Back to Cover */}
        <div className="flex items-center justify-between px-2 pt-1">
          <button
            onClick={handleCopyZaloMessage}
            className="text-xs text-[#4A3622] hover:text-[#1A130E] font-serif font-semibold inline-flex items-center gap-1.5"
          >
            {zaloCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{zaloCopied ? 'Đã sao chép lời nhắn' : 'Sao chép tin nhắn'}</span>
          </button>

          <button
            onClick={onRestart}
            className="text-xs text-[#6E4E24] hover:text-[#1A130E] font-serif font-bold inline-flex items-center gap-1.5 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xem lại thiệp cưới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
