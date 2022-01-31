// importing mySQL2 package
const mysql = require('mysql2');

// connecting to mySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Dickens3114',
        database: 'Employees'
    },
    console.log('Connected to the Employee database.')
);

module.exports = db;