// Saku — formatters, constants, seed data, DataCtx

// ─── Currency formatting ─────────────────────────────────────
const fmtIDR = (n, opts = {}) => {
  const { sign = false, compact = false, hide = false } = opts;
  if (hide) return 'Rp ••••••';
  const abs = Math.abs(n);
  if (compact && abs >= 1_000_000) {
    const v = (abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1).replace('.', ',').replace(',0', '');
    return (n < 0 ? '−' : (sign && n > 0 ? '+' : '')) + 'Rp ' + v + 'jt';
  }
  if (compact && abs >= 1_000) {
    return (n < 0 ? '−' : (sign && n > 0 ? '+' : '')) + 'Rp ' + Math.round(abs / 1_000) + 'rb';
  }
  const formatted = abs.toLocaleString('id-ID');
  return (n < 0 ? '−' : (sign && n > 0 ? '+' : '')) + 'Rp ' + formatted;
};

const fmtDate = (d, mode = 'short') => {
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const date = new Date(d);
  if (mode === 'short') return `${date.getDate()} ${months[date.getMonth()]}`;
  if (mode === 'full') return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  if (mode === 'time') return date.toTimeString().slice(0, 5);
  return date.toString();
};

const dayDiff = (target) => {
  const t = new Date(target).setHours(0, 0, 0, 0);
  const n = new Date().setHours(0, 0, 0, 0);
  return Math.round((t - n) / 86400000);
};

// ─── Color tokens ────────────────────────────────────────────
const C = {
  bg: '#F4F1EA',
  bgWarm: '#FAF7F0',
  card: '#FFFFFF',
  ink: '#1A1625',
  inkSoft: '#6B6478',
  inkFaint: '#A8A2B5',
  line: '#EDE8DD',
  lineSoft: '#F2EDE2',

  primary: '#7C5CFC',
  primaryDeep: '#5938E0',
  primarySoft: '#EFE9FF',
  primaryInk: '#2D1A8C',

  lime: '#C5F74F',
  limeDeep: '#9BCB29',
  limeSoft: '#F1FBD8',
  limeInk: '#3F5908',

  coral: '#FF6B6B',
  coralDeep: '#E74545',
  coralSoft: '#FFE6E3',
  coralInk: '#7A1A1A',

  sky: '#5BC0FF',
  skySoft: '#DDF1FF',
  skyInk: '#0B4D7A',

  amber: '#FFB347',
  amberSoft: '#FFEDD3',
  amberInk: '#7A4A07',

  mint: '#7CE3C0',
  mintSoft: '#DFF7EE',
  mintInk: '#0F5A45',

  pink: '#FF7BAC',
  pinkSoft: '#FFE0EC',
  pinkInk: '#7A1F4A',
};

// ─── Categories (static, tidak disimpan di Firestore) ────────
const CATEGORIES = [
  { id: 'makan',    name: 'Makan & Minum',  icon: '🍜', color: C.coral,  soft: C.coralSoft  },
  { id: 'transport',name: 'Transport',       icon: '🛵', color: C.sky,    soft: C.skySoft    },
  { id: 'belanja',  name: 'Belanja',         icon: '🛍️', color: C.pink,   soft: C.pinkSoft   },
  { id: 'tagihan',  name: 'Tagihan',         icon: '🧾', color: C.amber,  soft: C.amberSoft  },
  { id: 'sewa',     name: 'Sewa Kost',       icon: '🏠', color: C.primary,soft: C.primarySoft},
  { id: 'sub',      name: 'Subscription',    icon: '🔁', color: '#9747FF',soft: '#EEE2FF'    },
  { id: 'hiburan',  name: 'Hiburan',         icon: '🎬', color: '#FF8A4C',soft: '#FFE7D6'    },
  { id: 'sehat',    name: 'Kesehatan',       icon: '💊', color: C.mint,   soft: C.mintSoft   },
  { id: 'olahraga', name: 'Olahraga',        icon: '🏋️', color: C.lime,   soft: C.limeSoft   },
  { id: 'invest',   name: 'Investasi',       icon: '📈', color: C.limeDeep,soft: C.limeSoft  },
  { id: 'gaji',     name: 'Gaji',            icon: '💼', color: C.limeDeep,soft: C.limeSoft  },
  { id: 'freelance',name: 'Freelance',       icon: '💎', color: '#22C55E',soft: '#DCFCE7'    },
  { id: 'lainnya',  name: 'Lainnya',         icon: '✨', color: C.inkSoft,soft: '#EEEAE0'    },
];

const catById = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

// ─── Seed data (dipakai saat pertama kali buka app) ──────────
const SEED_ACCOUNTS = [
  { id: 'bca',     name: 'BCA',          type: 'Bank',     balance: 12450000, color: '#0E5CB6', emoji: '🏦', last4: '4827' },
  { id: 'jenius',  name: 'Jenius',       type: 'Bank',     balance:  4280000, color: '#00B7D4', emoji: '💳', last4: '1192' },
  { id: 'mandiri', name: 'Mandiri',      type: 'Bank',     balance:  2150000, color: '#FFD43B', emoji: '🏛️', last4: '9302' },
  { id: 'gopay',   name: 'GoPay',        type: 'E-wallet', balance:   320000, color: '#00AA13', emoji: '🟢' },
  { id: 'ovo',     name: 'OVO',          type: 'E-wallet', balance:   175000, color: '#4C2A86', emoji: '🟣' },
  { id: 'cash',    name: 'Cash',         type: 'Tunai',    balance:   180000, color: '#6B6478', emoji: '💵' },
];

const SEED_BUDGETS = [
  { id: 'b1', cat: 'makan',     limit: 2500000, spent: 1820000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b2', cat: 'transport', limit:  800000, spent:  340000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b3', cat: 'belanja',   limit: 1200000, spent: 1050000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b4', cat: 'hiburan',   limit:  500000, spent:  580000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b5', cat: 'sub',       limit:  450000, spent:  379000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b6', cat: 'sehat',     limit:  300000, spent:   45000, period: 'Bulanan', resetAt: '2026-06-01' },
  { id: 'b7', cat: 'olahraga',  limit:  250000, spent:  120000, period: 'Mingguan', resetAt: '2026-05-17' },
  { id: 'b8', cat: 'invest',    limit: 2000000, spent: 2000000, period: 'Bulanan', resetAt: '2026-06-01' },
];

const SEED_TX = [
  { id: 't01', date: '2026-05-10', time: '08:42', cat: 'makan',     account: 'gopay',  amount: -28000,  note: 'Kopi Tuku — Es Kopi Susu Tetangga', via: 'wa' },
  { id: 't02', date: '2026-05-10', time: '08:15', cat: 'transport', account: 'gopay',  amount: -22000,  note: 'Gojek ke kantor', via: 'wa' },
  { id: 't03', date: '2026-05-09', time: '21:30', cat: 'makan',     account: 'jenius', amount: -85000,  note: 'Dinner — Mie Gacoan', via: 'app' },
  { id: 't04', date: '2026-05-09', time: '14:00', cat: 'belanja',   account: 'bca',    amount: -245000, note: 'Indomaret weekly', via: 'app' },
  { id: 't05', date: '2026-05-09', time: '12:10', cat: 'makan',     account: 'cash',   amount: -35000,  note: 'Nasi padang', via: 'wa' },
  { id: 't06', date: '2026-05-08', time: '20:45', cat: 'sub',       account: 'bca',    amount: -54000,  note: 'Spotify Premium', via: 'auto' },
  { id: 't07', date: '2026-05-08', time: '09:00', cat: 'transport', account: 'gopay',  amount: -18000,  note: 'Gojek pulang', via: 'wa' },
  { id: 't08', date: '2026-05-07', time: '19:00', cat: 'hiburan',   account: 'jenius', amount: -120000, note: 'Bioskop XXI', via: 'app' },
  { id: 't09', date: '2026-05-07', time: '13:20', cat: 'makan',     account: 'gopay',  amount: -42000,  note: 'GoFood — Ayam geprek', via: 'wa' },
  { id: 't10', date: '2026-05-06', time: '10:00', cat: 'olahraga',  account: 'bca',    amount: -120000, note: 'Yoga class', via: 'app' },
  { id: 't11', date: '2026-05-05', time: '07:30', cat: 'makan',     account: 'gopay',  amount: -25000,  note: 'Kopi Janji Jiwa', via: 'wa' },
  { id: 't12', date: '2026-05-04', time: '15:00', cat: 'belanja',   account: 'bca',    amount: -380000, note: 'Uniqlo — kaos basic', via: 'app' },
  { id: 't13', date: '2026-05-03', time: '11:00', cat: 'sub',       account: 'bca',    amount: -169000, note: 'Netflix', via: 'auto' },
  { id: 't14', date: '2026-05-02', time: '09:30', cat: 'invest',    account: 'jenius', amount: -2000000,note: 'Reksadana Bibit', via: 'app' },
  { id: 't15', date: '2026-05-01', time: '08:00', cat: 'gaji',      account: 'bca',    amount: 15500000, note: 'Gaji Mei 2026', via: 'auto' },
  { id: 't16', date: '2026-05-01', time: '08:01', cat: 'sewa',      account: 'bca',    amount: -2800000, note: 'Sewa kost bulan Mei', via: 'app' },
  { id: 't17', date: '2026-05-01', time: '12:00', cat: 'tagihan',   account: 'bca',    amount: -480000, note: 'Listrik PLN', via: 'auto' },
  { id: 't18', date: '2026-05-01', time: '12:05', cat: 'tagihan',   account: 'bca',    amount: -350000, note: 'Internet IndiHome', via: 'auto' },
  { id: 't19', date: '2026-04-28', time: '16:00', cat: 'freelance', account: 'jenius', amount: 3500000, note: 'Project landing page', via: 'app' },
];

const SEED_DEBTS = [
  { id: 'd1', kind: 'piutang', who: 'Bagus',     amount: 850000, note: 'Patungan Bali trip', dueDate: '2026-05-15', createdAt: '2026-04-20', avatar: 'B', color: C.sky },
  { id: 'd2', kind: 'piutang', who: 'Sarah',     amount: 250000, note: 'Talangin makan tim',  dueDate: '2026-05-12', createdAt: '2026-05-05', avatar: 'S', color: C.pink },
  { id: 'd3', kind: 'utang',   who: 'Rama',      amount: 1200000,note: 'Pinjaman bensin mobil', dueDate: '2026-05-25', createdAt: '2026-04-25', avatar: 'R', color: C.amber },
  { id: 'd4', kind: 'piutang', who: 'Diana',     amount: 75000,  note: 'Kopi pagi',           dueDate: '2026-05-09', createdAt: '2026-05-02', avatar: 'D', color: C.coral, overdue: true },
  { id: 'd5', kind: 'utang',   who: 'Tante Lin', amount: 500000, note: 'Belum bayar arisan', dueDate: '2026-06-01', createdAt: '2026-05-01', avatar: 'TL', color: C.primary },
];

const SEED_NOTIFS = [
  { id: 'n1', type: 'budget',  level: 'alert',   title: 'Budget Belanja hampir habis',     body: 'Sudah 87% terpakai. Sisa Rp 150.000 untuk 21 hari.', time: '10 menit lalu', read: false },
  { id: 'n2', type: 'budget',  level: 'over',    title: 'Budget Hiburan terlewat',         body: 'Lewat Rp 80.000 dari batas Rp 500.000.', time: '2 jam lalu', read: false },
  { id: 'n3', type: 'debt',    level: 'warning', title: 'Diana telat bayar',                body: 'Piutang Rp 75.000 sudah lewat tenggat 1 hari.', time: '5 jam lalu', read: false },
  { id: 'n4', type: 'wa',      level: 'info',    title: 'Transaksi via WA tercatat',        body: '"Kopi Tuku 28rb" → Makan & Minum', time: 'Hari ini, 08:42', read: true },
  { id: 'n5', type: 'bill',    level: 'info',    title: 'Tagihan Internet jatuh tempo',     body: 'IndiHome Rp 350.000 — bayar otomatis 15 Mei.', time: 'Kemarin', read: true },
  { id: 'n6', type: 'achievement', level: 'good', title: 'Streak hemat 5 hari! 🔥',         body: 'Pengeluaran Makan di bawah rata-rata 5 hari berturut-turut.', time: 'Kemarin', read: true },
  { id: 'n7', type: 'debt',    level: 'info',    title: 'Bagus akan jatuh tempo',           body: 'Piutang Rp 850.000 tenggat dalam 5 hari.', time: '2 hari lalu', read: true },
];

const SEED_WA_LOG = [
  { id: 'w1', time: '08:42', input: 'kopi tuku 28rb pake gopay',          parsed: { amount: -28000, cat: 'makan',     account: 'gopay' },  ok: true },
  { id: 'w2', time: '08:15', input: 'gojek 22rb',                          parsed: { amount: -22000, cat: 'transport', account: 'gopay' },  ok: true },
  { id: 'w3', time: 'Kemarin 12:10', input: 'nasi padang 35rb cash',      parsed: { amount: -35000, cat: 'makan',     account: 'cash' },   ok: true },
  { id: 'w4', time: 'Kemarin 09:00', input: 'gojek pulang 18rb',           parsed: { amount: -18000, cat: 'transport', account: 'gopay' },  ok: true },
  { id: 'w5', time: '2 hari lalu',   input: 'beli sesuatu 50rb',           parsed: null, ok: false, error: 'Kategori belum jelas — balas dengan kategori-nya.' },
];

// ─── Utility ─────────────────────────────────────────────────
const groupTx = (list) => {
  const groups = {};
  list.forEach(t => {
    const dd = dayDiff(t.date);
    let label = fmtDate(t.date, 'full');
    if (dd === 0) label = 'Hari ini, ' + fmtDate(t.date, 'full').split(', ')[1];
    else if (dd === -1) label = 'Kemarin, ' + fmtDate(t.date, 'full').split(', ')[1];
    if (!groups[label]) groups[label] = [];
    groups[label].push(t);
  });
  return Object.entries(groups);
};

// ─── React Context (dibaca oleh semua screen) ─────────────────
const DataCtx = React.createContext(null);

Object.assign(window, {
  fmtIDR, fmtDate, dayDiff,
  C, CATEGORIES, catById,
  SEED_TX, SEED_ACCOUNTS, SEED_BUDGETS, SEED_DEBTS, SEED_NOTIFS, SEED_WA_LOG,
  groupTx, DataCtx,
});
