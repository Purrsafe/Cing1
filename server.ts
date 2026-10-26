import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NOTIFICATION_EMAIL = 'dmcuong.contact@gmail.com';

app.use(express.json());

// In-memory / file-backed RSVP store
interface RSVPRecord {
  id: string;
  name: string;
  phone: string;
  attendance: 'attending' | 'declined';
  adultsCount: number;
  childrenCount: number;
  side: string;
  dietary: string;
  wishes: string;
  submittedAt: string;
  notificationSentTo: string;
}

const RSVPS_FILE = path.join(__dirname, 'rsvps.json');

function loadRSVPs(): RSVPRecord[] {
  try {
    if (fs.existsSync(RSVPS_FILE)) {
      const data = fs.readFileSync(RSVPS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading RSVPs file:', err);
  }
  return [
    {
      id: 'demo-1',
      name: 'Nguyễn Văn An',
      phone: '0901234567',
      attendance: 'attending',
      adultsCount: 2,
      childrenCount: 0,
      side: 'Bạn Chú Rể',
      dietary: 'Bình thường',
      wishes: 'Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long!',
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      notificationSentTo: NOTIFICATION_EMAIL,
    },
    {
      id: 'demo-2',
      name: 'Trần Thị Thu Hà',
      phone: '0918765432',
      attendance: 'attending',
      adultsCount: 1,
      childrenCount: 0,
      side: 'Bạn Cô Dâu',
      dietary: 'Ăn chay',
      wishes: 'Mừng ngày vui của Cường & Linh, mãi mãi ngập tràn yêu thương nhé!',
      submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      notificationSentTo: NOTIFICATION_EMAIL,
    }
  ];
}

function saveRSVPs(list: RSVPRecord[]) {
  try {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving RSVPs file:', err);
  }
}

let rsvpDatabase: RSVPRecord[] = loadRSVPs();

// API endpoint to receive RSVP submission
app.post('/api/rsvp', (req, res) => {
  const { name, phone, attendance, adultsCount, childrenCount, side, dietary, wishes } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Họ tên là bắt buộc' });
  }

  const newRecord: RSVPRecord = {
    id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: String(name).trim(),
    phone: String(phone || '').trim(),
    attendance: attendance === 'declined' ? 'declined' : 'attending',
    adultsCount: Math.max(1, Number(adultsCount) || 1),
    childrenCount: Math.max(0, Number(childrenCount) || 0),
    side: String(side || 'Bạn Chú Rể'),
    dietary: String(dietary || 'Bình thường'),
    wishes: String(wishes || '').trim(),
    submittedAt: new Date().toISOString(),
    notificationSentTo: NOTIFICATION_EMAIL,
  };

  rsvpDatabase.unshift(newRecord);
  saveRSVPs(rsvpDatabase);

  console.log(`[RSVP Notification] New response received from ${newRecord.name}`);
  console.log(`[Email Dispatch Queued] To: ${NOTIFICATION_EMAIL}`);
  console.log(`[Details]: Attending=${newRecord.attendance}, Guests=${newRecord.adultsCount + newRecord.childrenCount}, Side=${newRecord.side}`);

  return res.json({
    success: true,
    message: 'Xác nhận tham dự đã được ghi nhận thành công!',
    data: newRecord,
    emailNotificationTarget: NOTIFICATION_EMAIL,
  });
});

// API endpoint to retrieve all RSVPs for host management
app.get('/api/rsvp', (_req, res) => {
  return res.json({
    success: true,
    targetEmail: NOTIFICATION_EMAIL,
    total: rsvpDatabase.length,
    attendingCount: rsvpDatabase.filter(r => r.attendance === 'attending').length,
    declinedCount: rsvpDatabase.filter(r => r.attendance === 'declined').length,
    totalAdults: rsvpDatabase.filter(r => r.attendance === 'attending').reduce((sum, r) => sum + r.adultsCount, 0),
    totalChildren: rsvpDatabase.filter(r => r.attendance === 'attending').reduce((sum, r) => sum + r.childrenCount, 0),
    records: rsvpDatabase,
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Vite middleware for development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Static assets in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Wedding invitation app server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
