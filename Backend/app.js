const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const env = require('dotenv').config();
if (env.error) {
    throw env.error;
}

mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
.then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
  })
  .catch(err => {
    console.log("not connected due to error: " + err);
  });

   
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

module.exports = app;