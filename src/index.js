const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Test database connection before starting server
testConnection().then((connected) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Visit http://localhost:${PORT} for the application`);
      console.log(`Database: MySQL (db_mahasiswa)`);
    });
  } else {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  }
});
