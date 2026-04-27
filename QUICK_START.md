# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan aplikasi dalam 5 menit!

---

## 📋 Prerequisites

- Node.js >= 18.0.0
- XAMPP (untuk MySQL)

---

## ⚡ Langkah Cepat

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MySQL
```bash
# 1. Start MySQL di XAMPP Control Panel
# 2. Buka phpMyAdmin: http://localhost/phpmyadmin
# 3. Klik tab "SQL"
# 4. Copy-paste isi file: database/setup.sql
# 5. Klik "Go"
```

**Panduan lengkap:** [docs/MYSQL_SETUP.md](docs/MYSQL_SETUP.md)

### 3. Jalankan Aplikasi
```bash
npm start
```

### 4. Buka Browser
```
http://localhost:3000
```

---

## 🎨 Tampilan UI

Anda akan melihat:
- ✅ Form input mahasiswa (NIM, Nama, Jurusan)
- ✅ Tabel daftar mahasiswa dengan GPA
- ✅ Tombol "+ Nilai" untuk tambah nilai
- ✅ Section "Top 5 Mahasiswa" untuk ranking
- ✅ Tombol "Hapus" untuk delete

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

**Output:**
```
✓ Test Suites: 10 passed, 10 total
✓ Tests: 50 passed, 50 total
✓ Coverage: 88.58%
```

### Lihat Coverage Report
```bash
# Setelah npm test, buka:
coverage/lcov-report/index.html
```

---

## 📝 Test Manual via UI

1. **Tambah Mahasiswa**
   - Isi NIM: `1234567890`
   - Isi Nama: `John Doe`
   - Isi Jurusan: `Computer Science`
   - Klik "Simpan Mahasiswa"

2. **Tambah Nilai**
   - Klik tombol "+ Nilai" di tabel
   - Isi Mata Kuliah: `Database`
   - Isi Nilai: `85`
   - Klik "Simpan Nilai"

3. **Lihat GPA**
   - GPA otomatis terhitung di tabel
   - Status kelulusan muncul (Cumlaude, dll)

4. **Lihat Ranking**
   - Scroll ke bawah
   - Lihat Top 5 Mahasiswa

---

## 🔧 Commands

| Command | Deskripsi |
|---------|-----------|
| `npm start` | Jalankan aplikasi |
| `npm test` | Run semua tests |
| `npm run test:unit` | Run unit tests saja |
| `npm run test:integration` | Run integration tests saja |
| `npm run test:watch` | Watch mode (auto re-run) |

---

## 📚 Dokumentasi Lengkap

- **[README.md](README.md)** - Dokumentasi utama
- **[00-START_HERE.md](00-START_HERE.md)** - Panduan untuk dosen
- **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** - API reference
- **[docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md)** - Testing guide
- **[docs/MYSQL_SETUP.md](docs/MYSQL_SETUP.md)** - Setup MySQL

---

## ❓ Troubleshooting

### Error: "Database connection failed"
**Solusi:**
- Pastikan MySQL di XAMPP sudah running
- Pastikan database `db_mahasiswa` sudah dibuat
- Jalankan `database/setup.sql` di phpMyAdmin

### Error: "Port 3000 already in use"
**Solusi:**
```bash
# Gunakan port lain
PORT=3001 npm start
```

### Error: "Module not found"
**Solusi:**
```bash
npm install
```

---

**Selamat! Aplikasi siap digunakan!** 🎉
