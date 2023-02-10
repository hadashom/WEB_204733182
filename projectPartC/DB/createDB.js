var sql = require('./db');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.csv');
var query = "";

const createTableAndInsertDataIntoMembers = (req, res) => {
    try {
        // create members table
        let query = "CREATE TABLE IF NOT EXISTS members (email varchar(255) PRIMARY KEY NOT NULL, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, password varchar(255) NOT NULL, question1 int, question2 int, question3 int, question4 int, question5 int, totalScore double(10,2), investorType ENUM('Conservative', 'Moderate', 'Aggressive'))";
        sql.query(query);
        console.log("created members table");

        // insert data into members table
        query = "INSERT INTO members (fname, lname, email, password) VALUES ?";
        var values = [["omer", "hadash", "omer@gmail.com", "123ASdasd"],
        ["test", "Tewst", "test@gmail.com", "123ASDasd"],
        ["John", "Doe", "johndoe@gmail.com", "Mypassword1!"],
        ["Jane", "Doe", "janedoe@gmail.com", "Mypassword2!"],
        ["Jim", "Smith", "jimsmith@gmail.com", "Mypassword3!"],
        ["Sarah", "Jones", "sarahjones@gmail.com", "Mypassword4!"],
        ["Michael", "Brown", "michaelbrown@gmail.com", "Mypassword5!"],
        ["Ashley", "Taylor", "ashleytaylor@gmail.com", "Mypassword6!"],
        ["David", "Smith", "davidsmith@gmail.com", "Mypassword7!"],
        ["Chris", "Johnson", "chrisjohnson@gmail.com", "Mypassword8!"],
        ["Amanda", "Miller", "amandamiller@gmail.com", "Mypassword9!"],
        ["Benjamin", "Moore", "benjaminmoore@gmail.com", "Mypassword10!"]
        ];
        var data = values.map(arr => [arr[0], arr[1], arr[2], arr[3]]);
        sql.query(query, [data]);
        console.log("members inserted");
        res.send("members table created and data inserted");

    } catch (err) {
        console.log("Error: ", err);
        res.status(400).send({ message: "Error creating table or inserting data" });
    }
}


const showMembers = (req, res) => {

    sql.query("SELECT * FROM members", (err, mysqlres) => {
        res.send(mysqlres);
    });
}

const showStocks = (req, res) => {

    sql.query("SELECT * FROM stocks", (err, mysqlres) => {
        res.send(mysqlres);
    });
}


const dropTables = (req, res) => {
    try {
        let query = "DROP TABLE IF EXISTS members, stocks";
        sql.query(query);
        console.log("members and stocks table dropped");
    } catch (err) {
        console.log("error in dropping members and stocks table ", err);
        res.status(400).send({ message: "error on dropping members and stocks table" + err });
    }
}



const createAndPopulateStocksTable = (req, res) => {
    try {
        // Create table
        let query = "CREATE TABLE IF NOT EXISTS stocks (stock VARCHAR(255) NOT NULL PRIMARY KEY, month6change FLOAT(5,2), month12change FLOAT(5,2), month24change FLOAT(5,2), volatilityIndex FLOAT(5,2), fit FLOAT(5,2))";
        sql.query(query);
        console.log("created stock table");

        // Read data from CSV file
        const filePath = path.join(__dirname, 'data.csv');
        const stocks = [];
        fs.createReadStream(filePath)
            .pipe(csv({ bom: true }))
            .on('data', (data) => {
                stocks.push([data.stock, data.month6change, data.month12change, data.month24change, data.volatilityIndex, data.fit]);
            })
            .on('end', () => {
                // Insert data into table
                let sqlQuery = "INSERT INTO stocks (stock, month6change, month12change, month24change, volatilityIndex, fit) VALUES ?";
                let result = sql.query(sqlQuery, [stocks]);
                // console.log("Number of records inserted: " + result.affectedRows);
                res.send("Stock table created and data inserted");
            });
    } catch (err) {
        console.log("Error creating and populating stocks table: ", err);
        res.status(500).send({ message: "Error creating and populating stocks table" });
    }
}




module.exports = { createTableAndInsertDataIntoMembers, showMembers, dropTables, createAndPopulateStocksTable, showStocks };
