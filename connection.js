const mysql = require('mysql2');
require ('dotenv').config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.db_pw,
    database: process.env.db_name,
})