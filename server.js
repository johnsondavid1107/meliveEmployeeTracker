const express = require("express");
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 789;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_DB"
});

connection.connect(function (err) {
    if (err) {
        console.error ("No Go my guy, failure connecting to database " + err.stack)
        return;
    }

    console.log("EUERKA!!! " + connection.threadId.Id)
});




app.listen(PORT, function () {
    console.log("CONGRATULATIONS, you did NOT play yourself.  Server open on " + PORT)
})



