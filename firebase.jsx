// Saku — Firebase config + DB helpers
//
// LANGKAH SETUP:
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru (gratis)
// 3. Di project, klik "Web app" (</>)
// 4. Copy konfigurasi dan paste ke FIREBASE_CONFIG di bawah
// 5. Di Firebase Console → Firestore Database → Create database → Start in test mode
//
// Ganti semua nilai "GANTI_..." dengan nilai asli dari Firebase Console kamu:

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyCFfCqEL6xYP4zDpKZwvBlpmAPsyjIRYMI",
  authDomain:        "saku-budget-40c7d.firebaseapp.com",
  projectId:         "saku-budget-40c7d",
  storageBucket:     "saku-budget-40c7d.firebasestorage.app",
  messagingSenderId: "G442721196164",
  appId:             "1:442721196164:web:9508d01bd1c6b95549cad1",
  measurementId:     "G-H9SDQNY4N7",
};

const _isCfg = !FIREBASE_CONFIG.apiKey.includes('GANTI');

let DB;

if (_isCfg) {
  firebase.initializeApp(FIREBASE_CONFIG);
  const _db = firebase.firestore();
  const _ref = _db.collection('saku').doc('data');

  DB = {
    load:  ()        => _ref.get().then(s => s.exists ? s.data() : null),
    save:  (data)    => _ref.set(data),
    patch: (updates) => _ref.set(updates, { merge: true }),
  };
} else {
  DB = { load: () => Promise.resolve(null), save: () => Promise.resolve(), patch: () => Promise.resolve() };
}

Object.assign(window, { DB, FIREBASE_CONFIGURED: _isCfg });
