
//modules
var express = require('express');
var app = express();
var path = require('path');
const port = 8000;

//
app.get('/', (req,res) => {
  res.send('Hello World Express!');
});

app.listen(port, ()=>{
  console.log("app is running on port " + port);
})