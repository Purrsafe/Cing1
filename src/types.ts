export interface RSVPFormData {
  name: string;
  phone: string;
  attendance: 'attending' | 'declined';
  adultsCount: number;
  childrenCount: number;
  side:
    | 'Bạn Chú Rể'
    | 'Bạn Cô Dâu'
    | 'Bạn bè của Phụ mẫu Chú Rể'
    | 'Bạn bè của Phụ mẫu Cô dâu'
    | 'Gia đình'
    | 'Đồng nghiệp & Đối tác';
  dietary: 'Bình thường' | 'Ăn chay' | 'Dị ứng hải sản/khác';
  wishes: string;
}

export interface RSVPRecord extends RSVPFormData {
  id: string;
  submittedAt: string;
  notificationSentTo: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag: string;
}

export interface SeatingTable {
  id: number;
  name: string;
  category: 'VIP' | 'Nhà Trai' | 'Nhà Gái' | 'Bạn Chú Rể' | 'Bạn Cô Dâu' | 'Đồng Nghiệp';
  capacity: number;
  guests: string[];
  description: string;
  floorZone: 'Gần sân khấu' | 'Trung tâm sảnh' | 'Cánh trái' | 'Cánh phải' | 'Khu vực VIP';
}
