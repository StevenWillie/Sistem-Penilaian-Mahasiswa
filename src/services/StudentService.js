const Student = require('../models/Student');
const DataStore = require('../utils/DataStore');

class StudentService {
  constructor() {
    this.dataStore = new DataStore();
    this.students = this.dataStore.loadStudents();
  }

  validateNIM(nim) {
    if (!nim || typeof nim !== 'string') {
      return false;
    }
    // NIM harus 10 digit angka
    return /^\d{10}$/.test(nim);
  }

  validateName(name) {
    if (!name || typeof name !== 'string') {
      return false;
    }
    return name.trim().length >= 3;
  }

  createStudent(nim, name, major) {
    if (!this.validateNIM(nim)) {
      throw new Error('NIM must be 10 digits');
    }

    if (!this.validateName(name)) {
      throw new Error('Name must be at least 3 characters');
    }

    if (!major || major.trim() === '') {
      throw new Error('Major cannot be empty');
    }

    // Check duplicate NIM
    if (this.students.find(s => s.nim === nim)) {
      throw new Error('NIM already exists');
    }

    const id = this.students.length > 0 
      ? Math.max(...this.students.map(s => s.id)) + 1 
      : 1;

    const student = new Student(id, nim, name, major);
    this.students.push(student);
    this.dataStore.saveStudents(this.students);
    
    return student;
  }

  getStudentById(id) {
    const student = this.students.find(s => s.id === id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  getStudentByNIM(nim) {
    const student = this.students.find(s => s.nim === nim);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  getAllStudents() {
    return this.students;
  }

  addGradeToStudent(id, subject, score) {
    const student = this.getStudentById(id);
    student.addGrade(subject, score);
    this.dataStore.saveStudents(this.students);
    return student;
  }

  deleteStudent(id) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    
    this.students.splice(index, 1);
    this.dataStore.saveStudents(this.students);
    return true;
  }

  getTopStudents(limit = 5) {
    return [...this.students]
      .sort((a, b) => b.calculateGPA() - a.calculateGPA())
      .slice(0, limit);
  }

  getStudentsByMajor(major) {
    return this.students.filter(s => 
      s.major.toLowerCase() === major.toLowerCase()
    );
  }
}

module.exports = StudentService;
