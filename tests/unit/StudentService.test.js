const StudentService = require('../../src/services/StudentService');

describe('StudentService - Unit Tests', () => {
  let service;

  beforeEach(() => {
    service = new StudentService();
    service.students = [];
  });

  test('should create student successfully with valid data', () => {
    const student = service.createStudent('1234567890', 'John Doe', 'Computer Science');
    expect(student.nim).toBe('1234567890');
    expect(student.name).toBe('John Doe');
    expect(student.major).toBe('Computer Science');
  });

  test('should throw error when creating student with invalid NIM', () => {
    expect(() => {
      service.createStudent('123', 'John Doe', 'Computer Science');
    }).toThrow('NIM must be 10 digits');
  });

  test('should throw error when creating student with short name', () => {
    expect(() => {
      service.createStudent('1234567890', 'Jo', 'Computer Science');
    }).toThrow('Name must be at least 3 characters');
  });

  test('should throw error when creating student with empty major', () => {
    expect(() => {
      service.createStudent('1234567890', 'John Doe', '');
    }).toThrow('Major cannot be empty');
  });

  test('should throw error when creating student with duplicate NIM', () => {
    service.createStudent('1234567890', 'John Doe', 'Computer Science');
    expect(() => {
      service.createStudent('1234567890', 'Jane Smith', 'Information Systems');
    }).toThrow('NIM already exists');
  });

  test('should get student by ID successfully', () => {
    const created = service.createStudent('1234567890', 'John Doe', 'CS');
    const found = service.getStudentById(created.id);
    expect(found.nim).toBe('1234567890');
  });

  test('should throw error when getting non-existent student', () => {
    expect(() => {
      service.getStudentById(999);
    }).toThrow('Student not found');
  });
});
