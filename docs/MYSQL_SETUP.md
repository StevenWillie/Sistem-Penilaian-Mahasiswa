# 🗄️ MySQL Setup Guide

Panduan setup database MySQL untuk Sistem Penilaian Mahasiswa.

---

## ✅ Prerequisites

- XAMPP sudah terinstall
- MySQL di XAMPP sudah running

---

## 🚀 Langkah Setup

### 1. **Start MySQL di XAMPP**

1. Buka **XAMPP Control Panel**
2. Klik **Start** pada **MySQL**
3. Pastikan status **Running** (hijau)

### 2. **Buka phpMyAdmin**

1. Di XAMPP Control Panel, klik **Admin** pada MySQL
2. Atau buka browser: `http://localhost/phpmyadmin`

### 3. **Buat Database**

**Option A: Via phpMyAdmin UI**
1. Klik tab **"Databases"**
2. Nama database: `db_mahasiswa`
3. Collation: `utf8mb4_general_ci`
4. Klik **"Create"**

**Option B: Via SQL**
1. Klik tab **"SQL"**
2. Copy-paste script dari `database/setup.sql`
3. Klik **"Go"**

### 4. **Verifikasi Database**

Setelah run script, cek:
- ✅ Database `db_mahasiswa` ada
- ✅ Tabel `students` ada (4 kolom: id, nim, name, major)
- ✅ Tabel `grades` ada (5 kolom: id, student_id, subject, score, letter_grade)

---

## 📦 Install Dependencies

```bash
npm install
```

Ini akan install package `mysql2` yang diperlukan.

---

## ▶️ Jalankan Aplikasi

```bash
npm start
```

**Expected output:**
```
✅ Database connected successfully
Server running on port 3000
Visit http://localhost:3000 for the application
Database: MySQL (db_mahasiswa)
```

Jika muncul error:
```
❌ Database connection failed
```

Cek:
1. MySQL di XAMPP sudah running?
2. Database `db_mahasiswa` sudah dibuat?
3. File `database/setup.sql` sudah dijalankan?

---

## 🔧 Konfigurasi Database

File: `.env` (buat dari `.env.example`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=db_mahasiswa
```

**Default XAMPP:**
- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: (kosong)

---

## 📊 Struktur Database

### Tabel: `students`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | ID mahasiswa |
| nim | VARCHAR(10) | NIM (unique) |
| name | VARCHAR(100) | Nama lengkap |
| major | VARCHAR(100) | Jurusan |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diupdate |

### Tabel: `grades`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | ID nilai |
| student_id | INT (FK) | ID mahasiswa |
| subject | VARCHAR(100) | Mata kuliah |
| score | INT | Nilai (0-100) |
| letter_grade | CHAR(1) | Grade (A/B/C/D/E) |
| created_at | TIMESTAMP | Waktu dibuat |

**Relasi:** `grades.student_id` → `students.id` (ON DELETE CASCADE)

---

## 🧪 Test Database

### Via phpMyAdmin

1. Buka phpMyAdmin
2. Pilih database `db_mahasiswa`
3. Klik tabel `students`
4. Tab **"Browse"** untuk lihat data

### Via Aplikasi

1. Jalankan aplikasi: `npm start`
2. Buka browser: `http://localhost:3000`
3. Tambah mahasiswa via UI
4. Cek di phpMyAdmin → data masuk!

---

## 🔄 Reset Database

Jika mau reset semua data:

```sql
-- Jalankan di phpMyAdmin SQL tab
USE db_mahasiswa;
DELETE FROM grades;
DELETE FROM students;
ALTER TABLE students AUTO_INCREMENT = 1;
```

Atau via aplikasi (jika ada endpoint clear).

---

## ❓ Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Solusi:**
- Cek password MySQL di XAMPP
- Update file `.env` dengan password yang benar

### Error: "Unknown database 'db_mahasiswa'"

**Solusi:**
- Database belum dibuat
- Jalankan `database/setup.sql` di phpMyAdmin

### Error: "Table 'students' doesn't exist"

**Solusi:**
- Tabel belum dibuat
- Jalankan `database/setup.sql` di phpMyAdmin

### Error: "Can't connect to MySQL server"

**Solusi:**
- MySQL di XAMPP belum running
- Start MySQL di XAMPP Control Panel

---

## 📝 Catatan

- Data sekarang tersimpan di **MySQL**, bukan JSON file
- File `data/students.json` tidak dipakai lagi
- Semua operasi CRUD langsung ke database
- Data persistent meskipun server restart

---

## ✅ Checklist

- [ ] XAMPP terinstall
- [ ] MySQL di XAMPP running
- [ ] Database `db_mahasiswa` dibuat
- [ ] File `database/setup.sql` dijalankan
- [ ] `npm install` sudah dijalankan
- [ ] Aplikasi bisa start tanpa error
- [ ] Bisa tambah mahasiswa via UI
- [ ] Data masuk ke database (cek phpMyAdmin)

---

**Selamat! Database MySQL sudah siap digunakan!** 🎉
