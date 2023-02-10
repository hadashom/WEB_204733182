const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require("./DB/db.js");
const { resourceLimits } = require('worker_threads');
const CRUD = require('./DB/CRUD');
const CreateDB = require('./DB/CreateDB');
const port = 3000;

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB functions
app.get('/createTableAndInsertDataIntoMembers', CreateDB.createTableAndInsertDataIntoMembers);
app.get('/showUsers', CreateDB.showMembers);
app.get('/dropTables', CreateDB.dropTables);
app.get('/createAndPopulateStocksTable', CreateDB.createAndPopulateStocksTable);


// redirect to home route
app.get('/', (req, res) => {
    res.redirect("/Home");
});

// Home page route
app.get('/Home', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Home.html"));
    res.render('Home');
});

// Sign_In page route
app.get('/SignIn', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Sign_In.html"));
    res.render('SignIn', { error: ""});
});

// Sign Up page route
app.get('/SignUp', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Sign_Up.html"));
    res.render('SignUp');
});

// Start questionnaire page route
app.get('/StartQuestions', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/StartQuestions.html"));
    res.render('StartQuestions', {
        memberName: "Omer"
    });

});

// Question 1 page route
app.get('/Question1', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Question1.html"));
    res.render('Question1');

});

// Question 2 page route
app.get('/Question2', (req, res) => {
    //    res.sendFile(path.join(__dirname, "views/Question2.html"));
    res.render('Question2');

});

// Question 3 page route
app.get('/Question3', (req, res) => {
    //    res.sendFile(path.join(__dirname, "views/Question3.html"));
    res.render('Question3');

});

// Question 4 page route
app.get('/Question4', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Question4.html"));
    res.render('Question4');

});

// Question 5 page route
app.get('/Question5', (req, res) => {
    //    res.sendFile(path.join(__dirname, "views/Question5.html"));
    res.render('Question5');

});

// Dashboard page route
app.get('/Dashboard', (req, res) => {
    //    res.sendFile(path.join(__dirname, "views/Dashboard.html"));
    res.render('Dashboard');

});

// sign up form route
app.post('/signUpForm', CRUD.createNewMember);

// sign in form route
app.post('/SignInForm', CRUD.validateUserSignIn);


app.listen(port, () => {
    console.log("server is running on port " + port);
});

