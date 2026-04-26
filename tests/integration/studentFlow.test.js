const request = require('supertest');
const app = require('../../src/app');
const DataStore = require('../../src/utils/DataStore');
const path = require('path');

describe('Student Flow Integration Tests', () => {
  let dataStore;

  beforeEach(() => {
    const testDataPath = path.join(__dirname, '../../data/test-flow.json');
    dataStore = new DataStore(testDataPath);
    dataStore.clearData();
  });

  afterEach(() => {
    dataStore.clearData();
  });

  test('complete student lifecycle: create, add grades, check GPA, delete', async () => {
    // Create student
    const createRes = await request(app)
      .post('/api/students')
      .send({ nim: '9876543210', name: 'Alice Johnson', major: 'Software Engineering' });

    expect(createRes.status).toBe(201);
    const studentId = createRes.body.data.id;

    // Add multiple grades
    await request(app)
      .post(`/api/students/${studentId}/grades`)
      .send({ subject: 'Database', score: 90 });

    await request(app)
      .post(`/api/students/${studentId}/grades`)
      .send({ subject: 'Programming', score: 85 });

    // Get student and verify GPA
    const getRes = await request(app).get(`/api/students/${studentId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.gpa).toBeGreaterThan(3.5);
    expect(getRes.body.data.status).toBe('Cumlaude');

    // Delete student
    const deleteRes = await request(app).delete(`/api/students/${studentId}`);
    expect(deleteRes.status).toBe(200);

    // Verify deletion
    const verifyRes = await request(app).get(`/api/students/${studentId}`);
    expect(verifyRes.status).toBe(404);
  });

  test('should get top students ordered by GPA', async () => {
    // Create multiple students with different GPAs
    const student1 = await request(app)
      .post('/api/students')
      .send({ nim: '4444444444', name: 'Student A', major: 'CS' });
    
    expect(student1.status).toBe(201);
    expect(student1.body.data).toBeDefined();
    
    await request(app)
      .post(`/api/students/${student1.body.data.id}/grades`)
      .send({ subject: 'Math', score: 90 });

    const student2 = await request(app)
      .post('/api/students')
      .send({ nim: '5555555555', name: 'Student B', major: 'CS' });
    
    expect(student2.status).toBe(201);
    expect(student2.body.data).toBeDefined();
    
    await request(app)
      .post(`/api/students/${student2.body.data.id}/grades`)
      .send({ subject: 'Math', score: 70 });

    // Get top students
    const topRes = await request(app).get('/api/students/top?limit=2');
    expect(topRes.status).toBe(200);
    expect(topRes.body.data[0].gpa).toBeGreaterThan(topRes.body.data[1].gpa);
  });
});
