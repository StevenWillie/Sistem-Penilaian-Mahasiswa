const Student = require('../../src/models/Student');

describe('Grade Calculation - Unit Tests', () => {
  let student;

  beforeEach(() => {
    student = new Student(1, '1234567890', 'Jane Smith', 'Information Systems');
  });

  test('should calculate letter grade A for score >= 85', () => {
    expect(student.calculateLetterGrade(85)).toBe('A');
    expect(student.calculateLetterGrade(90)).toBe('A');
    expect(student.calculateLetterGrade(100)).toBe('A');
  });

  test('should calculate letter grade B for score 70-84', () => {
    expect(student.calculateLetterGrade(70)).toBe('B');
    expect(student.calculateLetterGrade(75)).toBe('B');
    expect(student.calculateLetterGrade(84)).toBe('B');
  });

  test('should calculate letter grade C for score 60-69', () => {
    expect(student.calculateLetterGrade(60)).toBe('C');
    expect(student.calculateLetterGrade(65)).toBe('C');
    expect(student.calculateLetterGrade(69)).toBe('C');
  });

  test('should calculate letter grade D for score 50-59', () => {
    expect(student.calculateLetterGrade(50)).toBe('D');
    expect(student.calculateLetterGrade(55)).toBe('D');
    expect(student.calculateLetterGrade(59)).toBe('D');
  });

  test('should calculate letter grade E for score < 50', () => {
    expect(student.calculateLetterGrade(0)).toBe('E');
    expect(student.calculateLetterGrade(30)).toBe('E');
    expect(student.calculateLetterGrade(49)).toBe('E');
  });
});
