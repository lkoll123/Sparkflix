const mysql = require('mysql');
require('dotenv').config();

// Ensure environment variables are properly set
const {
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE
} = process.env;

// Create a connection using individual configuration options
const db = mysql.createConnection({
    host: MYSQLHOST || 'mysql.railway.internal', // Use default if environment variable is missing
    user: MYSQLUSER || 'root', // Use default if environment variable is missing
    password: MYSQLPASSWORD || 'bWkQMBcHdAGVbxSokDqmaXzsBykqFohd', // Use default if environment variable is missing
    database: MYSQLDATABASE || 'railway' // Use default if environment variable is missing
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
