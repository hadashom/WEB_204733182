const sql = require("./db.js");

// create new member
const signUpToDB = (req, res) => {
    // validate body exist
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" });
        return;
    }

    // pull data from body to json
    const newMember = {
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "password": req.body.password
    };

    //run query
    const Q1 = "INSERT INTO customers SET ?";

    sql.query(Q1, newMember, (err, mysqlres) => {
        if (err) {
            console.log("error:", error);
            res.status(400).send({ message: "error in sign up" + error });
        }
        console.log("created member: ", newMember);
        res.send({ message: "New member created" });
        return;
    })
};


module.exports = { signUpToDB }