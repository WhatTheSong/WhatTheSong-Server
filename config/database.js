const mysql = require('mysql2/promise');
const {logger} = require('./winston');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: '3306',
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV
});

module.exports = {
    pool: pool
};