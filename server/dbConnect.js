const mysql = require('mysql');
require("dotenv").config();

const dbUrl= `mysql://root:bWkQMBcHdAGVbxSokDqmaXzsBykqFohd@mysql.railway.internal:3306/railway`

const db = mysql.createConnection(dbUrl);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
