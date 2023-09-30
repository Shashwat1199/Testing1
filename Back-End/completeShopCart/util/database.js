const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'back-end',
    password : 'password'
});

module.exports = pool.promise();