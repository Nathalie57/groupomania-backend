const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const commentRoutes = require('./routes/comment');
const userRoutes    = require('./routes/user')
   
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

module.exports = app;