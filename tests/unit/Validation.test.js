const StudentService = require('../../src/services/StudentService');
const Student = require('../../src/models/Student');

describe('Validation - Unit Tests', () => {
  let service;

  beforeEach(() => {
    service = new StudentService();
    service.students = [];
  });

  describe('NIM Validation', () => {
    test('should validate correct NIM format (10 digits)', () => {
      expect(service.validateNIM('1234567890')).toBe(true);
    });

    test('should reject NIM with less than 10 digits', () => {
      expect(service.validateNIM('123456789')).toBe(false);
    });

    test('should reject NIM with more than 10 digits', () => {
      expect(service.validateNIM('12345678901')).toBe(false);
    });

    test('should reject NIM with non-numeric characters', () => {
      expect(service.validateNIM('123456789A')).toBe(false);
    });

    test('should reject empty NIM', () => {
      expect(service.validateNIM('')).toBe(false);
    });
  });

  describe('Name Validation', () => {
    test('should validate name with at least 3 characters', () => {
      expect(service.validateName('John')).toBe(true);
    });

    test('should reject name with less than 3 characters', () => {
      expect(service.validateName('Jo')).toBe(false);
    });

    test('should reject empty name', () => {
      expect(service.validateName('')).toBe(false);
    });
  });

  describe('Score Validation', () => {
    test('should validate score between 0 and 100', () => {
      const student = new Student(1, '1234567890', 'Test', 'CS');
      expect(student.validateScore(0)).toBe(true);
      expect(student.validateScore(50)).toBe(true);
      expect(student.validateScore(100)).toBe(true);
    });

    test('should reject score outside valid range', () => {
      const student = new Student(1, '1234567890', 'Test', 'CS');
      expect(student.validateScore(-1)).toBe(false);
      expect(student.validateScore(101)).toBe(false);
    });
  });
});
