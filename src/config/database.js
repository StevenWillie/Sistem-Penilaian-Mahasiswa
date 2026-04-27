const mysql = require('mysql2/promise');

// Konfigurasi database (XAMPP default)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_mahasiswa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Pastikan:');
    console.error('   1. XAMPP MySQL sudah running');
    console.error('   2. Database "db_mahasiswa" sudah dibuat');
    console.error('   3. Jalankan file database/setup.sql di phpMyAdmin');
    return false;
  }
}

module.exports = { pool, testConnection };
