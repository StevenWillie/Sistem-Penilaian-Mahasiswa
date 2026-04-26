# 🎉 First Run Guide

Panduan untuk menjalankan proyek pertama kali - Step by step!

---

## ✅ Prerequisites Check

Sebelum mulai, pastikan Anda sudah install:

```bash
# Check Node.js version (harus >= 18.0.0)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

Jika belum install:
- **Node.js**: Download dari [nodejs.org](https://nodejs.org)
- **Git**: Download dari [git-scm.com](https://git-scm.com)

---

## 📥 Step 1: Get the Code

### Option A: Clone dari GitHub (Jika sudah di-push)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa.git

# Masuk ke folder
cd sistem-penilaian-mahasiswa
```

### Option B: Sudah Ada di Local

```bash
# Masuk ke folder proyek
cd sistem-penilaian-mahasiswa
```

---

## 📦 Step 2: Install Dependencies

```bash
# Install semua dependencies
npm install
```

**Expected output:**
```
added 500+ packages in 30s
```

**Jika ada error:**
```bash
# Clear cache dan install ulang
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🧪 Step 3: Run Tests (First Time!)

```bash
# Run all tests
npm test
```

**Expected output:**
```
PASS tests/unit/Student.test.js
PASS tests/unit/GradeCalculation.test.js
PASS tests/unit/GPACalculation.test.js
PASS tests/unit/StudentStatus.test.js
PASS tests/unit/Validation.test.js
PASS tests/unit/StudentService.test.js
PASS tests/unit/DataStore.test.js
PASS tests/unit/TopStudents.test.js
PASS tests/integration/api.test.js
PASS tests/integration/studentFlow.test.js

Test Suites: 10 passed, 10 total
Tests:       42 passed, 42 total
Snapshots:   0 total
Time:        5.234 s

Coverage:
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   85.5  |   78.2   |   90.1  |   86.3  |
--------------------------|---------|----------|---------|---------|
```

**🎉 Congratulations!** Jika semua tests passing, proyek Anda siap!

---

## 🚀 Step 4: Run the Application

```bash
# Start server
npm start
```

**Expected output:**
```
Server running on port 3000
Visit http://localhost:3000 for API documentation
```

**Buka browser:** `http://localhost:3000`

**Expected response:**
```json
{
  "message": "Sistem Penilaian Mahasiswa API",
  "version": "1.0.0",
  "endpoints": {
    "POST /api/students": "Create new student",
    "GET /api/students": "Get all students",
    ...
  }
}
```

---

## 🧪 Step 5: Test the API

### Test 1: Create Student

**Open new terminal** (keep server running)

```bash
# Create a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "1234567890",
    "name": "John Doe",
    "major": "Computer Science"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "nim": "1234567890",
    "name": "John Doe",
    "major": "Computer Science",
    "grades": [],
    "gpa": 0,
    "status": "Kurang"
  }
}
```

### Test 2: Add Grade

```bash
# Add grade to student
curl -X POST http://localhost:3000/api/students/1/grades \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Database Systems",
    "score": 85
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Grade added successfully",
  "data": {
    "id": 1,
    "nim": "1234567890",
    "name": "John Doe",
    "major": "Computer Science",
    "grades": [
      {
        "subject": "Database Systems",
        "score": 85,
        "letterGrade": "A"
      }
    ],
    "gpa": 4.0,
    "status": "Cumlaude"
  }
}
```

### Test 3: Get All Students

```bash
# Get all students
curl http://localhost:3000/api/students
```

### Test 4: Get Top Students

```bash
# Get top 5 students
curl http://localhost:3000/api/students/top?limit=5
```

---

## 📊 Step 6: View Coverage Report

```bash
# Stop server (Ctrl+C)
# Run tests again
npm test

# Open coverage report
# Windows:
start coverage/lcov-report/index.html

# Mac:
open coverage/lcov-report/index.html

# Linux:
xdg-open coverage/lcov-report/index.html
```

**You should see:**
- Interactive HTML coverage report
- Green bars for high coverage
- Red bars for low coverage
- Click files to see line-by-line coverage

---

## 🔍 Step 7: Explore the Code

### Recommended Reading Order:

1. **Start with Models**
   ```bash
   # Open in your editor
   code src/models/Student.js
   ```
   - Understand Student class
   - See GPA calculation
   - See grade conversion

2. **Then Services**
   ```bash
   code src/services/StudentService.js
   ```
   - See business logic
   - See validation

3. **Then Controllers**
   ```bash
   code src/controllers/StudentController.js
   ```
   - See HTTP handling
   - See response formatting

4. **Finally Tests**
   ```bash
   code tests/unit/Student.test.js
   ```
   - See how tests are written
   - Understand test structure

---

## 🎯 Step 8: Make Your First Change

### Exercise: Add a New Test

1. **Open test file:**
   ```bash
   code tests/unit/Student.test.js
   ```

2. **Add new test:**
   ```javascript
   test('should handle multiple grades correctly', () => {
     student.addGrade('Math', 90);
     student.addGrade('Physics', 85);
     student.addGrade('Chemistry', 80);
     
     expect(student.grades).toHaveLength(3);
     expect(student.calculateGPA()).toBeGreaterThan(3.5);
   });
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Verify new test passes!**

---

## 🐛 Troubleshooting

### Issue 1: Port 3000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
PORT=3001 npm start
```

### Issue 2: Tests Failing

**Error:**
```
FAIL tests/unit/Student.test.js
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm test
```

### Issue 3: Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Install dependencies
npm install
```

### Issue 4: Permission Denied

**Error:**
```
EACCES: permission denied
```

**Solution:**
```bash
# Mac/Linux:
sudo chown -R $USER:$USER .

# Windows: Run as Administrator
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Node.js installed (>= 18.0.0)
- [ ] Dependencies installed (node_modules/ exists)
- [ ] All tests passing (42/42)
- [ ] Coverage ≥ 60% (~85%)
- [ ] Server starts successfully
- [ ] API responds correctly
- [ ] Coverage report opens
- [ ] Can create student via API
- [ ] Can add grade via API
- [ ] GPA calculates correctly

---

## 🎓 Next Steps

Now that everything works:

1. **Read Documentation**
   - [README.md](README.md) - Overview
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API details
   - [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing strategies

2. **Setup GitHub**
   - Follow [GITHUB_SETUP.md](GITHUB_SETUP.md)
   - Push code to GitHub
   - Verify CI/CD works

3. **Prepare Submission**
   - Follow [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md)
   - Edit [LAPORAN_PROYEK.md](LAPORAN_PROYEK.md)
   - Generate PDF

4. **Explore & Learn**
   - Read the code
   - Modify tests
   - Add features
   - Improve coverage

---

## 📚 Useful Commands

```bash
# Development
npm start              # Start server
npm run dev            # Start with auto-reload

# Testing
npm test               # Run all tests
npm run test:unit      # Run unit tests only
npm run test:integration  # Run integration tests only
npm run test:watch     # Watch mode

# Code Quality
npm run lint           # (if configured)
npm run format         # (if configured)

# Git
git status             # Check status
git add .              # Stage all changes
git commit -m "msg"    # Commit
git push               # Push to GitHub
```

---

## 🎉 Success!

If you've completed all steps:

✅ Application running  
✅ Tests passing  
✅ API working  
✅ Coverage good  

**You're ready to:**
- Develop features
- Write more tests
- Setup GitHub
- Submit project

---

## 💡 Tips

1. **Keep server running** in one terminal, run tests in another
2. **Use watch mode** during development: `npm run test:watch`
3. **Check coverage** after adding new code
4. **Commit often** with clear messages
5. **Read error messages** carefully - they usually tell you what's wrong

---

## 🆘 Still Having Issues?

1. **Check Node.js version**: `node --version` (must be >= 18)
2. **Clean install**: Delete node_modules and reinstall
3. **Check file paths**: Make sure you're in the right directory
4. **Read error messages**: They usually explain the problem
5. **Check documentation**: Most answers are in the docs

---

## 🎊 Congratulations!

You've successfully:
- ✅ Installed dependencies
- ✅ Run tests (42/42 passing)
- ✅ Started the server
- ✅ Tested the API
- ✅ Viewed coverage report
- ✅ Made your first change

**You're now ready to work on the project!**

---

**Happy Coding! 🚀**

*Need more help? Check [INDEX.md](INDEX.md) for all documentation.*
