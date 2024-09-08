const mysql = require('mysql');
require("dotenv").config();

const dbUrl= 'mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:3306/${process.env.MYSQL_DATABASE}'

const db = mysql.createConnection(dbUrl);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
