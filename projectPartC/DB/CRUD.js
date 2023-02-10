const sql = require("./db");
const js_file = require("../static/JS/FormsJS");




const validateUserSignIn = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const userData = {
        "userEmail": req.body.email,
        "password": req.body.password
    };
    sql.query("SELECT * FROM members where email like ?", userData.userEmail + "%", (err, mysqlres) => {
        console.log(mysqlres);
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        if (mysqlres.length == 0) {
            res.render('SignIn', {
                page_title: "Sign In",
                error: "לא קיים משתמש עם אימייל זה"
            });
            return;
        }
        else {
            if (mysqlres[0].password == userData.password) {
                if (mysqlres[0].question1 == null || mysqlres[0].question2 == null || mysqlres[0].question3 == null || mysqlres[0].question4 == null || mysqlres[0].question5 == null) {
                    res.redirect("/setEmailCookie/" + mysqlres[0].email + "/" + 1);
                    return;
                } else {
                    res.redirect("/setEmailCookie/" + mysqlres[0].email + "/" + 0);
                    return;
                }
            } else {
                res.render('SignIn', {
                    page_title: "Sign In",
                    error: "סיסמה לא נכונה"
                });
                return;
            }
        }
    });
};

const insertQ1 = (req, res) => {
    var userEmail = req.cookies.userEmail;
    if (!req.query) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var q1 = req.query.gender;
    sql.query("UPDATE members SET question1 = ? where email = ?", [q1, userEmail], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        res.redirect('/Question2');
        return;
    });
};

const insertQ2 = (req, res) => {
    var userEmail = req.cookies.userEmail;
    if (!req.query) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var q2 = req.query.age;
    sql.query("UPDATE members SET question2 = ? where email = ?", [q2, userEmail], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        res.redirect('/Question3');
        return;
    });
};


const insertQ3 = (req, res) => {
    var userEmail = req.cookies.userEmail;
    if (!req.query) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var q3 = req.query.years;
    sql.query("UPDATE members SET question3 = ? where email = ?", [q3, userEmail], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        res.redirect('/Question4');
        return;
    });
};

const insertQ4 = (req, res) => {
    var userEmail = req.cookies.userEmail;
    if (!req.query) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var q4 = req.query.agree_level;
    sql.query("UPDATE members SET question4 = ? where email = ?", [q4, userEmail], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        res.redirect('/Question5');
        return;
    });
};

const insertQ5 = (req, res) => {
    var userEmail = req.cookies.userEmail;
    if (!req.query) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var q5 = req.query.q5_res;
    sql.query("UPDATE members SET question5 = ? where email = ?", [q5, userEmail], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error: " + err });
            return;
        }
        sql.query("with t1 as (select question1+question2+question3+question4+question5 as total from members where email = ?), t2 as (select t1.total as total, case when t1.total <= 7 then 'Conservative' when t1.total > 7 and t1.total <= 12 then 'Moderate' else 'Aggressive' end as investor_type from t1) update members set totalScore = (select total from t2), investorType = (select investor_type from t2) where email = ?;", [userEmail, userEmail], (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).send({ message: "error: " + err });
                return;
            }
            sql.query("select * from members where email = ?", [userEmail], (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error: " + err });
                    return;
                }

                sql.query("update stocks set fit = (((month6change+month12change+month24change)/3)/((1+volatilityIndex*2)/(?*3)))", [mysqlres[0].totalScore], (err, mysqlres) => {
                    if (err) {
                        console.log("error: ", err);
                        res.status(400).send({ message: "error: " + err });
                        return;
                    }


                    res.redirect('/Dashboard');
                    return;

                });

            });



        })
    });
};








const createNewMember = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const newUser = {
        "fname": req.body.fName,
        "lname": req.body.lName,
        "email": req.body.email,
        "password": req.body.password
    };
    try {
        const query = "SELECT * FROM members where email like ?";
        const results = sql.query(query, newUser.email + '%');
        if (results.length > 0) {
            res.render('SignUp', {
                page_title: "Sign In",
                error: "User already exists"
            });
            return;
        } else {
            currentUser = newUser;
            const insertQuery = "INSERT INTO members SET ?";
            sql.query(insertQuery, newUser);
            console.log("created member: ", { newUser });
            res.render('Home', {
                page_title: "Home",
                message: "User created"
            });
            return;
        }
    } catch (err) {
        console.log("error: ", err);
        res.status(400).render('Error', { var1: "ERROR 400", var2: "error in creating member: " + err });
        return;
    }
};

// validate user log in
// const validateUserSignIn = (req, res) => {
//     if (!req.body) {
//         res.status(400).render('Error', { var1: "ERROR 400", var2: "content cannot be empty" });
//         return;
//     }
//     console.log(req.body.email + "  " + req.body.password + "  " + req.body);
//     sql.query("SELECT * FROM members WHERE username = ? AND password = ?", [req.body.email, req.body.password], (err, mysqlres) => {
//         console.log(mysqlres);
//         if (mysqlres.length > 0) {
//             currentUser = {
//                 "fname": mysqlres[0].fname,
//                 "lname": mysqlres[0].lname,
//                 "email": mysqlres[0].email,
//                 "password": mysqlres[0].password
//             };
//             res.render('/StartQuestions');
//             return;
//         }
//         else {
//             console.log("error: ", err);
//             res.status(400).render('SignIn', { SignInError: "*Invalid username or password" });
//             return;
//         }
//     });
// };



// const validateUserSignIn = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(email + "  " + password);
//     try {
//         const query = "SELECT * FROM members WHERE email = '${email}' AND password = '${password}'";
//         const result = await sql.query(query);
//         console.log(result);

//     } catch (err) {
//         console.log("error: ", err);
//         res.status(400).render('Error', { var1: "ERROR 400", var2: "error in validating member: " + err });
//     }
// };

// const validateUserSignIn = async (req, res) => {
//     if (!req.body) {
//         res.status(400).render('Error', { var1: "ERROR 400", var2: "content cannot be empty" });
//         return;
//     }
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         console.log(email + "  " + password);
//         const query = "SELECT * FROM members WHERE email = '${email}' AND password = '${password}'";
//         const [results] = await sql.query(query);
//         if (results.length > 0) {
//             res.render('StartQuestion');
//         }
//         else {
//             res.render('SignIn', { error: 'wrong password or email' });
//             return;
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).render('Error', { var1: "ERROR 500", var2: "Internal server error" });
//     }
// };





module.exports = { validateUserSignIn, insertQ1, insertQ2, insertQ3, insertQ4, insertQ5, createNewMember }