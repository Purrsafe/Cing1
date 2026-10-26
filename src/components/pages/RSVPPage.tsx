import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WhiteLilyMotif } from '../WhiteLilyMotif';
import { RSVPFormData, RSVPRecord } from '../../types';
import { Send, Heart, ShieldAlert } from 'lucide-react';
import domeWatermarkImg from '../../assets/image_5cc2c043.png';

const NOTIFICATION_EMAIL = 'dmcuong.contact@gmail.com';

interface RSVPPageProps {
  onRSVPSubmitted?: (data: RSVPRecord) => void;
  onNext?: () => void;
  onOpenAdmin?: () => void;
}

export const RSVPPage: React.FC<RSVPPageProps> = ({ onRSVPSubmitted, onNext }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    phone: '',
    attendance: 'attending',
    adultsCount: 1,
    childrenCount: 0,
    side: 'Bạn Chú Rể',
    dietary: 'Bình thường',
    wishes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại để thuận tiện liên hệ.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    let record: RSVPRecord;
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success && result.data) {
        record = result.data;
      } else {
        record = {
          ...formData,
          id: 'local-' + Date.now(),
          submittedAt: new Date().toISOString(),
          notificationSentTo: NOTIFICATION_EMAIL,
        };
      }
    } catch {
      record = {
        ...formData,
        id: 'local-' + Date.now(),
        submittedAt: new Date().toISOString(),
        notificationSentTo: NOTIFICATION_EMAIL,
      };
    } finally {
      setIsSubmitting(false);
      if (onRSVPSubmitted) onRSVPSubmitted(record!);
      if (onNext) onNext();
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

      {/* Background Architectural Dome Watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 pointer-events-none opacity-[0.05] w-96 h-96">
        <img
          src={domeWatermarkImg}
          alt=""
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center shrink-0 pt-1 flex flex-col items-center">
        <div className="sketch-embossed mb-1">
          <WhiteLilyMotif variant="seal" size={44} tone="sepia" />
        </div>
        <span className="text-[10px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#4A3622] font-semibold text-embossed">
          XÁC NHẬN THAM DỰ
        </span>
        <h2 className="text-xl sm:text-3xl font-serif text-[#1A130E] font-bold text-embossed-title tracking-wide mt-0.5">
          Phiếu Xác Nhận Tham Dự
        </h2>
        <p className="text-[11px] sm:text-xs text-[#382618] font-serif font-medium mt-0.5">
          Hotel Grand Saigon · Thứ Bảy, 18 Tháng 9 Năm 2027
        </p>
      </div>

      {/* Content Form - Optimized to fit 100% on mobile without scroll */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto max-w-xl mx-auto w-full py-1">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF7F2]/95 border border-[#B38E5A]/50 shadow-xs backdrop-blur-xs card-embossed">
          {errorMsg && (
            <div className="mb-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-serif flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Name & Phone in 2-column on mobile */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-serif text-[#1A130E] font-bold mb-0.5">
                  Họ &amp; Tên <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vd: Nguyễn Văn A"
                  className="w-full px-2.5 py-1.5 text-xs font-serif rounded-lg border border-[#B38E5A]/50 bg-white focus:outline-none focus:border-[#6E4E24] shadow-2xs text-[#1A130E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif text-[#1A130E] font-bold mb-0.5">
                  Số Điện Thoại <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Vd: 0912 345 678"
                  className="w-full px-2.5 py-1.5 text-xs font-serif rounded-lg border border-[#B38E5A]/50 bg-white focus:outline-none focus:border-[#6E4E24] shadow-2xs text-[#1A130E]"
                />
              </div>
            </div>

            {/* Attendance selection */}
            <div>
              <label className="block text-[11px] font-serif text-[#1A130E] font-bold mb-1">
                Quý khách có thể tham dự chung vui cùng chúng tôi không?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] sm:text-xs font-serif flex items-center justify-center gap-1.5 transition-all ${
                    formData.attendance === 'attending'
                      ? 'bg-[#1A130E] border-[#1A130E] text-white shadow-xs font-bold'
                      : 'bg-white border-[#B38E5A]/50 text-[#2B1D12] hover:bg-stone-50 font-semibold'
                  }`}
                >
                  <Heart className="w-3 h-3 text-rose-400" />
                  <span>Chắc chắn tham dự</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] sm:text-xs font-serif flex items-center justify-center gap-1.5 transition-all ${
                    formData.attendance === 'declined'
                      ? 'bg-stone-800 border-stone-900 text-white shadow-xs font-bold'
                      : 'bg-white border-[#B38E5A]/50 text-[#2B1D12] hover:bg-stone-50 font-semibold'
                  }`}
                >
                  <span>Rất tiếc không thể đến</span>
                </button>
              </div>
            </div>

            {/* If attending: Guest details with all requested side options */}
            {formData.attendance === 'attending' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-0.5"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-serif text-[#1A130E] font-bold mb-0.5">
                      Quý Khách là Khách Của
                    </label>
                    <select
                      value={formData.side}
                      onChange={e => setFormData({ ...formData, side: e.target.value as RSVPFormData['side'] })}
                      className="w-full px-2 py-1.5 text-[11px] font-serif rounded-lg border border-[#B38E5A]/50 bg-white focus:outline-none focus:border-[#6E4E24] shadow-2xs text-[#1A130E]"
                    >
                      <option value="Bạn Chú Rể">Bạn bè Chú Rể (Cường)</option>
                      <option value="Bạn Cô Dâu">Bạn bè Cô Dâu (Trinh)</option>
                      <option value="Bạn bè của Phụ mẫu Chú Rể">Bạn bè của Phụ mẫu Chú Rể</option>
                      <option value="Bạn bè của Phụ mẫu Cô dâu">Bạn bè của Phụ mẫu Cô dâu</option>
                      <option value="Gia đình">Gia đình &amp; Họ hàng</option>
                      <option value="Đồng nghiệp & Đối tác">Đồng nghiệp &amp; Đối tác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif text-[#1A130E] font-bold mb-0.5">
                      Khẩu Phần Ẩm Thực
                    </label>
                    <select
                      value={formData.dietary}
                      onChange={e => setFormData({ ...formData, dietary: e.target.value as RSVPFormData['dietary'] })}
                      className="w-full px-2 py-1.5 text-[11px] font-serif rounded-lg border border-[#B38E5A]/50 bg-white focus:outline-none focus:border-[#6E4E24] shadow-2xs text-[#1A130E]"
                    >
                      <option value="Bình thường">Bình thường (Âu - Á)</option>
                      <option value="Ăn chay">Ăn chay</option>
                      <option value="Dị ứng hải sản/khác">Chế độ kiêng / Dị ứng</option>
                    </select>
                  </div>
                </div>

                {/* Headcount breakdown */}
                <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-white border border-[#B38E5A]/35">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-serif text-[#1A130E] font-semibold">Người Lớn:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, adultsCount: Math.max(1, prev.adultsCount - 1) }))}
                        className="w-6 h-6 rounded border border-stone-300 bg-stone-50 text-xs font-bold hover:bg-stone-100 active:scale-95 text-[#1A130E]"
                      >
                        -
                      </button>
                      <span className="text-xs font-serif font-bold text-[#1A130E] w-4 text-center tabular-nums">
                        {formData.adultsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, adultsCount: prev.adultsCount + 1 }))}
                        className="w-6 h-6 rounded border border-stone-300 bg-stone-50 text-xs font-bold hover:bg-stone-100 active:scale-95 text-[#1A130E]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-serif text-[#1A130E] font-semibold">Trẻ Em:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, childrenCount: Math.max(0, prev.childrenCount - 1) }))}
                        className="w-6 h-6 rounded border border-stone-300 bg-stone-50 text-xs font-bold hover:bg-stone-100 active:scale-95 text-[#1A130E]"
                      >
                        -
                      </button>
                      <span className="text-xs font-serif font-bold text-[#1A130E] w-4 text-center tabular-nums">
                        {formData.childrenCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, childrenCount: prev.childrenCount + 1 }))}
                        className="w-6 h-6 rounded border border-stone-300 bg-stone-50 text-xs font-bold hover:bg-stone-100 active:scale-95 text-[#1A130E]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Expanded Wishes textarea */}
            <div>
              <label className="block text-xs font-serif text-[#1A130E] font-bold mb-1">
                Lời Chúc Gửi Đến Cô Dâu &amp; Chú Rể
              </label>
              <textarea
                rows={3}
                value={formData.wishes}
                onChange={e => setFormData({ ...formData, wishes: e.target.value })}
                placeholder="Gửi lời chúc phúc tốt đẹp, trăm năm hòa hợp đến Minh Cường & Diễm Trinh..."
                className="w-full px-3 py-2 text-xs sm:text-sm font-serif rounded-xl border border-[#B38E5A]/50 bg-white focus:outline-none focus:border-[#6E4E24] shadow-2xs text-[#1A130E] min-h-[70px] sm:min-h-[85px] resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#2E1F14] via-[#4A3622] to-[#2E1F14] text-white text-xs sm:text-sm font-serif uppercase tracking-widest font-bold hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-1.5"
            >
              <Send className="w-4 h-4 text-[#EADBB8]" />
              <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Xác Nhận Tham Dự'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
