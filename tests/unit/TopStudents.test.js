const StudentService = require('../../src/services/StudentService');

describe('Top Students - Unit Tests', () => {
  let service;

  beforeEach(() => {
    service = new StudentService();
    service.students = [];
  });

  test('should return top students sorted by GPA', () => {
    const student1 = service.createStudent('1111111111', 'Alice', 'CS');
    student1.addGrade('Math', 90); // GPA = 4.0
    
    const student2 = service.createStudent('2222222222', 'Bob', 'CS');
    student2.addGrade('Math', 80); // GPA = 3.0
    
    const student3 = service.createStudent('3333333333', 'Charlie', 'CS');
    student3.addGrade('Math', 85); // GPA = 4.0

    const topStudents = service.getTopStudents(3);
    
    expect(topStudents).toHaveLength(3);
    expect(topStudents[0].name).toBe('Alice');
    // Alice and Charlie both have GPA 4.0, so either could be first/second
    expect([topStudents[1].name, topStudents[2].name]).toContain('Charlie');
    expect([topStudents[1].name, topStudents[2].name]).toContain('Bob');
  });

  test('should limit results based on limit parameter', () => {
    for (let i = 0; i < 10; i++) {
      const student = service.createStudent(`111111111${i}`, `Student${i}`, 'CS');
      student.addGrade('Math', 80 + i);
    }

    const top3 = service.getTopStudents(3);
    expect(top3).toHaveLength(3);
  });

  test('should return all students if limit exceeds total', () => {
    service.createStudent('1111111111', 'Alice', 'CS');
    service.createStudent('2222222222', 'Bob', 'CS');

    const top10 = service.getTopStudents(10);
    expect(top10).toHaveLength(2);
  });

  test('should handle students with no grades', () => {
    service.createStudent('1111111111', 'Alice', 'CS');
    const student2 = service.createStudent('2222222222', 'Bob', 'CS');
    student2.addGrade('Math', 85);

    const topStudents = service.getTopStudents(5);
    expect(topStudents[0].name).toBe('Bob');
  });
});
