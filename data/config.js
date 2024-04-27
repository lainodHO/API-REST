const mysql = require('mysql2');

// set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'Daniel19',
    database: 'api',
};


// create a MySQL pool
const pool = mysql.createPool(config);
module.exports = pool;

