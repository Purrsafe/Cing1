import React, { useState, useEffect } from 'react';
import { PageFlipContainer } from './components/PageFlipContainer';
import { AudioPlayer } from './components/AudioPlayer';
import { CoverPage } from './components/pages/CoverPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { BanquetInfoPage } from './components/pages/BanquetInfoPage';
import { DressCodeAndParkingPage } from './components/pages/DressCodeAndParkingPage';
import { MapAndSeatingPage } from './components/pages/MapAndSeatingPage';
import { RSVPPage } from './components/pages/RSVPPage';
import { ThankYouPage } from './components/pages/ThankYouPage';
import { HostAdminModal } from './components/HostAdminModal';
import { RSVPRecord } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('Quý Khách & Gia Đình');
  const [groomName, setGroomName] = useState<string>('Dung Minh Cường');
  const [brideName, setBrideName] = useState<string>('Phạm Thị Diễm Trinh');
  const [submittedRecord, setSubmittedRecord] = useState<RSVPRecord | null>(null);

  // Check URL query parameters for personalized guest name
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to') || params.get('guest') || params.get('kinhmoi');
      if (toParam) {
        setGuestName(decodeURIComponent(toParam));
      }
      const gParam = params.get('groom');
      if (gParam) setGroomName(decodeURIComponent(gParam));
      const bParam = params.get('bride');
      if (bParam) setBrideName(decodeURIComponent(bParam));
      if (params.get('admin') === 'true' || params.get('quanly') === 'true') {
        setIsAdminOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const pageTitles = [
    'Bìa Khởi Đầu',
    'Khoảnh Khắc Chung Đôi',
    'Chương Trình Hôn Lễ',
    'Tiện Ích & Đón Tiếp',
    'Bản Đồ Đến Khách Sạn',
    'Xác Nhận Tham Dự',
    'Lời Cảm Ơn Trân Trọng',
  ];

  const handleNextPage = () => {
    if (currentPage < pageTitles.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleRSVPSubmitted = (record: RSVPRecord) => {
    setSubmittedRecord(record);
    // Auto navigate to Thank You page (Page 7, index 6)
    setCurrentPage(6);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#FAF8F5] text-[#292524] select-none font-sans overflow-hidden">
      {/* Background Classical Audio Player with Canon in D */}
      <AudioPlayer />

      {/* Main Short-Edge Vertical Book Flip Container */}
      <PageFlipContainer
        pageTitles={pageTitles}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        {/* Trang 1: Bìa Khởi Đầu */}
        <CoverPage
          onNext={handleNextPage}
          guestName={guestName}
          groomName={groomName}
          brideName={brideName}
        />

        {/* Trang 2: Khoảnh khắc chung đôi của hai CHÚNG MÌNH */}
        <GalleryPage onNext={handleNextPage} />

        {/* Trang 3: Thông tin buổi tiệc & Lịch trình */}
        <BanquetInfoPage onNext={handleNextPage} />

        {/* Trang 4: Trang phục (Dress Code) & Bãi đỗ xe */}
        <DressCodeAndParkingPage onNext={handleNextPage} />

        {/* Trang 5: Bản đồ đến khách sạn Grand Saigon */}
        <MapAndSeatingPage onNext={handleNextPage} />

        {/* Trang 6: Phiếu xác nhận tham dự */}
        <RSVPPage
          onRSVPSubmitted={handleRSVPSubmitted}
          onNext={() => setCurrentPage(6)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Trang 7: Lời Cảm Ơn Trân Trọng */}
        <ThankYouPage
          onRestart={() => setCurrentPage(0)}
          guestName={guestName}
          groomName={groomName}
          brideName={brideName}
          submittedData={submittedRecord}
        />
      </PageFlipContainer>

      {/* Host Organizer Modal */}
      <HostAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
