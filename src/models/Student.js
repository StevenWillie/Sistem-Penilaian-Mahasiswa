class Student {
  constructor(id, nim, name, major) {
    this.id = id;
    this.nim = nim;
    this.name = name;
    this.major = major;
    this.grades = [];
  }

  addGrade(subject, score) {
    if (!this.validateScore(score)) {
      throw new Error('Score must be between 0 and 100');
    }
    
    if (!subject || subject.trim() === '') {
      throw new Error('Subject cannot be empty');
    }

    this.grades.push({ subject, score, letterGrade: this.calculateLetterGrade(score) });
  }

  validateScore(score) {
    return typeof score === 'number' && score >= 0 && score <= 100;
  }

  calculateLetterGrade(score) {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'E';
  }

  calculateGPA() {
    if (this.grades.length === 0) return 0;

    const gradePoints = {
      'A': 4.0,
      'B': 3.0,
      'C': 2.0,
      'D': 1.0,
      'E': 0.0
    };

    const totalPoints = this.grades.reduce((sum, grade) => {
      return sum + gradePoints[grade.letterGrade];
    }, 0);

    return parseFloat((totalPoints / this.grades.length).toFixed(2));
  }

  getStatus() {
    const gpa = this.calculateGPA();
    if (gpa >= 3.5) return 'Cumlaude';
    if (gpa >= 3.0) return 'Sangat Memuaskan';
    if (gpa >= 2.5) return 'Memuaskan';
    if (gpa >= 2.0) return 'Cukup';
    return 'Kurang';
  }

  toJSON() {
    return {
      id: this.id,
      nim: this.nim,
      name: this.name,
      major: this.major,
      grades: this.grades,
      gpa: this.calculateGPA(),
      status: this.getStatus()
    };
  }
}

module.exports = Student;
