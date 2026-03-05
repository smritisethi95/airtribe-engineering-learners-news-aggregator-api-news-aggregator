const express = require('express');
const app = express();
const auth = require('./src/routes/auth.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',auth);

module.exports = app;