# Panduan Deploy Saku Budget Tracker ke GitHub Pages

> **Semua gratis, tanpa server, tanpa biaya hosting.**

---

## Apakah Bisa Deploy ke GitHub Pages?

**Ya, bisa 100%.** Project ini sudah menggunakan arsitektur _pure static files_ (HTML + JSX yang dicompile langsung di browser oleh Babel Standalone). GitHub Pages hanya butuh file statis — tidak perlu server, tidak perlu database, tidak perlu build tool.

---

## Yang Diperlukan

| Kebutuhan | Gratis? | Keterangan |
|---|---|---|
| Akun GitHub | ✅ Gratis | Daftar di github.com |
| Git for Windows | ✅ Gratis | Tool untuk push file ke GitHub |
| GitHub Pages | ✅ Gratis | Fitur bawaan GitHub |
| Koneksi internet | - | Untuk setup awal |

---

## Persiapan Sebelum Deploy

### Langkah 0 — Rename file HTML utama

GitHub Pages otomatis menserve file bernama `index.html`. Karena file Anda bernama `Budget Tracker.html` (ada spasi), rename dulu menjadi `index.html`.

Di Windows Explorer atau terminal:
```
rename "Budget Tracker.html" index.html
```

Atau klik kanan → Rename di File Explorer.

---

## Langkah Lengkap Deploy

### Langkah 1 — Buat Akun GitHub

1. Buka [https://github.com](https://github.com)
2. Klik **Sign up**
3. Isi email, password, username
4. Verifikasi email

---

### Langkah 2 — Install Git for Windows

1. Download di [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Jalankan installer, klik **Next** terus (default settings sudah cukup)
3. Setelah install, buka **Git Bash** atau **PowerShell** dan cek:
   ```
   git --version
   ```
   Harus muncul versi seperti `git version 2.xx.x`

---

### Langkah 3 — Konfigurasi Git (sekali saja)

Buka PowerShell atau Git Bash, jalankan:

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "alanaleciku@gmail.com"
```

---

### Langkah 4 — Buat Repository Baru di GitHub

1. Login ke GitHub
2. Klik tombol **+** di pojok kanan atas → **New repository**
3. Isi:
   - **Repository name**: `uang-saku` (atau nama lain yang kamu mau)
   - **Visibility**: ✅ **Public** (wajib untuk GitHub Pages gratis)
   - Jangan centang "Add a README file"
4. Klik **Create repository**
5. Salin URL repository kamu, contoh:
   ```
   https://github.com/usernamekamu/uang-saku.git
   ```

---

### Langkah 5 — Push Project ke GitHub

Buka PowerShell, navigasi ke folder project:

```powershell
cd "D:\NEW PROJECT 2026\Uang-Saku"
```

Jalankan perintah berikut satu per satu:

```bash
# 1. Inisialisasi git di folder ini
git init

# 2. Tambahkan semua file
git add .

# 3. Buat commit pertama
git commit -m "Initial commit: Saku Budget Tracker"

# 4. Rename branch ke main
git branch -M main

# 5. Hubungkan ke repository GitHub (ganti URL dengan URL repo kamu)
git remote add origin https://github.com/usernamekamu/uang-saku.git

# 6. Push ke GitHub
git push -u origin main
```

Saat push pertama kali, browser akan terbuka minta login ke GitHub. Ikuti prosesnya.

---

### Langkah 6 — Aktifkan GitHub Pages

1. Buka repository kamu di GitHub
2. Klik tab **Settings** (di bagian atas repo)
3. Di menu kiri, scroll ke bawah, klik **Pages**
4. Di bagian **Source**, ubah:
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik **Save**
6. Tunggu 1–2 menit

---

### Langkah 7 — Akses Aplikasi

Setelah GitHub Pages aktif, URL aplikasi kamu akan muncul di halaman Settings → Pages:

```
https://usernamekamu.github.io/uang-saku/
```

Buka URL tersebut di browser — aplikasi Saku sudah live! 🎉

---

## Cara Update Aplikasi (Setelah Perubahan)

Setiap kali kamu edit file dan ingin publish perubahan:

```bash
cd "D:\NEW PROJECT 2026\Uang-Saku"
git add .
git commit -m "Update: deskripsi perubahan kamu"
git push
```

GitHub Pages akan otomatis update dalam 1–2 menit.

---

## Hal Penting yang Perlu Diketahui

### ✅ Yang Akan Berfungsi

- Semua tampilan dan animasi UI
- Navigasi antar screen
- Data dummy yang sudah ada di `data.jsx`
- Tampilan mobile di browser desktop

### ⚠️ Keterbatasan (Data Tidak Tersimpan)

Karena ini pure static (tidak ada server/database), **data transaksi yang diinput tidak akan tersimpan permanen** — saat browser di-refresh, data kembali ke data dummy di `data.jsx`.

Untuk kebutuhan pribadi sederhana, ini bisa diatasi dengan:
- **LocalStorage** — data tersimpan di browser lokal (gratis, tidak perlu server)
- Implementasi ini bisa ditambahkan ke `app.jsx` nanti jika dibutuhkan

### 🔒 Privasi

Repository harus **Public** agar GitHub Pages gratis bisa digunakan. Artinya kode kamu bisa dilihat orang lain. Untuk data pribadi sensitif, hindari meng-hardcode data nyata di file `data.jsx`.

---

## Ringkasan Struktur File yang Di-deploy

```
uang-saku/
├── index.html          ← (rename dari "Budget Tracker.html")
├── app.jsx
├── components.jsx
├── data.jsx
├── ios-frame.jsx
├── screens-main.jsx
└── screens-more.jsx
```

---

## Estimasi Waktu Setup

| Langkah | Waktu |
|---|---|
| Daftar GitHub | 5 menit |
| Install Git | 5 menit |
| Push ke GitHub | 5 menit |
| Aktifkan Pages | 2 menit |
| **Total** | **~17 menit** |

---

*Dibuat untuk project Saku Budget Tracker — May 2026*
