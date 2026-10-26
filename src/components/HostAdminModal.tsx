import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RSVPRecord } from '../types';
import { X, Users, Download, Heart, Utensils, CheckCircle, Search, RefreshCw } from 'lucide-react';

interface HostAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostAdminModal: React.FC<HostAdminModalProps> = ({ isOpen, onClose }) => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterSide, setFilterSide] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/rsvp');
      const data = await res.json();
      if (data.records) {
        setRecords(data.records);
      }
    } catch (e) {
      console.warn('Could not fetch RSVP list from backend:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRecords();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const attendingRecords = records.filter(r => r.attendance === 'attending');
  const totalAdults = attendingRecords.reduce((sum, r) => sum + r.adultsCount, 0);
  const totalChildren = attendingRecords.reduce((sum, r) => sum + r.childrenCount, 0);
  const totalVegetarians = attendingRecords.filter(r => r.dietary.includes('chay')).length;

  const filtered = records.filter(r => {
    const matchesSide = filterSide === 'all' || r.side === filterSide;
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      (r.wishes && r.wishes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSide && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Họ Tên', 'Số Điện Thoại', 'Trạng Thái', 'Người Lớn', 'Trẻ Em', 'Phân Nhóm', 'Ẩm Thực', 'Lời Chúc', 'Thời Gian'];
    const rows = records.map(r => [
      `"${r.name}"`,
      `"${r.phone}"`,
      `"${r.attendance === 'attending' ? 'Tham dự' : 'Không tham dự'}"`,
      r.adultsCount,
      r.childrenCount,
      `"${r.side}"`,
      `"${r.dietary}"`,
      `"${(r.wishes || '').replace(/"/g, '""')}"`,
      `"${new Date(r.submittedAt).toLocaleString('vi-VN')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Danh-Sach-Khach-Moi-Grand-Saigon.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#FCFBF9] rounded-2xl border border-[#C5A880]/60 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8C714E] font-serif block">
              Bảng Điều Khiển Ban Tổ Chức
            </span>
            <h3 className="text-base sm:text-lg font-serif font-semibold text-[#1C1917]">
              Danh Sách Khách Mời &amp; Xếp Chỗ Tiệc Cưới
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRecords}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100"
              title="Làm mới"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292524] text-white text-xs font-serif hover:bg-black transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Xuất File Excel/CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-[#FAF8F5] border-b border-stone-200">
          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <span className="text-[10px] text-stone-500 font-serif block">Tổng Phản Hồi</span>
            <span className="text-lg font-serif font-bold text-[#1C1917] tabular-nums">
              {records.length} Phiếu
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <span className="text-[10px] text-stone-500 font-serif block">Người Lớn Xác Nhận</span>
            <span className="text-lg font-serif font-bold text-[#A38350] tabular-nums">
              {totalAdults} <span className="font-serif text-sm font-normal">Khách</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <span className="text-[10px] text-stone-500 font-serif block">Trẻ Em Đi Cùng</span>
            <span className="text-lg font-serif font-bold text-stone-700 tabular-nums">
              {totalChildren} <span className="font-serif text-sm font-normal">Bé</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <span className="text-[10px] text-stone-500 font-serif block">Khẩu Phần Ăn Chay</span>
            <span className="text-lg font-serif font-bold text-emerald-700 tabular-nums">
              {totalVegetarians} <span className="font-serif text-sm font-normal">Suất</span>
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 sm:p-4 border-b border-stone-200 flex flex-col sm:flex-row gap-2 items-center justify-between bg-white">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc SĐT..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#A38350]"
            />
          </div>

          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {[
              'all',
              'Bạn Chú Rể',
              'Bạn Cô Dâu',
              'Bạn bè của Phụ mẫu Chú Rể',
              'Bạn bè của Phụ mẫu Cô dâu',
              'Gia đình',
              'Đồng nghiệp & Đối tác',
            ].map(side => (
              <button
                key={side}
                onClick={() => setFilterSide(side)}
                className={`px-2.5 py-1 text-[11px] font-serif rounded-md transition-colors ${
                  filterSide === side
                    ? 'bg-[#A38350] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {side === 'all' ? 'Tất cả' : side}
              </button>
            ))}
          </div>
        </div>

        {/* Table list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs font-serif">
              Chưa có phản hồi nào phù hợp.
            </div>
          ) : (
            filtered.map(record => (
              <div
                key={record.id}
                className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1C1917]">
                      {record.name}
                    </h4>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs font-mono text-stone-600">{record.phone}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-serif ${
                        record.attendance === 'attending'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {record.attendance === 'attending' ? 'Tham dự' : 'Không tham dự'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600 font-serif mt-1">
                    <span>Nhóm: <strong className="text-stone-800">{record.side}</strong></span>
                    <span>·</span>
                    <span>Số lượng: <strong className="text-[#A38350]">{record.adultsCount} lớn, {record.childrenCount} bé</strong></span>
                    <span>·</span>
                    <span>Ẩm thực: <strong className="text-stone-800">{record.dietary}</strong></span>
                  </div>

                  {record.wishes && (
                    <p className="text-xs text-stone-600 font-serif italic mt-1 bg-stone-50 p-2 rounded-lg border border-stone-100">
                      "{record.wishes}"
                    </p>
                  )}
                </div>

                <div className="text-right text-[10px] text-stone-400 font-mono shrink-0">
                  {new Date(record.submittedAt).toLocaleString('vi-VN')}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
