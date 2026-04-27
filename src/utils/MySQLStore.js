const { pool } = require('../config/database');
const Student = require('../models/Student');

class MySQLStore {
  async loadStudents() {
    try {
      const [students] = await pool.query('SELECT * FROM students ORDER BY id');
      
      const studentsWithGrades = await Promise.all(
        students.map(async (s) => {
          const student = new Student(s.id, s.nim, s.name, s.major);
          
          // Load grades
          const [grades] = await pool.query(
            'SELECT subject, score, letter_grade FROM grades WHERE student_id = ?',
            [s.id]
          );
          
          student.grades = grades.map(g => ({
            subject: g.subject,
            score: g.score,
            letterGrade: g.letter_grade
          }));
          
          return student;
        })
      );
      
      return studentsWithGrades;
    } catch (error) {
      console.error('Error loading students:', error.message);
      return [];
    }
  }

  async saveStudent(student) {
    try {
      const [result] = await pool.query(
        'INSERT INTO students (nim, name, major) VALUES (?, ?, ?)',
        [student.nim, student.name, student.major]
      );
      
      student.id = result.insertId;
      return student;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('NIM already exists');
      }
      throw error;
    }
  }

  async updateStudent(student) {
    try {
      await pool.query(
        'UPDATE students SET name = ?, major = ? WHERE id = ?',
        [student.name, student.major, student.id]
      );
      return student;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await pool.query('DELETE FROM students WHERE id = ?', [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const [students] = await pool.query(
        'SELECT * FROM students WHERE id = ?',
        [id]
      );
      
      if (students.length === 0) {
        return null;
      }
      
      const s = students[0];
      const student = new Student(s.id, s.nim, s.name, s.major);
      
      // Load grades
      const [grades] = await pool.query(
        'SELECT subject, score, letter_grade FROM grades WHERE student_id = ?',
        [id]
      );
      
      student.grades = grades.map(g => ({
        subject: g.subject,
        score: g.score,
        letterGrade: g.letter_grade
      }));
      
      return student;
    } catch (error) {
      throw error;
    }
  }

  async addGrade(studentId, subject, score, letterGrade) {
    try {
      await pool.query(
        'INSERT INTO grades (student_id, subject, score, letter_grade) VALUES (?, ?, ?, ?)',
        [studentId, subject, score, letterGrade]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async clearData() {
    try {
      await pool.query('DELETE FROM grades');
      await pool.query('DELETE FROM students');
      await pool.query('ALTER TABLE students AUTO_INCREMENT = 1');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error.message);
      return false;
    }
  }
}

module.exports = MySQLStore;
