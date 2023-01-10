
//modules
var express = require('express');
var app = express();
var path = require('path');
const port = 8000;


//routes
app.get('/', (req, res) => {
  //res.send('Hello World Express!');
  res.sendFile(path.join(__dirname, "views/Home.html"))
});


//listen
app.listen(port, () => {
  console.log("app is running on port " + port);
})