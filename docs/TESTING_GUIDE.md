# Testing Guide - Sistem Penilaian Mahasiswa

Panduan lengkap untuk menjalankan dan memahami testing pada proyek ini.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Coverage Reports](#coverage-reports)
- [CI/CD Testing](#cicd-testing)

---

## Prerequisites

Pastikan Anda sudah menginstall:
- Node.js >= 18.0.0
- npm atau yarn
- Dependencies proyek (`npm install`)

---

## Running Tests

### Run All Tests
```bash
npm test
```
Menjalankan semua unit tests dan integration tests dengan coverage report.

### Run Unit Tests Only
```bash
npm run test:unit
```
Menjalankan hanya unit tests (tests/unit/*.test.js).

### Run Integration Tests Only
```bash
npm run test:integration
```
Menjalankan hanya integration tests (tests/integration/*.test.js).

**Note:** Integration tests memerlukan MySQL database yang sudah running. Pastikan:
- XAMPP MySQL sudah dijalankan
- Database `db_mahasiswa` sudah dibuat
- Tables sudah di-setup (jalankan `database/setup.sql`)

### Watch Mode (Development)
```bash
npm run test:watch
```
Menjalankan tests dalam watch mode. Tests akan re-run otomatis saat file berubah.

### Run Specific Test File
```bash
npx jest tests/unit/Student.test.js
```

### Run Tests with Verbose Output
```bash
npx jest --verbose
```

---

## Test Structure

### Directory Structure
```
tests/
├── unit/                          # Unit tests
│   ├── Student.test.js           # Student model tests
│   ├── GradeCalculation.test.js  # Grade calculation logic
│   ├── GPACalculation.test.js    # GPA calculation logic
│   ├── StudentStatus.test.js     # Status determination
│   ├── Validation.test.js        # Input validation
│   ├── StudentService.test.js    # Service layer tests
│   ├── DataStore.test.js         # Data persistence tests
│   └── TopStudents.test.js       # Top students ranking
└── integration/                   # Integration tests
    ├── api.test.js               # API endpoint tests
    └── studentFlow.test.js       # Complete workflow tests
```

### Test File Naming Convention
- Unit tests: `[ComponentName].test.js`
- Integration tests: `[Feature].test.js`
- Test files harus berada di folder `tests/`

---

## Writing Tests

### Unit Test Template

```javascript
const ComponentToTest = require('../../src/path/to/Component');

describe('Component Name - Unit Tests', () => {
  let instance;

  beforeEach(() => {
    // Setup before each test
    instance = new ComponentToTest();
  });

  afterEach(() => {
    // Cleanup after each test
  });

  test('should do something specific', () => {
    // Arrange
    const input = 'test input';
    
    // Act
    const result = instance.method(input);
    
    // Assert
    expect(result).toBe('expected output');
  });

  test('should throw error for invalid input', () => {
    expect(() => {
      instance.method(null);
    }).toThrow('Error message');
  });
});
```

### Integration Test Template

```javascript
const request = require('supertest');
const app = require('../../src/app');

describe('Feature Integration Tests', () => {
  beforeEach(() => {
    // Setup test data
  });

  afterEach(() => {
    // Cleanup test data
  });

  test('should complete workflow successfully', async () => {
    // Step 1: Create resource
    const createRes = await request(app)
      .post('/api/endpoint')
      .send({ data: 'value' });
    
    expect(createRes.status).toBe(201);
    
    // Step 2: Verify resource
    const getRes = await request(app)
      .get(`/api/endpoint/${createRes.body.data.id}`);
    
    expect(getRes.status).toBe(200);
  });
});
```

### Best Practices

1. **Test Naming**
   - Use descriptive test names: `should [expected behavior] when [condition]`
   - Example: `should return 0 GPA when no grades`

2. **Arrange-Act-Assert Pattern**
   ```javascript
   test('should calculate GPA correctly', () => {
     // Arrange: Setup test data
     const student = new Student(1, '1234567890', 'John', 'CS');
     student.addGrade('Math', 85);
     
     // Act: Execute the function
     const gpa = student.calculateGPA();
     
     // Assert: Verify the result
     expect(gpa).toBe(4.0);
   });
   ```

3. **Test Independence**
   - Each test should be independent
   - Use `beforeEach` for setup
   - Use `afterEach` for cleanup

4. **Test One Thing**
   - Each test should verify one specific behavior
   - Don't combine multiple assertions for different behaviors

5. **Use Meaningful Assertions**
   ```javascript
   // Good
   expect(student.grades).toHaveLength(1);
   expect(student.grades[0].score).toBe(85);
   
   // Avoid
   expect(student.grades.length === 1).toBe(true);
   ```

---

## Coverage Reports

### Viewing Coverage

After running `npm test`, coverage report is generated in `coverage/` directory.

### HTML Coverage Report
```bash
npm test
# Open coverage/lcov-report/index.html in browser
```

### Coverage Metrics

**Line Coverage**: Persentase baris kode yang dieksekusi
```
src/models/Student.js: 95.8% (23/24 lines)
```

**Branch Coverage**: Persentase cabang kondisi yang diuji
```
if (score >= 85) return 'A';  // Both true and false tested
```

**Function Coverage**: Persentase fungsi yang dipanggil
```
calculateGPA(): ✓ Tested
getStatus(): ✓ Tested
```

**Statement Coverage**: Persentase statement yang dieksekusi

### Coverage Threshold

Proyek ini memiliki minimum coverage threshold 60%:
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

Test akan **FAIL** jika coverage di bawah threshold.

### Improving Coverage

1. **Identify Uncovered Lines**
   - Buka `coverage/lcov-report/index.html`
   - Klik file yang coverage-nya rendah
   - Lihat baris yang belum ter-cover (merah)

2. **Write Tests for Uncovered Code**
   ```javascript
   // Uncovered error path
   if (!student) {
     throw new Error('Student not found');  // ← Not tested
   }
   
   // Add test
   test('should throw error when student not found', () => {
     expect(() => {
       service.getStudentById(999);
     }).toThrow('Student not found');
   });
   ```

3. **Test Edge Cases**
   - Boundary values (0, 100, -1, 101)
   - Empty inputs
   - Null/undefined
   - Large datasets

---

## CI/CD Testing

### GitHub Actions Workflow

Tests run automatically on:
- Push to main/master/develop branches
- Pull requests to main/master/develop branches

### Workflow Steps
1. Checkout code
2. Setup Node.js (v18, v20)
3. Install dependencies
4. Setup MySQL database (service container)
5. Verify application build
6. Run tests with coverage
7. Upload coverage report

### MySQL in CI Environment

GitHub Actions menggunakan MySQL service container:
- Image: `mysql:8.0`
- Database: `db_mahasiswa`
- User: `root`
- Password: (empty)
- Port: `3306`

Database di-setup otomatis menggunakan `database/setup.sql` sebelum tests dijalankan.

### Viewing CI Results

1. Go to GitHub repository
2. Click "Actions" tab
3. Select workflow run
4. View test results and coverage

### Local CI Simulation

Simulate CI environment locally:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm ci

# Run tests
npm test

# Check exit code
echo $?  # Should be 0 for success
```

---

## Debugging Tests

### Run Single Test
```bash
npx jest -t "should calculate GPA correctly"
```

### Debug with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome.

### Add Debug Logs
```javascript
test('should do something', () => {
  console.log('Debug:', variable);
  expect(variable).toBe(expected);
});
```

### Use `.only` for Focused Testing
```javascript
test.only('focus on this test', () => {
  // Only this test will run
});
```

---

## Common Issues

### Issue: Tests Timeout
```bash
# Increase timeout
jest.setTimeout(10000);
```

### Issue: Async Tests Not Working
```javascript
// Use async/await
test('async test', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});
```

### Issue: Mock Not Working
```javascript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

---

## Test Coverage Goals

| Component          | Current | Target |
|--------------------|---------|--------|
| Models             | 95%     | 95%    |
| Services           | 92%     | 95%    |
| Controllers        | 88%     | 90%    |
| Utils              | 70%     | 80%    |
| **Overall**        | **85%** | **90%** |

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Happy Testing! 🧪**
