const StudentService = require('../services/StudentService');

class StudentController {
  constructor() {
    this.studentService = new StudentService();
  }

  async createStudent(req, res) {
    try {
      const { nim, name, major } = req.body;
      const student = await this.studentService.createStudent(nim, name, major);
      
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: student.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await this.studentService.getAllStudents();
      
      res.status(200).json({
        success: true,
        data: students.map(s => s.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getStudentById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const student = await this.studentService.getStudentById(id);
      
      res.status(200).json({
        success: true,
        data: student.toJSON()
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async addGrade(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { subject, score } = req.body;
      
      const student = await this.studentService.addGradeToStudent(id, subject, score);
      
      res.status(200).json({
        success: true,
        message: 'Grade added successfully',
        data: student.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = parseInt(req.params.id);
      await this.studentService.deleteStudent(id);
      
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTopStudents(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const students = await this.studentService.getTopStudents(limit);
      
      res.status(200).json({
        success: true,
        data: students.map(s => s.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = StudentController;
