const fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error('Asynchronous error =',err);
   }
   console.log("Asynchronous read: " + data.toString());
});
console.log("buzz");