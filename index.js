const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require("./db.js");
const { resourceLimits } = require('worker_threads');
const CRUD = require('./CRUD');
const port = 8080;

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// redirect route
app.get('/', (req, res) => {
    res.redirect("/Home");
});

// home route
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Home.html"));
});

// Sign_In route
app.get('/Sign_In', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Sign_In.html"));
});

// Sign Up route
app.get('/Sign_Up', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Sign_Up.html"));
});

// Start questionnaire route
app.get('/StartQuestions', (req, res) => {
    res.sendFile(path.join(__dirname, "views/StartQuestions.html"));
});

// home route
app.get('/Question1', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Question1.html"));
});

// home route
app.get('/Question2', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Question2.html"));
});

// home route
app.get('/Question3', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Question3.html"));
});

// home route
app.get('/Question4', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Question4.html"));
});

// home route
app.get('/Question5', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Question5.html"));
});

// home route
app.get('/Dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, "views/Dashboard.html"));
});



// sign up route
app.post('/signUp', CRUD.signUpToDB);


app.listen(port, () => {
    console.log("server is running on port " + port);
});