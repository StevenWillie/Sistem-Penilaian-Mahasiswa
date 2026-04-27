# 📁 Struktur Proyek - Panduan untuk Dosen

Penjelasan lengkap struktur folder dan file proyek.

---

## 🎯 File Utama (Root Directory)

### 📄 File Wajib Dibaca
| File | Deskripsi | Prioritas |
|------|-----------|-----------|
| **00-START_HERE.md** | Titik awal untuk reviewer | ⭐⭐⭐ |
| **README.md** | Dokumentasi utama proyek | ⭐⭐⭐ |
| **QUICK_START.md** | Panduan cepat (5 menit) | ⭐⭐ |
| **Laporan PDF** | Laporan lengkap untuk dosen | ⭐⭐⭐ |

### ⚙️ File Konfigurasi
| File | Deskripsi |
|------|-----------|
| `package.json` | Dependencies & npm scripts |
| `jest.config.js` | Konfigurasi testing |
| `.env.example` | Template environment variables |
| `.gitignore` | File yang diabaikan git |

---

## 📁 Folder Utama

### 1. **src/** - Source Code Aplikasi

```
src/
├── config/
│   └── database.js          # Konfigurasi MySQL connection
│
├── controllers/
│   └── StudentController.js # HTTP request handlers
│
├── models/
│   └── Student.js           # Model mahasiswa & logika GPA
│
├── routes/
│   └── studentRoutes.js     # Definisi API endpoints
│
├── services/
│   └── StudentService.js    # Business logic & validasi
│
├── utils/
│   └── MySQLStore.js        # Database operations
│
├── app.js                   # Express app setup
└── index.js                 # Entry point server
```

**Penjelasan:**
- `config/` - Konfigurasi database
- `controllers/` - Handle HTTP request/response
- `models/` - Data model & perhitungan (GPA, letter grade)
- `routes/` - Routing API endpoints
- `services/` - Business logic & validasi input
- `utils/` - Helper functions (database operations)

---

### 2. **public/** - Frontend (UI)

```
public/
├── index.html               # Halaman utama aplikasi
├── style.css                # Styling (gradient ungu, responsive)
└── script.js                # JavaScript (AJAX, DOM manipulation)
```

**Penjelasan:**
- `index.html` - Struktur HTML (form, tabel, modal)
- `style.css` - Styling modern dengan gradient
- `script.js` - Fetch API, event handlers, UI updates

---

### 3. **tests/** - Test Files

```
tests/
├── unit/                    # Unit Tests (37 tests)
│   ├── Student.test.js      # Test model Student
│   ├── GradeCalculation.test.js
│   ├── GPACalculation.test.js
│   ├── StudentStatus.test.js
│   ├── Validation.test.js
│   ├── StudentService.test.js
│   ├── DataStore.test.js
│   └── TopStudents.test.js
│
└── integration/             # Integration Tests (5 tests)
    ├── api.test.js          # Test API endpoints
    └── studentFlow.test.js  # Test complete workflows
```

**Penjelasan:**
- `unit/` - Test individual functions/methods
- `integration/` - Test API endpoints end-to-end

---

### 4. **database/** - Database

```
database/
└── setup.sql                # SQL script untuk setup database
```

**Penjelasan:**
- Script SQL untuk membuat database `db_mahasiswa`
- Membuat tabel `students` dan `grades`
- Membuat foreign key constraints

---

### 5. **docs/** - Dokumentasi Lengkap

```
docs/
├── API_DOCUMENTATION.md     # Dokumentasi API endpoints
├── ARCHITECTURE.md          # Arsitektur sistem dengan diagram
├── TESTING_GUIDE.md         # Panduan testing lengkap
├── MYSQL_SETUP.md           # Panduan setup MySQL
├── GITHUB_SETUP.md          # Setup GitHub & CI/CD
└── SUBMISSION_GUIDE.md      # Panduan pengumpulan tugas
```

**Penjelasan:**
- Dokumentasi teknis lengkap
- Panduan setup & deployment
- Strategi testing

---

### 6. **.github/workflows/** - CI/CD

```
.github/
└── workflows/
    └── ci.yml               # GitHub Actions workflow
```

**Penjelasan:**
- Automated testing pada setiap push/PR
- Multi-version testing (Node 18.x, 20.x)
- Coverage reporting

---

### 7. **coverage/** - Test Coverage Report

```
coverage/
└── lcov-report/
    └── index.html           # Coverage report (HTML)
```

**Penjelasan:**
- Generated setelah `npm test`
- Buka di browser untuk lihat coverage detail
- Menunjukkan line, branch, function coverage

---

## 🎯 Alur Kerja Aplikasi

### 1. **User Request Flow**
```
Browser (UI)
    ↓
public/script.js (AJAX)
    ↓
src/routes/studentRoutes.js
    ↓
src/controllers/StudentController.js
    ↓
src/services/StudentService.js
    ↓
src/models/Student.js
    ↓
src/utils/MySQLStore.js
    ↓
MySQL Database
```

### 2. **Testing Flow**
```
npm test
    ↓
Jest (test runner)
    ↓
tests/unit/*.test.js (37 tests)
tests/integration/*.test.js (5 tests)
    ↓
Coverage Report (88.58%)
```

---

## 📊 Statistik Proyek

### File Count
- **Source Code**: 8 files
- **Test Files**: 10 files
- **Documentation**: 10 files
- **Total**: ~40 files

### Code Lines
- **Source Code**: ~800 lines
- **Test Code**: ~600 lines
- **Documentation**: ~3000 lines

### Test Coverage
- **Total Tests**: 50 test cases
- **Coverage**: 88.58%
- **Models**: 100%
- **Routes**: 100%

---

## 🗂️ File yang Tidak Perlu Direview

Folder/file yang di-generate otomatis:
- `node_modules/` - Dependencies (di-ignore git)
- `coverage/` - Test coverage report (generated)
- `.vscode/` - VS Code settings (optional)
- `package-lock.json` - Lock file (auto-generated)

---

## ✅ Checklist Review

### Untuk Dosen:
- [ ] Baca `00-START_HERE.md`
- [ ] Baca `README.md`
- [ ] Baca `Laporan PDF`
- [ ] Review `src/` (source code)
- [ ] Review `tests/` (test files)
- [ ] Review `public/` (UI)
- [ ] Jalankan `npm test`
- [ ] Jalankan aplikasi & test UI
- [ ] Cek GitHub Actions (CI/CD)

---

## 📞 Kontak

Jika ada pertanyaan tentang struktur proyek:

**Steven Willie**  
NIM: 03081230044  
GitHub: https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa

---

**Struktur proyek ini dirancang untuk:**
- ✅ Mudah dipahami
- ✅ Mudah di-maintain
- ✅ Mudah di-test
- ✅ Mudah di-review

**Terima kasih!** 🙏
