const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config()

const indexRouter = require('./routes/index');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', indexRouter);

app.listen(process.env.PORT,()=>console.log(`Server running on port : http://localhost:${process.env.PORT}`));

module.exports = app;

process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      debug('HTTP server closed')
    })
  })