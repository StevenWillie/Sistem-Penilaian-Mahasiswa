-- Database Setup untuk Sistem Penilaian Mahasiswa
-- Jalankan script ini di phpMyAdmin atau MySQL Workbench

-- Buat database
CREATE DATABASE IF NOT EXISTS db_mahasiswa;
USE db_mahasiswa;

-- Tabel students
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel grades
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    score INT NOT NULL CHECK (score >= 0 AND score <= 100),
    letter_grade CHAR(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Index untuk performa
CREATE INDEX idx_student_nim ON students(nim);
CREATE INDEX idx_grade_student ON grades(student_id);

-- Insert sample data (opsional)
-- INSERT INTO students (nim, name, major) VALUES 
-- ('1234567890', 'John Doe', 'Computer Science'),
-- ('0987654321', 'Jane Smith', 'Information Systems');
