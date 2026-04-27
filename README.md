# 📚 Sistem Penilaian Mahasiswa

![CI Status](https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-82%25-brightgreen)

Aplikasi web buat kelola data mahasiswa dan sistem penilaian dengan automated testing dan CI/CD.

**Final Project Mata Kuliah Pengujian Perangkat Lunak**

---

## 📋 Daftar Isi

1. [Fitur Aplikasi](#-fitur-aplikasi)
2. [Teknologi](#-teknologi)
3. [Cara Instalasi](#-cara-instalasi)
4. [Cara Menjalankan](#-cara-menjalankan)
5. [Cara Testing](#-cara-testing)
6. [Struktur Proyek](#-struktur-proyek)
7. [Dokumentasi](#-dokumentasi)

---

## ✨ Fitur Aplikasi

### 1. **Manajemen Mahasiswa**
- ✅ Tambah mahasiswa baru (NIM, Nama, Jurusan)
- ✅ Lihat daftar semua mahasiswa
- ✅ Hapus data mahasiswa
- ✅ Validasi input (NIM 10 digit, nama min 3 karakter)

### 2. **Sistem Penilaian**
- ✅ Tambah nilai mata kuliah (0-100)
- ✅ Konversi otomatis ke letter grade (A, B, C, D, E)
- ✅ Perhitungan GPA otomatis (skala 4.0)
- ✅ Status kelulusan (Cumlaude, Sangat Memuaskan, dll)

### 3. **Fitur Lainnya**
- ✅ Ranking top 5 mahasiswa berdasarkan GPA
- ✅ Tampilan UI yang simpel dan mudah dipakai
- ✅ Data disimpan di MySQL database
- ✅ Notifikasi success/error

---

## 🛠️ Teknologi

- **Backend**: Node.js + Express.js
- **Database**: MySQL (via XAMPP)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Testing**: Jest + Supertest
- **CI/CD**: GitHub Actions

---

## 📦 Cara Instalasi

### Prerequisites
- Node.js >= 18.0.0
- XAMPP (untuk MySQL)
- Git

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa.git
cd Sistem-Penilaian-Mahasiswa

# 2. Install dependencies
npm install

# 3. Setup database MySQL
# - Start MySQL di XAMPP
# - Buka phpMyAdmin (http://localhost/phpmyadmin)
# - Jalankan script SQL dari file: database/setup.sql

# 4. Selesai!
```

**Panduan lengkap setup MySQL:** [docs/MYSQL_SETUP.md](docs/MYSQL_SETUP.md)

---

## 🚀 Cara Menjalankan

### 1. Start MySQL di XAMPP
- Buka XAMPP Control Panel
- Klik **Start** pada **MySQL**

### 2. Jalankan Aplikasi
```bash
npm start
```

### 3. Buka di Browser
```
http://localhost:3000
```

**Anda akan melihat:**
- 📝 Form input mahasiswa
- 📊 Tabel daftar mahasiswa dengan GPA
- ➕ Tombol tambah nilai
- 🏆 Ranking top 5 mahasiswa

---

## 🧪 Cara Testing

### Menjalankan Semua Test
```bash
npm test
```

**Output:**
```
✓ Test Suites: 10 passed, 10 total
✓ Tests: 50 passed, 50 total
✓ Coverage: 88.58%
```

### Melihat Coverage Report
```bash
# Setelah npm test, buka file:
coverage/lcov-report/index.html
```

### Test Spesifik
```bash
# Unit test saja
npm run test:unit

# Integration test saja
npm run test:integration

# Watch mode (auto re-run)
npm run test:watch
```

---

## 🎯 Strategi Pengujian

### Pendekatan Testing
Proyek ini pakai **pendekatan piramida testing** dengan fokus pada:
1. **Unit Testing** (45 tests) - Kebanyakan test buat logika bisnis
2. **Integration Testing** (5 tests) - Test interaksi antar komponen

### Unit Testing Strategy

**Tujuan:** Ngetes setiap fungsi/method secara terpisah

**Yang Diuji:**
- **Model Layer** (Student.js)
  - Perhitungan GPA (5 tests)
  - Konversi letter grade (5 tests)
  - Penentuan status kelulusan (5 tests)
  - Validasi score (5 tests)
  
- **Service Layer** (StudentService.js)
  - Validasi input NIM, nama, major (10 tests)
  - CRUD operations (7 tests)
  - Business logic (ranking, filtering)

- **Utility Layer** (DataStore/MySQLStore)
  - File/database operations (4 tests)

**Cara:**
- Setiap test jalan sendiri-sendiri
- Pakai mock data buat isolasi
- Test edge cases dan boundary values
- Fokus ke logika bisnis yang penting

### Integration Testing Strategy

**Tujuan:** Ngetes interaksi antar komponen secara end-to-end

**Yang Diuji:**
- **API Endpoints** (3 tests)
  - POST /api/students - Create student
  - GET /api/students - Get all students
  - POST /api/students/:id/grades - Add grade
  
- **Complete Workflows** (2 tests)
  - Lifecycle: Create → Add grades → Verify GPA → Delete
  - Ranking: Multiple students → Calculate GPA → Sort by ranking

**Cara:**
- Test lewat HTTP requests (pakai Supertest)
- Pakai MySQL database buat testing
- Database di-reset sebelum setiap test (clean state)
- Cek response status dan data
- Test alur bisnis lengkap dari awal sampai akhir
- CI environment pakai MySQL service container

### Coverage Strategy

**Target:** Minimal 60% (Achieved: 82%)

**Prioritas Coverage:**
1. **Critical Path** - Logika bisnis utama (GPA, grading) → 100%
2. **Business Logic** - Service layer → 84%
3. **API Layer** - Controllers & routes → 85-100%
4. **Utility** - Helper functions → 77%

**Yang Gak Di-cover:**
- Entry point (index.js)
- Configuration files
- Third-party libraries

### Test Automation

**Continuous Integration:**
- Automated testing pakai GitHub Actions
- Test jalan otomatis tiap push/PR
- Multi-version testing (Node.js 18.x, 20.x)
- Coverage report di-generate otomatis

**CI/CD Pipeline Steps:**
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Setup MySQL database
5. Verify application build
6. Run all tests with coverage
7. Upload coverage report

**Keuntungan:**
- Deteksi bug lebih cepat
- Jaminan kualitas code
- Lebih percaya diri waktu deployment
- Dokumentasi lewat tests

---

## 📁 Struktur Proyek

```
sistem-penilaian-mahasiswa/
│
├── 📄 README.md                    # Dokumentasi utama (BACA INI DULU!)
├── 📄 QUICK_START.md               # Panduan cepat
├── 📄 00-START_HERE.md             # Titik awal untuk reviewer
│
├── 📁 src/                         # Source code aplikasi
│   ├── config/                     # Konfigurasi (database)
│   ├── controllers/                # HTTP request handlers
│   ├── models/                     # Data models
│   ├── routes/                     # API routes
│   ├── services/                   # Business logic
│   ├── utils/                      # Utilities (MySQLStore)
│   ├── app.js                      # Express app setup
│   └── index.js                    # Entry point
│
├── 📁 public/                      # Frontend (UI)
│   ├── index.html                  # Halaman utama
│   ├── style.css                   # Styling
│   └── script.js                   # JavaScript frontend
│
├── 📁 tests/                       # Test files
│   ├── unit/                       # Unit tests (37 tests)
│   └── integration/                # Integration tests (5 tests)
│
├── 📁 database/                    # Database
│   └── setup.sql                   # SQL script untuk setup
│
├── 📁 docs/                        # Dokumentasi lengkap
│   ├── API_DOCUMENTATION.md        # Dokumentasi API
│   ├── ARCHITECTURE.md             # Arsitektur sistem
│   ├── TESTING_GUIDE.md            # Panduan testing
│   ├── MYSQL_SETUP.md              # Setup MySQL
│   ├── GITHUB_SETUP.md             # Setup GitHub & CI/CD
│   └── SUBMISSION_GUIDE.md         # Panduan pengumpulan
│
├── 📁 .github/workflows/           # CI/CD
│   └── ci.yml                      # GitHub Actions workflow
│
├── 📄 package.json                 # Dependencies & scripts
├── 📄 jest.config.js               # Jest configuration
└── 📄 .env.example                 # Environment variables template
```

---

## 📚 Dokumentasi

### Untuk Dosen/Reviewer
1. **[00-START_HERE.md](00-START_HERE.md)** - Mulai dari sini
2. **[QUICK_START.md](QUICK_START.md)** - Panduan cepat (5 menit)
3. **[Laporan Pengujian perangkat lunak.pdf](Laporan%20Pengujian%20perangkat%20lunak.pdf)** - Laporan lengkap

### Dokumentasi Teknis
- **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** - API endpoints
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arsitektur sistem
- **[docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md)** - Strategi testing
- **[docs/MYSQL_SETUP.md](docs/MYSQL_SETUP.md)** - Setup database

### Setup & Deployment
- **[docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)** - Setup GitHub & CI/CD
- **[docs/SUBMISSION_GUIDE.md](docs/SUBMISSION_GUIDE.md)** - Panduan submit

---

## 🎯 Hasil Testing

### Test Coverage
- **Total Tests**: 50 test cases
  - Unit Tests: 45 tests
  - Integration Tests: 5 tests
- **Coverage**: 82%
  - Models: 100%
  - Routes: 100%
  - Controllers: 86%
  - Services: 84%

### CI/CD
- ✅ Automated testing pakai GitHub Actions
- ✅ Test jalan otomatis tiap push/PR
- ✅ Multi-version testing (Node.js 18.x, 20.x)

---

## 🎓 Grading System

### Letter Grade
| Score | Grade | GPA |
|-------|-------|-----|
| 85-100 | A | 4.0 |
| 70-84 | B | 3.0 |
| 60-69 | C | 2.0 |
| 50-59 | D | 1.0 |
| 0-49 | E | 0.0 |

### Status Kelulusan
| GPA | Status |
|-----|--------|
| ≥ 3.5 | Cumlaude |
| ≥ 3.0 | Sangat Memuaskan |
| ≥ 2.5 | Memuaskan |
| ≥ 2.0 | Cukup |
| < 2.0 | Kurang |

---

## 👨‍💻 Author

**Steven Willie**  
NIM: 03081230044  
Mata Kuliah: Pengujian Perangkat Lunak

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🔗 Links

- **Repository**: https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa
- **CI/CD**: https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa/actions

---

**⭐ Jika ada pertanyaan, silakan buka file [00-START_HERE.md](00-START_HERE.md)**
