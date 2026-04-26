# Quick Start Guide - Sistem Penilaian Mahasiswa

Panduan cepat untuk memulai proyek ini dalam 5 menit!

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm atau yarn
- Git

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa.git
cd sistem-penilaian-mahasiswa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment (Optional)
```bash
cp .env.example .env
# Edit .env jika perlu
```

## ▶️ Running the Application

### Start Server
```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

### Development Mode (with auto-reload)
```bash
npm run dev
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 📝 Quick API Test

### 1. Test API Info
```bash
curl http://localhost:3000
```

### 2. Create a Student
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "1234567890",
    "name": "John Doe",
    "major": "Computer Science"
  }'
```

### 3. Add Grade
```bash
curl -X POST http://localhost:3000/api/students/1/grades \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Database",
    "score": 85
  }'
```

### 4. Get All Students
```bash
curl http://localhost:3000/api/students
```

### 5. Get Top Students
```bash
curl http://localhost:3000/api/students/top?limit=5
```

## 📊 View Test Coverage

After running `npm test`:
```bash
# Open coverage report in browser
open coverage/lcov-report/index.html
# or on Windows
start coverage/lcov-report/index.html
```

## 🔧 Common Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server |
| `npm test` | Run all tests with coverage |
| `npm run test:unit` | Run unit tests only |
| `npm run test:integration` | Run integration tests only |
| `npm run test:watch` | Run tests in watch mode |

## 📚 Documentation

- [README.md](README.md) - Overview & API endpoints
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Detailed API docs
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing guide
- [LAPORAN_PROYEK.md](LAPORAN_PROYEK.md) - Project report
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## 🎯 Project Structure

```
sistem-penilaian-mahasiswa/
├── src/                    # Source code
│   ├── controllers/        # Request handlers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utilities
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── data/                  # Data storage
└── .github/workflows/     # CI/CD configuration
```

## ✅ Verify Installation

Run this command to verify everything is working:
```bash
npm test
```

You should see:
- ✓ All tests passing
- Coverage report > 60%
- No errors

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or use:
PORT=3001 npm start
```

### Tests Failing
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm test
```

### Permission Errors
```bash
# On Linux/Mac
sudo chown -R $USER:$USER .
```

## 🎓 Next Steps

1. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
2. ✅ Read [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing strategies
3. ✅ Try creating students and adding grades via API
4. ✅ Run tests and check coverage report
5. ✅ Read [LAPORAN_PROYEK.md](LAPORAN_PROYEK.md) for project report

## 💡 Tips

- Use Postman or Insomnia for easier API testing
- Check `coverage/lcov-report/index.html` for detailed coverage
- Run `npm run test:watch` during development
- Read the test files to understand how the system works

## 🤝 Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Read [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing help
- Open an issue on GitHub

---

**Happy Coding! 🚀**
