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
  apiKey:            "GANTI_DENGAN_API_KEY",
  authDomain:        "GANTI_DENGAN_PROJECT_ID.firebaseapp.com",
  projectId:         "GANTI_DENGAN_PROJECT_ID",
  storageBucket:     "GANTI_DENGAN_PROJECT_ID.appspot.com",
  messagingSenderId: "GANTI_DENGAN_MESSAGING_SENDER_ID",
  appId:             "GANTI_DENGAN_APP_ID",
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
