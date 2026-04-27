const request = require('supertest');
const app = require('../../src/app');
const MySQLStore = require('../../src/utils/MySQLStore');

describe('API Integration Tests', () => {
  let store;

  beforeAll(() => {
    store = new MySQLStore();
  });

  beforeEach(async () => {
    await store.clearData();
  });

  afterEach(async () => {
    await store.clearData();
  });

  test('should create a new student via POST /api/students', async () => {
    const response = await request(app)
      .post('/api/students')
      .send({
        nim: '6666666666',
        name: 'John Doe',
        major: 'Computer Science'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.nim).toBe('6666666666');
  });

  test('should get all students via GET /api/students', async () => {
    await request(app)
      .post('/api/students')
      .send({ nim: '7777777777', name: 'Test User', major: 'CS' });

    const response = await request(app).get('/api/students');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('should add grade to student via POST /api/students/:id/grades', async () => {
    const createRes = await request(app)
      .post('/api/students')
      .send({ nim: '3333333333', name: 'Jane Smith', major: 'IS' });

    expect(createRes.status).toBe(201);
    expect(createRes.body.data).toBeDefined();
    
    const studentId = createRes.body.data.id;

    const response = await request(app)
      .post(`/api/students/${studentId}/grades`)
      .send({ subject: 'Mathematics', score: 85 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.grades).toHaveLength(1);
  });
});
