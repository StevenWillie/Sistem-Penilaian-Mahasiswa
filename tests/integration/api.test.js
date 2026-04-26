const request = require('supertest');
const app = require('../../src/app');
const DataStore = require('../../src/utils/DataStore');
const path = require('path');

describe('API Integration Tests', () => {
  let dataStore;

  beforeEach(() => {
    const testDataPath = path.join(__dirname, '../../data/test-students.json');
    dataStore = new DataStore(testDataPath);
    dataStore.clearData();
  });

  afterEach(() => {
    dataStore.clearData();
  });

  test('should create a new student via POST /api/students', async () => {
    const response = await request(app)
      .post('/api/students')
      .send({
        nim: '1234567890',
        name: 'John Doe',
        major: 'Computer Science'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.nim).toBe('1234567890');
  });

  test('should get all students via GET /api/students', async () => {
    await request(app)
      .post('/api/students')
      .send({ nim: '1234567890', name: 'John Doe', major: 'CS' });

    const response = await request(app).get('/api/students');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('should add grade to student via POST /api/students/:id/grades', async () => {
    const createRes = await request(app)
      .post('/api/students')
      .send({ nim: '1234567890', name: 'John Doe', major: 'CS' });

    const studentId = createRes.body.data.id;

    const response = await request(app)
      .post(`/api/students/${studentId}/grades`)
      .send({ subject: 'Mathematics', score: 85 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.grades).toHaveLength(1);
  });
});
