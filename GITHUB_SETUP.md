# GitHub Setup Guide

Panduan lengkap untuk setup repository GitHub dan CI/CD untuk proyek ini.

## 📋 Prerequisites

- Akun GitHub
- Git terinstall di komputer
- Proyek sudah ada di local

---

## 🚀 Step 1: Create GitHub Repository

### Via GitHub Website

1. Login ke GitHub
2. Klik tombol **"+"** di pojok kanan atas → **"New repository"**
3. Isi form:
   - **Repository name**: `sistem-penilaian-mahasiswa`
   - **Description**: `Sistem Penilaian Mahasiswa - Final Project Pengujian Perangkat Lunak`
   - **Visibility**: Public (agar badge CI/CD bisa terlihat)
   - **JANGAN** centang "Initialize with README" (karena sudah ada)
4. Klik **"Create repository"**

---

## 📤 Step 2: Push Code ke GitHub

### Initialize Git (jika belum)

```bash
cd sistem-penilaian-mahasiswa
git init
```

### Add Remote Repository

```bash
# Ganti YOUR_USERNAME dengan username GitHub Anda
git remote add origin https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa.git
```

### Commit & Push

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Sistem Penilaian Mahasiswa with automated testing"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ⚙️ Step 3: Verify GitHub Actions

### Check Workflow Status

1. Buka repository di GitHub
2. Klik tab **"Actions"**
3. Anda akan melihat workflow **"CI - Build and Test"** sedang berjalan
4. Klik workflow untuk melihat detail

### Workflow akan:
- ✅ Install dependencies
- ✅ Run all tests
- ✅ Generate coverage report
- ✅ Test pada Node.js 18.x dan 20.x

### Jika Workflow Gagal:
- Klik workflow yang gagal
- Lihat log error
- Fix error di local
- Commit & push lagi

---

## 🏷️ Step 4: Add Badges to README

### Update README.md

Ganti `YOUR_USERNAME` dengan username GitHub Anda di bagian badges:

```markdown
![CI Status](https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

### Commit Changes

```bash
git add README.md
git commit -m "docs: update GitHub username in badges"
git push
```

---

## 📊 Step 5: Setup Codecov (Optional)

Untuk badge coverage yang real-time:

### 1. Sign Up Codecov

1. Buka [codecov.io](https://codecov.io)
2. Login dengan GitHub
3. Authorize Codecov

### 2. Add Repository

1. Pilih repository `sistem-penilaian-mahasiswa`
2. Copy **CODECOV_TOKEN**

### 3. Add Secret to GitHub

1. Buka repository di GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Klik **"New repository secret"**
4. Name: `CODECOV_TOKEN`
5. Value: Paste token dari Codecov
6. Klik **"Add secret"**

### 4. Update Badge

Tambahkan badge Codecov di README.md:

```markdown
![Coverage](https://codecov.io/gh/YOUR_USERNAME/sistem-penilaian-mahasiswa/branch/main/graph/badge.svg)
```

---

## 🔒 Step 6: Branch Protection (Optional)

Untuk memastikan semua PR harus pass tests:

### Setup Branch Protection

1. **Settings** → **Branches**
2. Klik **"Add rule"**
3. Branch name pattern: `main`
4. Centang:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Status checks: Pilih "test (18.x)" dan "test (20.x)"
5. Klik **"Create"**

Sekarang semua PR harus pass tests sebelum bisa di-merge!

---

## 📝 Step 7: Create First Pull Request

### Create Feature Branch

```bash
git checkout -b feature/add-documentation
```

### Make Changes

```bash
# Edit some files
git add .
git commit -m "docs: improve documentation"
```

### Push Branch

```bash
git push -u origin feature/add-documentation
```

### Create PR

1. Buka repository di GitHub
2. Klik **"Compare & pull request"**
3. Isi description
4. Klik **"Create pull request"**
5. Wait for CI to run
6. Jika pass, merge PR

---

## 🎯 Step 8: Verify Everything Works

### Checklist

- [ ] Repository created di GitHub
- [ ] Code ter-push ke GitHub
- [ ] GitHub Actions workflow berjalan
- [ ] All tests passing
- [ ] Badges muncul di README
- [ ] Coverage report ter-generate
- [ ] Branch protection active (optional)

### Test CI/CD

```bash
# Make a small change
echo "# Test CI" >> test.txt
git add test.txt
git commit -m "test: verify CI/CD"
git push

# Check GitHub Actions tab
# Workflow should run automatically
```

---

## 🔧 Troubleshooting

### Issue: Workflow Not Running

**Solution:**
1. Check `.github/workflows/ci.yml` exists
2. Verify file syntax (YAML)
3. Check branch name in workflow (main vs master)

### Issue: Tests Failing in CI but Pass Locally

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm ci
npm test
```

### Issue: Permission Denied

**Solution:**
```bash
# Setup SSH key or use Personal Access Token
# https://docs.github.com/en/authentication
```

### Issue: Badge Not Showing

**Solution:**
1. Verify repository is public
2. Check username in badge URL
3. Wait a few minutes for GitHub to update
4. Hard refresh browser (Ctrl+F5)

---

## 📚 Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Pull latest changes
git pull origin main

# View remote
git remote -v

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- .
```

---

## 🎓 Best Practices

### Commit Messages

Format: `type(scope): subject`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code refactoring
- `style`: Formatting
- `chore`: Maintenance

**Examples:**
```bash
git commit -m "feat(api): add endpoint to filter students by major"
git commit -m "fix(validation): fix NIM validation regex"
git commit -m "docs(readme): update API documentation"
git commit -m "test(unit): add tests for GPA calculation"
```

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/doc-name` - Documentation
- `test/test-name` - Tests

### Pull Request

1. Create descriptive PR title
2. Add description explaining changes
3. Link related issues
4. Wait for CI to pass
5. Request review (if team project)
6. Merge after approval

---

## 🔗 Useful Links

- [GitHub Docs](https://docs.github.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Codecov Docs](https://docs.codecov.com)

---

## ✅ Final Checklist

Sebelum submit proyek, pastikan:

- [ ] Repository public di GitHub
- [ ] README.md lengkap dengan badges
- [ ] GitHub Actions workflow berjalan
- [ ] All tests passing (42/42)
- [ ] Coverage ≥ 60% (target: 85%)
- [ ] Commit history clean & descriptive
- [ ] Documentation lengkap
- [ ] LAPORAN_PROYEK.md sudah diisi

---

## 🎉 Congratulations!

Repository GitHub Anda sudah siap dengan:
- ✅ Automated testing
- ✅ CI/CD pipeline
- ✅ Coverage reporting
- ✅ Professional badges
- ✅ Clean commit history

**Proyek siap untuk dikumpulkan!**

---

**Need Help?**
- Check GitHub Actions logs for errors
- Read error messages carefully
- Google the error message
- Ask on GitHub Discussions
