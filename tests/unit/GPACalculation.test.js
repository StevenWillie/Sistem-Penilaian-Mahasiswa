const Student = require('../../src/models/Student');

describe('GPA Calculation - Unit Tests', () => {
  let student;

  beforeEach(() => {
    student = new Student(1, '1234567890', 'Alice Johnson', 'Software Engineering');
  });

  test('should return 0 GPA when no grades', () => {
    expect(student.calculateGPA()).toBe(0);
  });

  test('should calculate GPA correctly with single grade', () => {
    student.addGrade('Database', 85); // A = 4.0
    expect(student.calculateGPA()).toBe(4.0);
  });

  test('should calculate GPA correctly with multiple grades', () => {
    student.addGrade('Database', 85); // A = 4.0
    student.addGrade('Programming', 75); // B = 3.0
    student.addGrade('Networking', 65); // C = 2.0
    // (4.0 + 3.0 + 2.0) / 3 = 3.0
    expect(student.calculateGPA()).toBe(3.0);
  });

  test('should calculate GPA with decimal precision', () => {
    student.addGrade('Math', 90); // A = 4.0
    student.addGrade('Physics', 75); // B = 3.0
    // (4.0 + 3.0) / 2 = 3.5
    expect(student.calculateGPA()).toBe(3.5);
  });

  test('should round GPA to 2 decimal places', () => {
    student.addGrade('Subject1', 85); // A = 4.0
    student.addGrade('Subject2', 75); // B = 3.0
    student.addGrade('Subject3', 65); // C = 2.0
    // (4.0 + 3.0 + 2.0) / 3 = 3.00
    const gpa = student.calculateGPA();
    expect(gpa.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
  });
});
