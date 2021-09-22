const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');


const app = express();
const PORT=3000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', indexRouter);

app.listen(PORT,()=>console.log(`Server running on port : http://localhost:${PORT}`));

module.exports = app;
