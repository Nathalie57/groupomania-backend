// const mariadb = require('mariadb');
const mysql = require('mysql');
const env = require('dotenv').config();
if (env.error) {
    throw env.error;
}

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting');
    return;
  }
 
  console.log('connected to database');
});

module.exports = connection;
// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// })

// exports.getConnection = pool.getConnection();