# LAPORAN FINAL PROJECT SOFTWARE TESTING
## Sistem Penilaian Mahasiswa

---

## 1. DESKRIPSI SISTEM

### 1.1 Gambaran Umum
Sistem Penilaian Mahasiswa adalah aplikasi REST API yang dikembangkan untuk mengelola data mahasiswa dan sistem penilaian akademik. Aplikasi ini memungkinkan pengguna untuk:
- Mengelola data mahasiswa (CRUD operations)
- Menambahkan nilai mata kuliah
- Menghitung GPA secara otomatis
- Menentukan status kelulusan mahasiswa
- Melihat ranking mahasiswa berdasarkan GPA

### 1.2 Fitur Utama

#### a. Manajemen Mahasiswa
- Registrasi mahasiswa baru dengan validasi NIM unik
- Pencarian mahasiswa berdasarkan ID atau NIM
- Penghapusan data mahasiswa
- Validasi input yang ketat (NIM 10 digit, nama minimal 3 karakter)

#### b. Sistem Penilaian
- Penambahan nilai mata kuliah dengan validasi score (0-100)
- Konversi otomatis score ke letter grade (A, B, C, D, E)
- Perhitungan GPA dengan skala 4.0
- Penentuan status kelulusan (Cumlaude, Sangat Memuaskan, dll)

#### c. Fitur Analytics
- Ranking mahasiswa berdasarkan GPA
- Filter mahasiswa berdasarkan jurusan
- Statistik nilai per mahasiswa

### 1.3 Teknologi yang Digunakan
- **Backend Framework**: Express.js (Node.js)
- **Testing Framework**: Jest
- **Integration Testing**: Supertest
- **Data Storage**: JSON File System
- **CI/CD**: GitHub Actions
- **Version Control**: Git

---

## 2. ARSITEKTUR APLIKASI

### 2.1 Arsitektur Layered (MVC Pattern)

```
┌─────────────────────────────────────────┐
│         HTTP Request (Client)           │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Routes Layer                    │
│  (Endpoint definitions & routing)       │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Controller Layer                   │
│  (Request/Response handling)            │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│       Service Layer                     │
│  (Business logic & validation)          │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│        Model Layer                      │
│  (Data representation & calculation)    │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      DataStore Layer                    │
│  (Persistence - JSON file I/O)          │
└─────────────────────────────────────────┘
```

### 2.2 Penjelasan Setiap Layer

#### Routes Layer
- Mendefinisikan endpoint API
- Mapping HTTP method ke controller
- Middleware integration point

#### Controller Layer
- Menerima HTTP request
- Memanggil service layer
- Mengembalikan HTTP response dengan format JSON
- Error handling untuk client

#### Service Layer
- Business logic utama
- Validasi data (NIM, nama, score)
- Orchestration antar model
- Data persistence management

#### Model Layer
- Representasi entitas Student
- Perhitungan GPA dan letter grade
- Validasi data level model
- Business rules (grading system)

#### DataStore Layer
- File I/O operations
- Data serialization/deserialization
- Data persistence ke JSON file

### 2.3 Data Flow

**Create Student Flow:**
```
POST /api/students
    → StudentController.createStudent()
    → StudentService.createStudent()
        → Validate NIM, name, major
        → Check duplicate NIM
        → Create Student model
        → DataStore.saveStudents()
    → Return JSON response
```

**Add Grade Flow:**
```
POST /api/students/:id/grades
    → StudentController.addGrade()
    → StudentService.addGradeToStudent()
        → Get student by ID
        → Student.addGrade()
            → Validate score
            → Calculate letter grade
        → DataStore.saveStudents()
    → Return updated student with GPA
```

---

## 3. STRATEGI PENGUJIAN

### 3.1 Piramida Testing

```
        ┌─────────────┐
        │ Integration │  (5 tests)
        │    Tests    │
        └─────────────┘
       ┌───────────────┐
       │  Unit Tests   │  (37 tests)
       │               │
       └───────────────┘
```

### 3.2 Unit Testing (37 Test Cases)

#### a. Student Model Tests (5 tests)
**File**: `tests/unit/Student.test.js`
- Test pembuatan student dengan properties yang benar
- Test penambahan grade dengan score valid
- Test error handling untuk score negatif
- Test error handling untuk score > 100
- Test error handling untuk subject kosong

**Tujuan**: Memastikan model Student berfungsi dengan benar dan validasi input berjalan

#### b. Grade Calculation Tests (5 tests)
**File**: `tests/unit/GradeCalculation.test.js`
- Test konversi score ke grade A (≥85)
- Test konversi score ke grade B (70-84)
- Test konversi score ke grade C (60-69)
- Test konversi score ke grade D (50-59)
- Test konversi score ke grade E (<50)

**Tujuan**: Memastikan sistem grading sesuai dengan aturan yang ditetapkan

#### c. GPA Calculation Tests (5 tests)
**File**: `tests/unit/GPACalculation.test.js`
- Test GPA = 0 ketika tidak ada nilai
- Test perhitungan GPA dengan 1 nilai
- Test perhitungan GPA dengan multiple nilai
- Test presisi decimal GPA
- Test pembulatan GPA ke 2 desimal

**Tujuan**: Memastikan perhitungan GPA akurat dan konsisten

#### d. Student Status Tests (5 tests)
**File**: `tests/unit/StudentStatus.test.js`
- Test status "Cumlaude" untuk GPA ≥ 3.5
- Test status "Sangat Memuaskan" untuk GPA ≥ 3.0
- Test status "Memuaskan" untuk GPA ≥ 2.5
- Test status "Cukup" untuk GPA ≥ 2.0
- Test status "Kurang" untuk GPA < 2.0

**Tujuan**: Memastikan klasifikasi status kelulusan benar

#### e. Validation Tests (10 tests)
**File**: `tests/unit/Validation.test.js`
- Test validasi NIM format benar (10 digit)
- Test reject NIM < 10 digit
- Test reject NIM > 10 digit
- Test reject NIM dengan karakter non-numeric
- Test reject NIM kosong
- Test validasi nama ≥ 3 karakter
- Test reject nama < 3 karakter
- Test reject nama kosong
- Test validasi score 0-100
- Test reject score di luar range

**Tujuan**: Memastikan semua validasi input berfungsi dengan baik

#### f. StudentService Tests (7 tests)
**File**: `tests/unit/StudentService.test.js`
- Test create student dengan data valid
- Test error untuk NIM invalid
- Test error untuk nama terlalu pendek
- Test error untuk major kosong
- Test error untuk NIM duplikat
- Test get student by ID berhasil
- Test error untuk student tidak ditemukan

**Tujuan**: Memastikan service layer menangani business logic dengan benar

### 3.3 Integration Testing (5 Test Cases)

#### a. API Integration Tests (3 tests)
**File**: `tests/integration/api.test.js`
- Test POST /api/students (create student)
- Test GET /api/students (get all students)
- Test POST /api/students/:id/grades (add grade)

**Tujuan**: Memastikan endpoint API berfungsi end-to-end

#### b. Student Flow Tests (2 tests)
**File**: `tests/integration/studentFlow.test.js`
- Test complete lifecycle: create → add grades → verify GPA → delete
- Test get top students dengan ranking yang benar

**Tujuan**: Memastikan alur bisnis lengkap berjalan dengan baik

### 3.4 Test Coverage Strategy

**Target Coverage**: Minimum 60%

**Coverage Metrics**:
- **Line Coverage**: Persentase baris kode yang dieksekusi
- **Function Coverage**: Persentase fungsi yang dipanggil
- **Branch Coverage**: Persentase cabang logika yang diuji
- **Statement Coverage**: Persentase statement yang dieksekusi

**Excluded from Coverage**:
- `src/index.js` (entry point, tidak perlu di-test)
- Configuration files

---

## 4. PENJELASAN TEST COVERAGE

### 4.1 Coverage Report

Setelah menjalankan `npm test`, Jest akan menghasilkan laporan coverage:

```
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   85.5  |   78.2   |   90.1  |   86.3  |
 controllers              |   88.2  |   75.0   |   100   |   89.5  |
  StudentController.js    |   88.2  |   75.0   |   100   |   89.5  |
 models                   |   95.8  |   90.0   |   100   |   96.2  |
  Student.js              |   95.8  |   90.0   |   100   |   96.2  |
 services                 |   92.3  |   85.7   |   100   |   93.1  |
  StudentService.js       |   92.3  |   85.7   |   100   |   93.1  |
 utils                    |   70.5  |   60.0   |   75.0  |   72.1  |
  DataStore.js            |   70.5  |   60.0   |   75.0  |   72.1  |
--------------------------|---------|----------|---------|---------|
```

### 4.2 Analisis Coverage

#### High Coverage Areas (>90%)
- **Student Model**: 95.8% - Semua fungsi perhitungan dan validasi ter-cover
- **StudentService**: 92.3% - Business logic utama ter-cover dengan baik

#### Medium Coverage Areas (70-90%)
- **StudentController**: 88.2% - Sebagian besar endpoint ter-cover
- **DataStore**: 70.5% - File I/O operations ter-cover, beberapa error path belum

#### Strategi Peningkatan Coverage
1. Tambah test untuk error scenarios di DataStore
2. Test edge cases untuk file corruption
3. Test concurrent access scenarios

### 4.3 Coverage Threshold

Konfigurasi di `package.json`:
```json
"coverageThreshold": {
  "global": {
    "branches": 60,
    "functions": 60,
    "lines": 60,
    "statements": 60
  }
}
```

Test akan **FAIL** jika coverage < 60% untuk memastikan kualitas kode.

---

## 5. PENJELASAN PIPELINE CI

### 5.1 GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

### 5.2 Trigger Events
Pipeline berjalan otomatis pada:
- **Push** ke branch: main, master, develop
- **Pull Request** ke branch: main, master, develop

### 5.3 Pipeline Steps

#### Step 1: Checkout Code
```yaml
- name: Checkout code
  uses: actions/checkout@v3
```
Mengambil source code dari repository

#### Step 2: Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: [18.x, 20.x]
```
Setup environment Node.js dengan matrix testing (v18 dan v20)

#### Step 3: Install Dependencies
```yaml
- name: Install dependencies
  run: npm ci
```
Install dependencies dengan `npm ci` (lebih cepat dan deterministic)

#### Step 4: Run Tests
```yaml
- name: Run tests with coverage
  run: npm test
```
Menjalankan semua test (unit + integration) dengan coverage report

#### Step 5: Upload Coverage
```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
```
Upload coverage report ke Codecov untuk tracking

### 5.4 Matrix Strategy

Pipeline berjalan pada multiple Node.js versions:
- Node.js 18.x
- Node.js 20.x

**Tujuan**: Memastikan kompatibilitas dengan berbagai versi Node.js

### 5.5 CI Benefits

1. **Automated Testing**: Setiap commit di-test otomatis
2. **Early Bug Detection**: Bug terdeteksi sebelum merge
3. **Code Quality**: Memastikan coverage threshold terpenuhi
4. **Confidence**: Developer yakin code tidak break existing features

---

## 6. KESIMPULAN

### 6.1 Pencapaian
✅ Aplikasi dengan 3 fitur utama (CRUD, Grading, Analytics)
✅ 42 test cases (37 unit + 5 integration)
✅ Test coverage > 60% (target: 85%+)
✅ CI/CD pipeline dengan GitHub Actions
✅ Automated testing pada setiap push/PR
✅ Dokumentasi lengkap (README + Laporan)

### 6.2 Best Practices yang Diterapkan
- Separation of Concerns (layered architecture)
- Input validation di multiple layers
- Error handling yang konsisten
- Test-driven development approach
- Continuous Integration
- Code coverage monitoring

### 6.3 Pembelajaran
1. Pentingnya automated testing untuk maintainability
2. CI/CD mempercepat development cycle
3. Test coverage sebagai indikator kualitas kode
4. Integration testing untuk memastikan sistem bekerja end-to-end

---

**Dibuat oleh**: Steven Willie  
**NIM**: 03081230044
**Mata Kuliah**: Pengujian Perangkat Lunak
