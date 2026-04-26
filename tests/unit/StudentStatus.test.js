const Student = require('../../src/models/Student');

describe('Student Status - Unit Tests', () => {
  let student;

  beforeEach(() => {
    student = new Student(1, '1234567890', 'Test Student', 'Computer Science');
  });

  test('should return "Cumlaude" status for GPA >= 3.5', () => {
    student.addGrade('Subject1', 90); // A = 4.0
    student.addGrade('Subject2', 85); // A = 4.0
    expect(student.getStatus()).toBe('Cumlaude');
  });

  test('should return "Sangat Memuaskan" status for GPA >= 3.0', () => {
    student.addGrade('Subject1', 85); // A = 4.0
    student.addGrade('Subject2', 75); // B = 3.0
    student.addGrade('Subject3', 65); // C = 2.0
    expect(student.getStatus()).toBe('Sangat Memuaskan');
  });

  test('should return "Memuaskan" status for GPA >= 2.5', () => {
    student.addGrade('Subject1', 75); // B = 3.0
    student.addGrade('Subject2', 65); // C = 2.0
    expect(student.getStatus()).toBe('Memuaskan');
  });

  test('should return "Cukup" status for GPA >= 2.0', () => {
    student.addGrade('Subject1', 65); // C = 2.0
    student.addGrade('Subject2', 65); // C = 2.0
    expect(student.getStatus()).toBe('Cukup');
  });

  test('should return "Kurang" status for GPA < 2.0', () => {
    student.addGrade('Subject1', 55); // D = 1.0
    student.addGrade('Subject2', 45); // E = 0.0
    expect(student.getStatus()).toBe('Kurang');
  });
});
