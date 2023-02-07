const mysql = require('mysql2');
const dbConfig = require('./db.config');

//create a connection to db
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Succes connecting to DB");
});

// export connection
module.exports = connection;