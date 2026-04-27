const StudentService = require('../../src/services/StudentService');
const MySQLStore = require('../../src/utils/MySQLStore');

describe('Top Students - Unit Tests', () => {
  let service;
  let store;

  beforeAll(() => {
    store = new MySQLStore();
  });

  beforeEach(async () => {
    service = new StudentService();
    await store.clearData();
    // Small delay to ensure database is ready
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  afterEach(async () => {
    await store.clearData();
    // Small delay to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  test('should return top students sorted by GPA', async () => {
    const student1 = await service.createStudent('1111111111', 'Alice', 'CS');
    await service.addGradeToStudent(student1.id, 'Math', 90); // GPA = 4.0
    
    const student2 = await service.createStudent('2222222222', 'Bob', 'CS');
    await service.addGradeToStudent(student2.id, 'Math', 80); // GPA = 3.0
    
    const student3 = await service.createStudent('3333333333', 'Charlie', 'CS');
    await service.addGradeToStudent(student3.id, 'Math', 85); // GPA = 4.0

    const topStudents = await service.getTopStudents(3);
    
    expect(topStudents).toHaveLength(3);
    expect(topStudents[0].calculateGPA()).toBe(4.0);
    expect(topStudents[2].calculateGPA()).toBe(3.0);
  }, 10000);

  test('should limit results based on limit parameter', async () => {
    for (let i = 0; i < 10; i++) {
      const student = await service.createStudent(`111111111${i}`, `Student${i}`, 'CS');
      await service.addGradeToStudent(student.id, 'Math', 80 + i);
    }

    const top3 = await service.getTopStudents(3);
    expect(top3).toHaveLength(3);
  }, 15000);

  test('should return all students if limit exceeds total', async () => {
    await service.createStudent('1111111111', 'Alice', 'CS');
    await service.createStudent('2222222222', 'Bob', 'CS');

    const top10 = await service.getTopStudents(10);
    expect(top10).toHaveLength(2);
  }, 10000);

  test('should handle students with no grades', async () => {
    await service.createStudent('1111111111', 'Alice', 'CS');
    const student2 = await service.createStudent('2222222222', 'Bob', 'CS');
    await service.addGradeToStudent(student2.id, 'Math', 85);

    const topStudents = await service.getTopStudents(5);
    expect(topStudents[0].name).toBe('Bob');
    expect(topStudents[0].calculateGPA()).toBeGreaterThan(0);
  }, 10000);
});
