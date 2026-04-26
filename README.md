# Sistem Penilaian Mahasiswa

![CI Status](https://github.com/StevenWillie/Sistem-Penilaian-Mahasiswa/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-60%25-yellow)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

Sistem Penilaian Mahasiswa adalah aplikasi REST API sederhana untuk mengelola data mahasiswa dan nilai mereka. Aplikasi ini dikembangkan sebagai Final Project mata kuliah Software Testing dengan implementasi automated testing dan Continuous Integration.

## Fitur Utama

1. **Manajemen Data Mahasiswa**
   - Tambah mahasiswa baru dengan validasi NIM
   - Lihat daftar semua mahasiswa
   - Cari mahasiswa berdasarkan ID
   - Hapus data mahasiswa

2. **Sistem Penilaian**
   - Tambah nilai mata kuliah untuk mahasiswa
   - Perhitungan otomatis letter grade (A, B, C, D, E)
   - Perhitungan GPA (Grade Point Average)
   - Status kelulusan (Cumlaude, Sangat Memuaskan, Memuaskan, Cukup, Kurang)

3. **Fitur Tambahan**
   - Lihat top students berdasarkan GPA
   - Penyimpanan data persistent ke file JSON
   - Validasi input yang ketat

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js
- **Testing**: Jest
- **Integration Testing**: Supertest
- **CI/CD**: GitHub Actions

## Instalasi

### Prerequisites
- Node.js >= 18.0.0
- npm atau yarn

### Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa.git
cd sistem-penilaian-mahasiswa

# Install dependencies
npm install

# Jalankan aplikasi
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Cara Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Cara Menjalankan Test

### Menjalankan Semua Test
```bash
npm test
```

### Menjalankan Unit Test Saja
```bash
npm run test:unit
```

### Menjalankan Integration Test Saja
```bash
npm run test:integration
```

### Watch Mode (untuk development)
```bash
npm run test:watch
```

## API Endpoints

### 1. Get API Info
```
GET /
```

### 2. Create Student
```
POST /api/students
Content-Type: application/json

{
  "nim": "1234567890",
  "name": "John Doe",
  "major": "Computer Science"
}
```

### 3. Get All Students
```
GET /api/students
```

### 4. Get Student by ID
```
GET /api/students/:id
```

### 5. Add Grade to Student
```
POST /api/students/:id/grades
Content-Type: application/json

{
  "subject": "Database Systems",
  "score": 85
}
```

### 6. Get Top Students
```
GET /api/students/top?limit=5
```

### 7. Delete Student
```
DELETE /api/students/:id
```

## Strategi Pengujian

### Unit Testing (15+ test cases)
Pengujian dilakukan pada level fungsi dan method individual:

1. **Student Model Tests** (5 tests)
   - Pembuatan objek student
   - Validasi penambahan nilai
   - Validasi score range

2. **Grade Calculation Tests** (5 tests)
   - Perhitungan letter grade untuk setiap range nilai
   - Boundary testing untuk setiap grade

3. **GPA Calculation Tests** (5 tests)
   - Perhitungan GPA dengan berbagai skenario
   - GPA dengan 0 nilai
   - Presisi decimal

4. **Student Status Tests** (5 tests)
   - Status berdasarkan GPA
   - Semua kategori status

5. **Validation Tests** (10 tests)
   - Validasi NIM (format, panjang)
   - Validasi nama
   - Validasi score

6. **StudentService Tests** (7 tests)
   - CRUD operations
   - Error handling
   - Duplicate detection

### Integration Testing (5+ test cases)
Pengujian end-to-end melalui API:

1. **API Integration Tests** (3 tests)
   - Create student via API
   - Get all students
   - Add grade via API

2. **Student Flow Tests** (2 tests)
   - Complete lifecycle (create → add grades → verify → delete)
   - Top students ranking

### Test Coverage
Target coverage: **60%+**

Coverage mencakup:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

## Continuous Integration

Pipeline CI menggunakan GitHub Actions yang berjalan otomatis pada:
- Push ke branch main/master/develop
- Pull request ke branch main/master/develop

### Pipeline Steps:
1. Checkout code
2. Setup Node.js (matrix: v18, v20)
3. Install dependencies
4. Run tests with coverage
5. Upload coverage report

## Struktur Project

```
sistem-penilaian-mahasiswa/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions workflow
├── src/
│   ├── controllers/
│   │   └── StudentController.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── services/
│   │   └── StudentService.js
│   ├── utils/
│   │   └── DataStore.js
│   ├── app.js
│   └── index.js
├── tests/
│   ├── unit/
│   │   ├── Student.test.js
│   │   ├── GradeCalculation.test.js
│   │   ├── GPACalculation.test.js
│   │   ├── StudentStatus.test.js
│   │   ├── Validation.test.js
│   │   └── StudentService.test.js
│   └── integration/
│       ├── api.test.js
│       └── studentFlow.test.js
├── data/
│   └── .gitkeep
├── coverage/                   # Generated by Jest
├── .gitignore
├── package.json
└── README.md
```

## Arsitektur Aplikasi

Aplikasi menggunakan arsitektur **MVC (Model-View-Controller)** dengan layer tambahan:

```
Request → Routes → Controller → Service → Model → DataStore
                                              ↓
                                         JSON File
```

### Layer Explanation:
- **Routes**: Mendefinisikan endpoint API
- **Controller**: Menangani HTTP request/response
- **Service**: Business logic dan validasi
- **Model**: Representasi data dan perhitungan
- **DataStore**: Persistence layer (file I/O)

## Validasi Input

### NIM
- Harus 10 digit angka
- Tidak boleh duplikat

### Nama
- Minimal 3 karakter
- Tidak boleh kosong

### Major
- Tidak boleh kosong

### Score
- Harus angka antara 0-100
- Subject tidak boleh kosong

## Grading System

### Letter Grade
- A: 85-100
- B: 70-84
- C: 60-69
- D: 50-59
- E: 0-49

### GPA Scale
- A = 4.0
- B = 3.0
- C = 2.0
- D = 1.0
- E = 0.0

### Status Kelulusan
- Cumlaude: GPA ≥ 3.5
- Sangat Memuaskan: GPA ≥ 3.0
- Memuaskan: GPA ≥ 2.5
- Cukup: GPA ≥ 2.0
- Kurang: GPA < 2.0

## Author

Dibuat sebagai Final Project mata kuliah Software Testing

## License

MIT
