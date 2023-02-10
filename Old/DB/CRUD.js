const sql = require("./db").promise();
var currentUser = { "first_name": null, "last_name": null, "email": null, "password": null };

const createNewMember = async (req, res) => {
    if (!req.body) {
        res.status(400).render('Error', { var1: "ERROR 400", var2: "content cannot be empty" });
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
        const [results] = await sql.query(query, newUser.email + '%');
        if (results.length > 0) {
            console.log("this email already exists: " + newUser.email);
            res.render('SignUp', { SignUpError: "*email taken, try another one" });
            return;
        } else {
            currentUser = newUser;
            const insertQuery = "INSERT INTO members SET ?";
            await sql.query(insertQuery, newUser);
            console.log("created member: ", { newUser });
            res.render('Home', { message: "New member created. Please log in to continue" });
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

const validateUserSignIn = async (req, res) => {
    if (!req.body) {
        res.status(400).render('Error', { var1: "ERROR 400", var2: "content cannot be empty" });
        return;
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email + "  " + password);
        const query = "SELECT * FROM members WHERE email = '${email}' AND password = '${password}'";
        const [results] = await sql.query(query);
        if (results.length > 0) {
            res.render('StartQuestion');
        }
        else {
            res.render('SignIn', { error: 'wrong password or email' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).render('Error', { var1: "ERROR 500", var2: "Internal server error" });
    }
};



// Prints all members
const printMembers = (req, res, next) => {
    const printMembersQuery = "SELECT * FROM members;"
    sql.query(printMembersQuery, (err, mysqlres) => {
        if (err) {
            console.log("error:", error);
            res.status(400).send({ message: "error in getting members table" + error });
            return;
        }
        console.log("here is members table: ", mysqlres);
        res.send({ message: "New member table created", mysqlres });
        return;
    })
    next();
}



module.exports = { validateUserSignIn, printMembers, createNewMember }