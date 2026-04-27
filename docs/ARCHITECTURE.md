# Architecture Documentation

Dokumentasi arsitektur lengkap Sistem Penilaian Mahasiswa.

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (HTTP)                        │
│              (Browser, Postman, curl)                   │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  EXPRESS.JS SERVER                      │
│                   (Port 3000)                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   ROUTES LAYER                          │
│         (API Endpoint Definitions)                      │
│  POST /api/students                                     │
│  GET  /api/students                                     │
│  GET  /api/students/:id                                 │
│  POST /api/students/:id/grades                          │
│  GET  /api/students/top                                 │
│  DELETE /api/students/:id                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                CONTROLLER LAYER                         │
│           (Request/Response Handling)                   │
│  - StudentController                                    │
│    • createStudent()                                    │
│    • getAllStudents()                                   │
│    • getStudentById()                                   │
│    • addGrade()                                         │
│    • deleteStudent()                                    │
│    • getTopStudents()                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 SERVICE LAYER                           │
│            (Business Logic & Validation)                │
│  - StudentService                                       │
│    • validateNIM()                                      │
│    • validateName()                                     │
│    • createStudent()                                    │
│    • getStudentById()                                   │
│    • addGradeToStudent()                                │
│    • deleteStudent()                                    │
│    • getTopStudents()                                   │
│    • getStudentsByMajor()                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   MODEL LAYER                           │
│          (Data Representation & Calculation)            │
│  - Student                                              │
│    • addGrade()                                         │
│    • validateScore()                                    │
│    • calculateLetterGrade()                             │
│    • calculateGPA()                                     │
│    • getStatus()                                        │
│    • toJSON()                                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 DATASTORE LAYER                         │
│              (Data Persistence)                         │
│  - DataStore                                            │
│    • loadStudents()                                     │
│    • saveStudents()                                     │
│    • clearData()                                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  JSON FILE STORAGE                      │
│              (data/students.json)                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### Create Student Flow

```
Client
  │
  │ POST /api/students
  │ { nim, name, major }
  ▼
Routes
  │
  ▼
StudentController.createStudent()
  │
  │ Extract request body
  │ Call service
  ▼
StudentService.createStudent()
  │
  ├─► validateNIM(nim)
  │   └─► Check format (10 digits)
  │
  ├─► validateName(name)
  │   └─► Check length (≥3 chars)
  │
  ├─► Check duplicate NIM
  │
  ├─► Create Student instance
  │   │
  │   ▼
  │   Student Model
  │   └─► new Student(id, nim, name, major)
  │
  ├─► Add to students array
  │
  ▼
DataStore.saveStudents()
  │
  ├─► Convert to JSON
  ├─► Write to file
  │
  ▼
Return Student Object
  │
  ▼
Controller formats response
  │
  ▼
Client receives JSON response
```

### Add Grade Flow

```
Client
  │
  │ POST /api/students/:id/grades
  │ { subject, score }
  ▼
Routes
  │
  ▼
StudentController.addGrade()
  │
  ▼
StudentService.addGradeToStudent()
  │
  ├─► getStudentById(id)
  │   └─► Find student or throw error
  │
  ▼
Student.addGrade(subject, score)
  │
  ├─► validateScore(score)
  │   └─► Check 0-100 range
  │
  ├─► calculateLetterGrade(score)
  │   └─► Determine A/B/C/D/E
  │
  ├─► Add to grades array
  │
  ▼
DataStore.saveStudents()
  │
  ▼
Return Updated Student
  │
  ├─► calculateGPA()
  │   └─► Average of all grades
  │
  ├─► getStatus()
  │   └─► Based on GPA
  │
  ▼
Client receives updated student with GPA
```

---

## 🧩 Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION                          │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   Routes     │  │ Controllers  │  │  Services   │  │
│  │              │─▶│              │─▶│             │  │
│  │ - Student    │  │ - Student    │  │ - Student   │  │
│  │   Routes     │  │   Controller │  │   Service   │  │
│  └──────────────┘  └──────────────┘  └──────┬──────┘  │
│                                              │         │
│  ┌──────────────┐  ┌──────────────┐         │         │
│  │   Models     │  │   Utils      │         │         │
│  │              │◀─│              │◀────────┘         │
│  │ - Student    │  │ - DataStore  │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Request-Response Cycle

### Example: Create Student & Add Grade

```
1. CLIENT REQUEST
   POST /api/students
   {
     "nim": "1234567890",
     "name": "John Doe",
     "major": "Computer Science"
   }

2. ROUTE MATCHING
   POST /api/students → StudentController.createStudent()

3. CONTROLLER PROCESSING
   - Extract body: { nim, name, major }
   - Call: studentService.createStudent(nim, name, major)

4. SERVICE VALIDATION
   - validateNIM("1234567890") → ✓ Valid
   - validateName("John Doe") → ✓ Valid
   - Check duplicate → ✓ Not exists

5. MODEL CREATION
   - new Student(1, "1234567890", "John Doe", "CS")
   - grades: []
   - gpa: 0

6. DATA PERSISTENCE
   - DataStore.saveStudents([student])
   - Write to data/students.json

7. RESPONSE
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

8. ADD GRADE
   POST /api/students/1/grades
   {
     "subject": "Database",
     "score": 85
   }

9. GRADE PROCESSING
   - Find student by ID: 1
   - Validate score: 85 → ✓ Valid (0-100)
   - Calculate letter grade: 85 → "A"
   - Add to grades array
   - Calculate GPA: 4.0
   - Determine status: "Cumlaude"

10. FINAL RESPONSE
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
            "subject": "Database",
            "score": 85,
            "letterGrade": "A"
          }
        ],
        "gpa": 4.0,
        "status": "Cumlaude"
      }
    }
```

---

## 🗂️ File Structure & Responsibilities

```
src/
├── app.js                          # Express app configuration
│   └── Responsibilities:
│       - Setup middleware
│       - Register routes
│       - Error handling
│
├── index.js                        # Server entry point
│   └── Responsibilities:
│       - Start server
│       - Listen on port
│
├── controllers/
│   └── StudentController.js        # HTTP request handlers
│       └── Responsibilities:
│           - Parse request body
│           - Call service methods
│           - Format responses
│           - Handle HTTP errors
│
├── models/
│   └── Student.js                  # Student entity
│       └── Responsibilities:
│           - Data representation
│           - Grade calculations
│           - GPA calculations
│           - Status determination
│           - Data validation
│
├── routes/
│   └── studentRoutes.js            # API route definitions
│       └── Responsibilities:
│           - Define endpoints
│           - Map to controllers
│           - HTTP method routing
│
├── services/
│   └── StudentService.js           # Business logic
│       └── Responsibilities:
│           - Input validation
│           - Business rules
│           - CRUD operations
│           - Data orchestration
│
└── utils/
    └── DataStore.js                # Data persistence
        └── Responsibilities:
            - File I/O operations
            - JSON serialization
            - Data loading/saving
```

---

## 🧪 Testing Architecture

```
tests/
├── unit/                           # Unit Tests (37 tests)
│   ├── Student.test.js            # Model tests
│   │   └── Test: Object creation, validation
│   │
│   ├── GradeCalculation.test.js   # Grade logic tests
│   │   └── Test: Letter grade conversion
│   │
│   ├── GPACalculation.test.js     # GPA logic tests
│   │   └── Test: GPA calculation accuracy
│   │
│   ├── StudentStatus.test.js      # Status logic tests
│   │   └── Test: Status determination
│   │
│   ├── Validation.test.js         # Validation tests
│   │   └── Test: NIM, name, score validation
│   │
│   ├── StudentService.test.js     # Service tests
│   │   └── Test: Business logic, CRUD
│   │
│   ├── DataStore.test.js          # Persistence tests
│   │   └── Test: File operations
│   │
│   └── TopStudents.test.js        # Ranking tests
│       └── Test: Sorting, filtering
│
└── integration/                    # Integration Tests (5 tests)
    ├── api.test.js                # API endpoint tests
    │   └── Test: HTTP requests/responses
    │
    └── studentFlow.test.js        # Workflow tests
        └── Test: Complete user flows
```

---

## 🔐 Security Considerations

### Current Implementation
- ✅ Input validation (NIM, name, score)
- ✅ Error handling
- ✅ No SQL injection (using JSON file)

### Future Improvements
- 🔲 Authentication (JWT)
- 🔲 Authorization (role-based)
- 🔲 Rate limiting
- 🔲 CORS configuration
- 🔲 Input sanitization
- 🔲 HTTPS enforcement

---

## 📈 Scalability Considerations

### Current Limitations
- File-based storage (not suitable for large data)
- No caching
- Single server instance
- Synchronous file I/O

### Scalability Improvements
1. **Database**: Replace JSON with MongoDB/PostgreSQL
2. **Caching**: Add Redis for frequently accessed data
3. **Load Balancing**: Multiple server instances
4. **Async I/O**: Use async file operations
5. **Pagination**: Add pagination for large datasets
6. **Indexing**: Add database indexes for faster queries

---

## 🎯 Design Patterns Used

### 1. MVC Pattern
- **Model**: Student.js (data & logic)
- **View**: JSON responses
- **Controller**: StudentController.js (request handling)

### 2. Service Layer Pattern
- Separates business logic from controllers
- Reusable across different controllers

### 3. Repository Pattern
- DataStore.js abstracts data access
- Easy to switch storage mechanisms

### 4. Dependency Injection
- Controllers receive service instances
- Services receive datastore instances

---

## 🔄 CI/CD Pipeline Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DEVELOPER                            │
│                                                         │
│  1. Write Code                                          │
│  2. Write Tests                                         │
│  3. Commit & Push                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   GITHUB                                │
│                                                         │
│  - Receive push/PR                                      │
│  - Trigger GitHub Actions                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              GITHUB ACTIONS WORKFLOW                    │
│                                                         │
│  Step 1: Checkout Code                                  │
│  Step 2: Setup Node.js (18.x, 20.x)                     │
│  Step 3: Install Dependencies (npm ci)                  │
│  Step 4: Run Tests (npm test)                           │
│  Step 5: Generate Coverage Report                       │
│  Step 6: Upload Coverage to Codecov                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  TEST RESULTS                           │
│                                                         │
│  ✓ All tests passing (42/42)                            │
│  ✓ Coverage ≥ 60% (85%)                                 │
│  ✓ Build successful                                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   BADGES UPDATE                         │
│                                                         │
│  - CI Status: Passing ✓                                 │
│  - Coverage: 85% ✓                                      │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Performance Metrics

### Response Times (Estimated)
- GET /api/students: ~10ms
- POST /api/students: ~15ms
- POST /api/students/:id/grades: ~12ms
- GET /api/students/top: ~20ms

### Test Execution
- Unit tests: ~2 seconds
- Integration tests: ~3 seconds
- Total test time: ~5 seconds

### Coverage
- Line coverage: 85%+
- Branch coverage: 78%+
- Function coverage: 90%+

---

## 🎓 Learning Outcomes

### Architecture Skills
✅ Layered architecture design
✅ Separation of concerns
✅ MVC pattern implementation
✅ RESTful API design

### Testing Skills
✅ Unit testing strategies
✅ Integration testing
✅ Test coverage analysis
✅ CI/CD pipeline setup

### Development Skills
✅ Node.js & Express.js
✅ Jest testing framework
✅ GitHub Actions
✅ Git workflow

---

**Architecture designed for maintainability, testability, and scalability.**
