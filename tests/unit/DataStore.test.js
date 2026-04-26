const DataStore = require('../../src/utils/DataStore');
const Student = require('../../src/models/Student');
const fs = require('fs');
const path = require('path');

describe('DataStore - Unit Tests', () => {
  let dataStore;
  let testFilePath;

  beforeEach(() => {
    testFilePath = path.join(__dirname, '../../data/test-datastore.json');
    dataStore = new DataStore(testFilePath);
    // Clean up before each test
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  afterEach(() => {
    // Clean up after each test
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('should save students to file successfully', () => {
    const students = [
      new Student(1, '1234567890', 'John Doe', 'CS')
    ];

    const result = dataStore.saveStudents(students);
    expect(result).toBe(true);
    expect(fs.existsSync(testFilePath)).toBe(true);
  });

  test('should load students from file successfully', () => {
    const students = [
      new Student(1, '1234567890', 'John Doe', 'CS')
    ];
    dataStore.saveStudents(students);

    const loaded = dataStore.loadStudents();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].nim).toBe('1234567890');
  });

  test('should return empty array when file does not exist', () => {
    const loaded = dataStore.loadStudents();
    expect(loaded).toEqual([]);
  });

  test('should clear data successfully', () => {
    const students = [new Student(1, '1234567890', 'Test', 'CS')];
    dataStore.saveStudents(students);

    const result = dataStore.clearData();
    expect(result).toBe(true);
    expect(fs.existsSync(testFilePath)).toBe(false);
  });
});
