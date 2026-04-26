const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Sistem Penilaian Mahasiswa API',
    version: '1.0.0',
    endpoints: {
      'POST /api/students': 'Create new student',
      'GET /api/students': 'Get all students',
      'GET /api/students/:id': 'Get student by ID',
      'GET /api/students/top': 'Get top students',
      'POST /api/students/:id/grades': 'Add grade to student',
      'DELETE /api/students/:id': 'Delete student'
    }
  });
});

app.use('/api', studentRoutes);

module.exports = app;
