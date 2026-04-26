const express = require('express');
const StudentController = require('../controllers/StudentController');

const router = express.Router();
const controller = new StudentController();

router.post('/students', (req, res) => controller.createStudent(req, res));
router.get('/students', (req, res) => controller.getAllStudents(req, res));
router.get('/students/top', (req, res) => controller.getTopStudents(req, res));
router.get('/students/:id', (req, res) => controller.getStudentById(req, res));
router.post('/students/:id/grades', (req, res) => controller.addGrade(req, res));
router.delete('/students/:id', (req, res) => controller.deleteStudent(req, res));

module.exports = router;
