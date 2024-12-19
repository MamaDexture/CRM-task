const mysql = require('mysql2');

// Create a connection pool
const db = mysql.createPool({
  host: 'localhost', // Your XAMPP MySQL host
  user: 'root',      // Default username for MySQL
  password: '',      // Default password for MySQL
  database: 'crm',   // Replace 'crm' with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the connection
module.exports = db;
