# Langkah Selanjutnya — Setelah Setup Firebase

> Firebase sudah terkonfigurasi. Sekarang tinggal **push ke GitHub** dan **aktifkan GitHub Pages**.

---

## Status Saat Ini

| Item | Status |
|---|---|
| Firebase config di `firebase.jsx` | ✅ Sudah diisi |
| File `index.html` | ✅ Sudah ada |
| Git repository | ✅ Sudah ada |
| Remote GitHub (`origin`) | ✅ Sudah terhubung |
| File terbaru di-push ke GitHub | ⏳ **Belum** — `firebase.jsx` ada perubahan yang belum di-push |
| GitHub Pages aktif | ⏳ **Belum diaktifkan** |

---

## Langkah 1 — Push Perubahan Firebase ke GitHub

Buka PowerShell, jalankan perintah ini **satu per satu**:

```powershell
cd "D:\NEW PROJECT 2026\Uang-Saku"
```

```powershell
git add firebase.jsx
```

```powershell
git commit -m "config: isi Firebase config dengan project nyata"
```

```powershell
git push
```

Jika diminta login GitHub, ikuti prosesnya di browser yang terbuka.

---

## Langkah 2 — Aktifkan GitHub Pages

1. Buka browser, pergi ke repository GitHub kamu
2. Klik tab **Settings** (di bagian atas halaman repo)
3. Di menu kiri, scroll ke bawah → klik **Pages**
4. Di bagian **"Build and deployment"**:
   - **Source**: pilih `Deploy from a branch`
   - **Branch**: pilih `main`
   - **Folder**: pilih `/ (root)`
5. Klik **Save**
6. Tunggu **1–2 menit**

URL aplikasimu akan muncul di halaman itu, format:
```
https://usernamekamu.github.io/nama-repo/
```

---

## Langkah 3 — Aktifkan Firestore di Firebase Console

Pastikan Firestore sudah dibuat. Jika belum:

1. Buka [https://console.firebase.google.com](https://console.firebase.google.com)
2. Pilih project `saku-budget-40c7d`
3. Klik **Build** → **Firestore Database**
4. Klik **Create database**
5. Pilih **Start in test mode**
6. Pilih region `asia-southeast1 (Singapore)` → klik **Enable**

Jika Firestore sudah ada (kamu bisa lihat menu Firestore di sidebar), lewati langkah ini.

---

## Langkah 4 — Test Aplikasi

Setelah GitHub Pages aktif, buka URL aplikasimu di browser.

Cek hal-hal berikut:

**Tes 1 — Aplikasi terbuka**
- Tampilan iPhone/mobile frame muncul
- Tidak ada error merah di layar

**Tes 2 — Data tersimpan ke cloud**
- Tambah transaksi baru (klik tombol + atau tambah pengeluaran)
- Isi nominal dan kategori
- Simpan
- Buka Firebase Console → Firestore Database → kamu akan lihat data masuk di collection `saku`

**Tes 3 — Data tetap ada setelah refresh**
- Refresh halaman browser (`F5`)
- Data yang tadi ditambah masih ada → berarti Firebase berjalan dengan benar

---

## Jika Ada Masalah

### Aplikasi terbuka tapi data tidak tersimpan

Buka DevTools browser (`F12`) → tab **Console**. Jika ada error seperti:
- `FirebaseError: Missing or insufficient permissions` → rules Firestore belum aktif, ulangi Langkah 3
- `Failed to fetch` atau CORS error → cek konfigurasi di `firebase.jsx` sudah benar

### Halaman GitHub Pages tampilkan 404

- Pastikan nama file utama adalah `index.html` (huruf kecil semua)
- Tunggu 2–3 menit lagi, GitHub Pages butuh waktu build
- Cek di Settings → Pages apakah ada tanda hijau "Your site is live at..."

### Data tidak muncul saat pertama buka

Normal — saat pertama buka, data seed (contoh) akan otomatis di-load ke Firestore. Tunggu beberapa detik.

---

## Penting: Firestore Test Mode Kadaluarsa 30 Hari

Firestore "test mode" akan **kadaluarsa setelah 30 hari** — setelah itu data tidak bisa dibaca/ditulis.

Sebelum 30 hari, update Firestore Rules:

1. Firebase Console → Firestore Database → tab **Rules**
2. Ganti seluruh isinya dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /saku/{document} {
      allow read, write: if true;
    }
  }
}
```

3. Klik **Publish**

> Catatan: Rules `if true` berarti siapa saja bisa baca/tulis — aman untuk pemakaian pribadi karena hanya kamu yang tahu URL-nya. Bukan untuk aplikasi publik dengan data sensitif.

---

## Ringkasan Perintah Git

```powershell
# Sekarang (push config Firebase):
git add firebase.jsx
git commit -m "config: isi Firebase config"
git push

# Di masa depan (setiap ada perubahan):
git add .
git commit -m "update: deskripsi perubahan"
git push
```

---

## Setelah Selesai

Aplikasi **Saku Budget Tracker** kamu akan:
- ✅ Online 24/7 di GitHub Pages (gratis, selamanya)
- ✅ Data tersimpan di Firebase Firestore (cloud Google, gratis)
- ✅ Bisa diakses dari HP atau laptop manapun
- ✅ Data tidak hilang walau browser di-clear

---

*Diperbarui: Mei 2026*
