const Student = require('../models/Student');
const MySQLStore = require('../utils/MySQLStore');

class StudentService {
  constructor() {
    this.dataStore = new MySQLStore();
    this.students = [];
  }

  async initialize() {
    this.students = await this.dataStore.loadStudents();
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

  async createStudent(nim, name, major) {
    if (!this.validateNIM(nim)) {
      throw new Error('NIM must be 10 digits');
    }

    if (!this.validateName(name)) {
      throw new Error('Name must be at least 3 characters');
    }

    if (!major || major.trim() === '') {
      throw new Error('Major cannot be empty');
    }

    const student = new Student(null, nim, name, major);
    const savedStudent = await this.dataStore.saveStudent(student);
    
    await this.initialize(); // Reload students
    
    return savedStudent;
  }

  async getStudentById(id) {
    const student = await this.dataStore.getStudentById(id);
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

  async getAllStudents() {
    await this.initialize();
    return this.students;
  }

  async addGradeToStudent(id, subject, score) {
    const student = await this.getStudentById(id);
    student.addGrade(subject, score);
    
    // Save grade to database
    const grade = student.grades[student.grades.length - 1];
    await this.dataStore.addGrade(id, subject, score, grade.letterGrade);
    
    return student;
  }

  async deleteStudent(id) {
    const student = await this.getStudentById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    
    await this.dataStore.deleteStudent(id);
    await this.initialize(); // Reload students
    return true;
  }

  async getTopStudents(limit = 5) {
    await this.initialize();
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
