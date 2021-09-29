const  express= require('express');;
const http = require('http')
const app = require("../app")
const socketIO = require('socket.io');
const server = http.createServer(app);
const io=socketIO(server)

const getio = (data) => {
  console.log("getio", data);
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  socket.on("send-notification", function () {
    io.emit("new-notification", data);
  });

});
}
module.exports =getio;