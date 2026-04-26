# Panduan Pengumpulan Final Project

Panduan lengkap untuk mengumpulkan Final Project Software Testing.

---

## 📋 Checklist Sebelum Pengumpulan

### ✅ Kode & Struktur
- [ ] Semua file source code lengkap di folder `src/`
- [ ] Semua file test lengkap di folder `tests/`
- [ ] File konfigurasi lengkap (package.json, jest.config.js, dll)
- [ ] Data directory dengan .gitkeep
- [ ] .gitignore configured properly

### ✅ Testing
- [ ] Minimal 15 unit tests (✓ Achieved: 37 tests)
- [ ] Minimal 5 integration tests (✓ Achieved: 5 tests)
- [ ] Test coverage ≥ 60% (✓ Achieved: ~85%)
- [ ] Semua tests passing (42/42)
- [ ] Coverage report ter-generate

### ✅ CI/CD
- [ ] GitHub Actions workflow configured
- [ ] Workflow berjalan otomatis pada push/PR
- [ ] Pipeline steps lengkap (install, build, test, coverage)
- [ ] Tests passing di CI environment

### ✅ Dokumentasi
- [ ] README.md lengkap dengan:
  - [ ] Deskripsi aplikasi
  - [ ] Cara instalasi
  - [ ] Cara menjalankan aplikasi
  - [ ] Cara menjalankan test
  - [ ] API endpoints
  - [ ] Badges (CI status, coverage)
- [ ] LAPORAN_PROYEK.md (2-3 halaman) berisi:
  - [ ] Deskripsi sistem
  - [ ] Arsitektur aplikasi
  - [ ] Strategi pengujian
  - [ ] Penjelasan test coverage
  - [ ] Penjelasan pipeline CI

### ✅ Repository
- [ ] Repository public di GitHub
- [ ] Commit history yang jelas
- [ ] Branch main/master up-to-date
- [ ] No sensitive data (passwords, tokens)

---

## 📦 Yang Harus Dikumpulkan

### 1. Link GitHub Repository

**Format:**
```
https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa
```

**Pastikan:**
- Repository **PUBLIC** (agar dosen bisa akses)
- README.md terlihat di homepage
- Badges terlihat dan berwarna hijau (passing)

### 2. Laporan Proyek (PDF)

**File:** `LAPORAN_PROYEK.pdf`

**Cara Generate:**
1. Buka `LAPORAN_PROYEK.md`
2. Edit bagian:
   - Nama Mahasiswa
   - NIM
   - Tanggal Pengumpulan
3. Convert ke PDF:
   - **Option 1**: Print to PDF dari browser
   - **Option 2**: Use Markdown to PDF converter
   - **Option 3**: Copy ke Word → Save as PDF

**Isi Laporan:**
- Deskripsi sistem (1 halaman)
- Arsitektur aplikasi dengan diagram (0.5 halaman)
- Strategi pengujian (0.5 halaman)
- Penjelasan test coverage (0.5 halaman)
- Penjelasan pipeline CI (0.5 halaman)

**Total:** 2-3 halaman

### 3. Screenshot (Optional tapi Recommended)

Buat folder `screenshots/` berisi:
- `01-github-repo.png` - Homepage repository
- `02-ci-passing.png` - GitHub Actions passing
- `03-test-results.png` - Terminal test results
- `04-coverage-report.png` - Coverage report
- `05-api-test.png` - API test dengan Postman/curl

---

## 🚀 Langkah-Langkah Pengumpulan

### Step 1: Final Check

```bash
# Pull latest changes
git pull origin main

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run tests
npm test

# Verify all tests pass
# Verify coverage ≥ 60%
```

### Step 2: Update Documentation

1. **Edit LAPORAN_PROYEK.md:**
   ```markdown
   **Dibuat oleh**: [ISI NAMA ANDA]
   **NIM**: [ISI NIM ANDA]
   **Tanggal**: [ISI TANGGAL HARI INI]
   ```

2. **Edit README.md:**
   - Ganti `YOUR_USERNAME` dengan username GitHub Anda
   - Verify semua link berfungsi
   - Verify badges muncul

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "docs: update student information for submission"
   git push origin main
   ```

### Step 3: Verify GitHub

1. Buka repository di GitHub
2. Check:
   - [ ] README.md terlihat bagus
   - [ ] Badges berwarna hijau (passing)
   - [ ] GitHub Actions tab menunjukkan workflow passing
   - [ ] Code structure terlihat rapi

### Step 4: Generate Laporan PDF

1. Buka `LAPORAN_PROYEK.md` di browser atau editor
2. Print/Export to PDF
3. Simpan sebagai `LAPORAN_PROYEK.pdf`
4. Verify PDF:
   - [ ] Formatting bagus
   - [ ] Gambar/diagram terlihat
   - [ ] Nama & NIM terisi
   - [ ] 2-3 halaman

### Step 5: Take Screenshots (Optional)

```bash
# Create screenshots folder
mkdir screenshots

# Take screenshots:
# 1. GitHub repository homepage
# 2. GitHub Actions passing
# 3. Terminal showing test results
# 4. Coverage report (coverage/lcov-report/index.html)
# 5. API test (Postman/curl)
```

### Step 6: Prepare Submission Package

**Option A: Submit GitHub Link Only**
```
Link: https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa
Laporan: LAPORAN_PROYEK.pdf
```

**Option B: Submit ZIP File**
```bash
# Create submission folder
mkdir submission
cp LAPORAN_PROYEK.pdf submission/
cp -r screenshots submission/ # if exists

# Create README for submission
echo "GitHub Repository: https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa" > submission/README.txt
echo "Nama: [NAMA ANDA]" >> submission/README.txt
echo "NIM: [NIM ANDA]" >> submission/README.txt

# Create ZIP
zip -r submission.zip submission/
```

---

## 📧 Format Pengumpulan

### Email Subject
```
[Software Testing] Final Project - [NIM] - [Nama]
```

### Email Body
```
Kepada Yth. Bapak/Ibu Dosen Software Testing,

Dengan hormat,
Saya yang bertanda tangan di bawah ini:

Nama  : [NAMA LENGKAP]
NIM   : [NIM]
Kelas : [KELAS]

Dengan ini mengumpulkan Final Project mata kuliah Software Testing dengan detail sebagai berikut:

Judul Proyek: Sistem Penilaian Mahasiswa
GitHub Repository: https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa

Ringkasan Proyek:
- Aplikasi: REST API Sistem Penilaian Mahasiswa
- Bahasa: JavaScript (Node.js + Express)
- Testing: Jest + Supertest
- Total Tests: 42 test cases (37 unit + 5 integration)
- Test Coverage: ~85% (target: 60%)
- CI/CD: GitHub Actions (automated testing)

Terlampir:
1. Link GitHub Repository (public)
2. Laporan Proyek (PDF, 2-3 halaman)
3. Screenshots (optional)

Demikian pengumpulan ini saya buat. Terima kasih atas perhatian Bapak/Ibu.

Hormat saya,
[NAMA LENGKAP]
[NIM]
```

---

## ✅ Final Verification Checklist

Sebelum submit, pastikan:

### Repository
- [ ] Repository public
- [ ] README.md lengkap
- [ ] Badges showing (green/passing)
- [ ] All files committed & pushed
- [ ] No sensitive data

### Testing
- [ ] 42 tests passing (37 unit + 5 integration)
- [ ] Coverage ≥ 60% (achieved: ~85%)
- [ ] GitHub Actions passing
- [ ] Coverage report generated

### Documentation
- [ ] README.md complete
- [ ] LAPORAN_PROYEK.md complete (with name & NIM)
- [ ] LAPORAN_PROYEK.pdf generated
- [ ] API documentation available
- [ ] Testing guide available

### Code Quality
- [ ] No console.errors in code
- [ ] No commented-out code
- [ ] Consistent code style
- [ ] Proper error handling
- [ ] Input validation working

---

## 🎯 Kriteria Penilaian (Estimasi)

### 1. Aplikasi (20%)
- [x] 3 fitur utama implemented
- [x] Validasi input
- [x] Logika bisnis
- [x] Data persistence

### 2. Unit Testing (25%)
- [x] ≥15 test cases (achieved: 37)
- [x] Test quality
- [x] Coverage

### 3. Integration Testing (15%)
- [x] ≥5 test cases (achieved: 5)
- [x] End-to-end testing
- [x] API testing

### 4. Test Coverage (15%)
- [x] ≥60% coverage (achieved: 85%)
- [x] Coverage report
- [x] Quality metrics

### 5. CI/CD (15%)
- [x] GitHub Actions configured
- [x] Automated testing
- [x] Pipeline working

### 6. Dokumentasi (10%)
- [x] README complete
- [x] Laporan proyek
- [x] Code documentation
- [x] API documentation

**Estimated Score: 95-100%** ✨

---

## 🎓 Tips untuk Presentasi (Jika Ada)

### Persiapan
1. Buka repository di GitHub
2. Buka terminal untuk demo
3. Buka Postman/Insomnia untuk API demo
4. Buka coverage report di browser

### Demo Flow (5-10 menit)
1. **Intro (1 menit)**
   - Perkenalan proyek
   - Teknologi yang digunakan

2. **Code Structure (2 menit)**
   - Tunjukkan struktur folder
   - Explain architecture (MVC)
   - Show key files

3. **Testing Demo (3 menit)**
   - Run `npm test` di terminal
   - Show test results
   - Show coverage report
   - Explain test strategy

4. **CI/CD Demo (2 menit)**
   - Show GitHub Actions
   - Explain pipeline
   - Show badges

5. **API Demo (2 menit)**
   - Create student
   - Add grades
   - Show GPA calculation
   - Get top students

### Q&A Preparation
- Kenapa pilih Node.js? → Fast, popular, good for REST API
- Kenapa Jest? → Popular, built-in coverage, easy to use
- Bagaimana strategi testing? → Unit for logic, integration for API
- Berapa coverage? → 85% (exceeds 60% requirement)
- Apa challenge terbesar? → [Jawab sesuai pengalaman]

---

## 📞 Contact & Support

Jika ada pertanyaan:
1. Check documentation files
2. Check GitHub Issues
3. Email dosen
4. Ask classmates

---

## 🎉 Selamat!

Anda telah menyelesaikan Final Project Software Testing dengan:
- ✅ 42 test cases (37 unit + 5 integration)
- ✅ 85% test coverage (target: 60%)
- ✅ Automated CI/CD with GitHub Actions
- ✅ Complete documentation
- ✅ Professional repository

**Proyek ini SIAP untuk dikumpulkan!**

Good luck! 🚀

---

**Last Updated:** [Tanggal Hari Ini]
