const fs = require("fs");


const data = fs.readFileSync('input.txt');
console.log("Synchronous read= " + data.toString());
console.log("sync");