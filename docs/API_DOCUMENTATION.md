# API Documentation - Sistem Penilaian Mahasiswa

Base URL: `http://localhost:3000`

## Table of Contents
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Authentication
Saat ini API tidak memerlukan authentication. Untuk production, disarankan menambahkan JWT atau API Key.

## Endpoints

### 1. Get API Information
Mendapatkan informasi tentang API dan daftar endpoint yang tersedia.

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Sistem Penilaian Mahasiswa API",
  "version": "1.0.0",
  "endpoints": {
    "POST /api/students": "Create new student",
    "GET /api/students": "Get all students",
    "GET /api/students/:id": "Get student by ID",
    "GET /api/students/top": "Get top students",
    "POST /api/students/:id/grades": "Add grade to student",
    "DELETE /api/students/:id": "Delete student"
  }
}
```

---

### 2. Create Student
Membuat data mahasiswa baru.

**Endpoint:** `POST /api/students`

**Request Body:**
```json
{
  "nim": "1234567890",
  "name": "John Doe",
  "major": "Computer Science"
}
```

**Validation Rules:**
- `nim`: Harus 10 digit angka, tidak boleh duplikat
- `name`: Minimal 3 karakter
- `major`: Tidak boleh kosong

**Success Response (201):**
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

**Error Response (400):**
```json
{
  "success": false,
  "message": "NIM must be 10 digits"
}
```

---

### 3. Get All Students
Mendapatkan daftar semua mahasiswa.

**Endpoint:** `GET /api/students`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
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
  ]
}
```

---

### 4. Get Student by ID
Mendapatkan detail mahasiswa berdasarkan ID.

**Endpoint:** `GET /api/students/:id`

**Parameters:**
- `id` (path parameter): ID mahasiswa

**Success Response (200):**
```json
{
  "success": true,
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

**Error Response (404):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

### 5. Add Grade to Student
Menambahkan nilai mata kuliah untuk mahasiswa.

**Endpoint:** `POST /api/students/:id/grades`

**Parameters:**
- `id` (path parameter): ID mahasiswa

**Request Body:**
```json
{
  "subject": "Database Systems",
  "score": 85
}
```

**Validation Rules:**
- `subject`: Tidak boleh kosong
- `score`: Harus angka antara 0-100

**Success Response (200):**
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

**Error Response (400):**
```json
{
  "success": false,
  "message": "Score must be between 0 and 100"
}
```

---

### 6. Get Top Students
Mendapatkan daftar mahasiswa dengan GPA tertinggi.

**Endpoint:** `GET /api/students/top`

**Query Parameters:**
- `limit` (optional): Jumlah mahasiswa yang ditampilkan (default: 5)

**Example:** `GET /api/students/top?limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nim": "1234567890",
      "name": "Alice Johnson",
      "major": "Computer Science",
      "grades": [...],
      "gpa": 4.0,
      "status": "Cumlaude"
    },
    {
      "id": 2,
      "nim": "0987654321",
      "name": "Bob Smith",
      "major": "Information Systems",
      "grades": [...],
      "gpa": 3.8,
      "status": "Cumlaude"
    }
  ]
}
```

---

### 7. Delete Student
Menghapus data mahasiswa.

**Endpoint:** `DELETE /api/students/:id`

**Parameters:**
- `id` (path parameter): ID mahasiswa

**Success Response (200):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## Error Handling

### Error Response Format
Semua error response mengikuti format:
```json
{
  "success": false,
  "message": "Error message description"
}
```

### HTTP Status Codes
- `200 OK`: Request berhasil
- `201 Created`: Resource berhasil dibuat
- `400 Bad Request`: Validasi error atau bad input
- `404 Not Found`: Resource tidak ditemukan
- `500 Internal Server Error`: Server error

---

## Examples

### Example 1: Complete Student Workflow

```bash
# 1. Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "1234567890",
    "name": "John Doe",
    "major": "Computer Science"
  }'

# 2. Add grades
curl -X POST http://localhost:3000/api/students/1/grades \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Database",
    "score": 90
  }'

curl -X POST http://localhost:3000/api/students/1/grades \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Programming",
    "score": 85
  }'

# 3. Get student details
curl http://localhost:3000/api/students/1

# 4. Get top students
curl http://localhost:3000/api/students/top?limit=5
```

### Example 2: Using JavaScript Fetch

```javascript
// Create student
const createStudent = async () => {
  const response = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nim: '1234567890',
      name: 'John Doe',
      major: 'Computer Science'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Add grade
const addGrade = async (studentId) => {
  const response = await fetch(`http://localhost:3000/api/students/${studentId}/grades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: 'Database',
      score: 85
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Get all students
const getAllStudents = async () => {
  const response = await fetch('http://localhost:3000/api/students');
  const data = await response.json();
  console.log(data);
};
```

---

## Grading System

### Letter Grade Conversion
| Score Range | Letter Grade | GPA Points |
|-------------|--------------|------------|
| 85 - 100    | A            | 4.0        |
| 70 - 84     | B            | 3.0        |
| 60 - 69     | C            | 2.0        |
| 50 - 59     | D            | 1.0        |
| 0 - 49      | E            | 0.0        |

### Student Status
| GPA Range   | Status              |
|-------------|---------------------|
| ≥ 3.5       | Cumlaude            |
| ≥ 3.0       | Sangat Memuaskan    |
| ≥ 2.5       | Memuaskan           |
| ≥ 2.0       | Cukup               |
| < 2.0       | Kurang              |

---

## Rate Limiting
Saat ini tidak ada rate limiting. Untuk production, disarankan menambahkan rate limiting middleware.

## CORS
CORS belum dikonfigurasi. Untuk frontend integration, tambahkan CORS middleware.

## Future Improvements
- Authentication & Authorization
- Rate limiting
- CORS configuration
- Pagination untuk GET /api/students
- Search & filter functionality
- Export data to CSV/PDF
- Email notifications
