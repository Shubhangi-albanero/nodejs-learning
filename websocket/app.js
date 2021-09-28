const express = require('express');
const enableWs = require('express-ws');
const logger = require('morgan');

const app = express();
enableWs(app)
app.ws('/websocket', (ws, req) => {
  ws.on('message', msg => {
      ws.send(`Hi ${msg}`)
      
  })

  setInterval(function(){ 
      ws.send(`connected`)
  }, 3000);
  ws.on('close', () => {
      console.log('WebSocket was closed')
  })
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, ()=> {
  console.log("app running on port 3000")
})

module.exports = app;
