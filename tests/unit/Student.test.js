const Student = require('../../src/models/Student');

describe('Student Model - Unit Tests', () => {
  let student;

  beforeEach(() => {
    student = new Student(1, '1234567890', 'John Doe', 'Computer Science');
  });

  test('should create a student with correct properties', () => {
    expect(student.id).toBe(1);
    expect(student.nim).toBe('1234567890');
    expect(student.name).toBe('John Doe');
    expect(student.major).toBe('Computer Science');
    expect(student.grades).toEqual([]);
  });

  test('should add grade successfully with valid score', () => {
    student.addGrade('Mathematics', 85);
    expect(student.grades).toHaveLength(1);
    expect(student.grades[0]).toEqual({
      subject: 'Mathematics',
      score: 85,
      letterGrade: 'A'
    });
  });

  test('should throw error when adding grade with invalid score (negative)', () => {
    expect(() => {
      student.addGrade('Mathematics', -10);
    }).toThrow('Score must be between 0 and 100');
  });

  test('should throw error when adding grade with invalid score (over 100)', () => {
    expect(() => {
      student.addGrade('Mathematics', 110);
    }).toThrow('Score must be between 0 and 100');
  });

  test('should throw error when subject is empty', () => {
    expect(() => {
      student.addGrade('', 85);
    }).toThrow('Subject cannot be empty');
  });
