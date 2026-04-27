const StudentService = require('../../src/services/StudentService');
const MySQLStore = require('../../src/utils/MySQLStore');

describe('StudentService - Unit Tests', () => {
  let service;
  let store;

  beforeAll(() => {
    store = new MySQLStore();
  });

  beforeEach(async () => {
    service = new StudentService();
    await store.clearData();
  });

  afterEach(async () => {
    await store.clearData();
  });

  test('should create student successfully with valid data', async () => {
    const student = await service.createStudent('1234567890', 'John Doe', 'Computer Science');
    expect(student.nim).toBe('1234567890');
    expect(student.name).toBe('John Doe');
    expect(student.major).toBe('Computer Science');
  });

  test('should throw error when creating student with invalid NIM', async () => {
    await expect(async () => {
      await service.createStudent('123', 'John Doe', 'Computer Science');
    }).rejects.toThrow('NIM must be 10 digits');
  });

  test('should throw error when creating student with short name', async () => {
    await expect(async () => {
      await service.createStudent('1234567890', 'Jo', 'Computer Science');
    }).rejects.toThrow('Name must be at least 3 characters');
  });

  test('should throw error when creating student with empty major', async () => {
    await expect(async () => {
      await service.createStudent('1234567890', 'John Doe', '');
    }).rejects.toThrow('Major cannot be empty');
  });

  test('should throw error when creating student with duplicate NIM', async () => {
    await service.createStudent('1234567890', 'John Doe', 'Computer Science');
    
    try {
      await service.createStudent('1234567890', 'Jane Smith', 'Information Systems');
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).toBe('NIM already exists');
    }
  });

  test('should get student by ID successfully', async () => {
    const created = await service.createStudent('1234567890', 'John Doe', 'CS');
    const found = await service.getStudentById(created.id);
    expect(found.nim).toBe('1234567890');
  });

  test('should throw error when getting non-existent student', async () => {
    await expect(async () => {
      await service.getStudentById(999);
    }).rejects.toThrow('Student not found');
  });
});
