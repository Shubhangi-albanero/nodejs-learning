
const express = require('express');
var http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');


const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io=socketIO(server);
// const io = new Server(server, {cors: {origin: '*'}});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', indexRouter);

server.listen(process.env.PORT)
// app.listen(process.env.PORT, () => console.log(Server running on port : http://localhost:${process.env.PORT}));


process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

module.exports = app;