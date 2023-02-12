const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());

// DB functions
app.get('/firstConnection', [CreateDB.dropTables, CreateDB.createTableAndInsertDataIntoMembers, CreateDB.createAndPopulateStocksTable], (req, res) => {
    res.send("Created tables and inserted Data");
})
app.get('/createTableAndInsertDataIntoMembers', CreateDB.createTableAndInsertDataIntoMembers);
app.get('/showMembers', CreateDB.showMembers);
app.get('/showStocks', CreateDB.showStocks);
app.get('/dropTables', CreateDB.dropTables);
app.get('/createAndPopulateStocksTable', CreateDB.createAndPopulateStocksTable);

// redirect to home route
app.get('/', (req, res) => {
    res.redirect("/Home");
});

// Home page route
app.get('/Home', (req, res) => {
    res.render('Home', {
        page_title: 'Home',
        message: ""
    });
});

// Sign_In page route
app.get('/SignIn', (req, res) => {
    res.render('SignIn', { page_title: "Sign In" });
});

// Sign Up page route
app.get('/SignUp', (req, res) => {
    //res.sendFile(path.join(__dirname, "views/Sign_Up.html"));
    res.render('SignUp', { page_title: 'Sign Up' });
});

// Start questionnaire page route
app.get('/StartQuestions', (req, res) => {
    //get and send name of current user
    var userEmail = req.cookies.userEmail;
    sql.query("SELECT * FROM members where email like ?", userEmail + "%", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        res.render('StartQuestions', {
            page_title: "Start Questions",
            memberName: mysqlres[0].fname
        });
        return;
    });
});

// Question 1 page route
app.get('/Question1', (req, res) => {
    res.render('Question1', {
        page_title: 'Question1'
    });
    return;

});

// Question 2 page route
app.get('/Question2', (req, res) => {
    res.render('Question2', {
        page_title: 'Question2'
    });
    return;

});

// Question 3 page route
app.get('/Question3', (req, res) => {
    res.render('Question3', {
        page_title: 'Question3'
    });
    return;
});

// Question 4 page route
app.get('/Question4', (req, res) => {
    res.render('Question4', {
        page_title: 'Question4'
    });
    return;

});

// Question 5 page route
app.get('/Question5', (req, res) => {
    res.render('Question5', {
        page_title: 'Question5'
    });

});

// Dashboard page route
app.get('/Dashboard', (req, res) => {
    //get user name, investor type and total score for the meter
    var userEmail = req.cookies.userEmail;
    sql.query("SELECT * FROM members where email like ?", userEmail + "%", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        var mName = mysqlres[0].fname;
        var iType = mysqlres[0].investorType;
        var sValue = mysqlres[0].totalScore;

        console.log(mName + "    " + iType + "  " + sValue);

        // get the top 3 stocks for this user
        sql.query("SELECT * FROM stocks ORDER BY fit DESC LIMIT 3", userEmail + "%", (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).send({ message: "error: " + err });
                return;
            }
            console.log(mysqlres);
            res.render('Dashboard', {
                page_title: "Dashboard",
                memberName: mName,
                investorType: iType,
                sliderValue: sValue,
                sqlres: mysqlres
            });
            return;
        });
    });
})

// sign up form route
app.post('/signUpForm', CRUD.createNewMember);

// sign in form route
app.post('/SignInForm', CRUD.validateUserSignIn);

app.get('/removeEmailCookie', (req, res) => {
    res.clearCookie('userEmail');
    res.redirect('/Home');
});

//get user answers route
app.get('/userQuestion1', CRUD.insertQ1);

app.get('/userQuestion2', CRUD.insertQ2);

app.get('/userQuestion3', CRUD.insertQ3);

app.get('/userQuestion4', CRUD.insertQ4);

app.get('/userQuestion5', CRUD.insertQ5);

//set cookie and redirect according if already filled in or not
app.get("/setEmailCookie/:email/:checkFirstTime", (req, res) => {
    var userEmail = req.params.email;
    var firstTime = req.params.checkFirstTime;
    res.cookie('userEmail', userEmail);
    console.log(req.cookies.userEmail);
    if (firstTime == 0) {
        res.redirect('/Dashboard');
        return;
    } else {
        res.redirect('/StartQuestions');
        return;
    }
});

// listen to port
app.listen(port, () => {
    console.log("server is running on port " + port);
});

