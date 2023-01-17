const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.redirect("/Home");
})

app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Home.html"));
})

app.listen(port, () => {
    console.log("server is running on port " + port);
})