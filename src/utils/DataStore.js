const fs = require('fs');
const path = require('path');
const Student = require('../models/Student');

class DataStore {
  constructor(filePath = null) {
    this.filePath = filePath || path.join(__dirname, '../../data/students.json');
  }

  loadStudents() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const data = fs.readFileSync(this.filePath, 'utf8');
      const studentsData = JSON.parse(data);

      return studentsData.map(s => {
        const student = new Student(s.id, s.nim, s.name, s.major);
        student.grades = s.grades || [];
        return student;
      });
    } catch (error) {
      console.error('Error loading students:', error.message);
      return [];
    }
  }

  saveStudents(students) {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const data = JSON.stringify(students.map(s => s.toJSON()), null, 2);
      fs.writeFileSync(this.filePath, data, 'utf8');
      return true;
    } catch (error) {
      console.error('Error saving students:', error.message);
      return false;
    }
  }

  clearData() {
    try {
      if (fs.existsSync(this.filePath)) {
        fs.unlinkSync(this.filePath);
      }
      return true;
    } catch (error) {
      console.error('Error clearing data:', error.message);
      return false;
    }
  }
}

module.exports = DataStore;
