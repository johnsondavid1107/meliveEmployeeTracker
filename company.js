const inquirer = require("inquirer")
const mysql = require('mysql');



const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_DB"
});

inquirer.prompt([

    {
        type: 'list',
        name: 'what',
        message: 'Welcome to the Company Portal.  What would you like to do?',
        choices: [
            'View?',
            'Add?',
            'Update Employee Roles'
        ],
    },
    {
        type: 'list',
        name: 'options',
        message: 'Which would you like',
        choices: [
            'Departments?',
            'Roles?',
            'Employees'
        ],
        when: function (answers) {
            return answers.what !== "Update Employee Roles";

        }

    },
    {
        type: "input",
        name: "firstName",
        message: "What is the first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the last name?"
    }



]).then(answers => {
    if (answers.what === "Add?") {
        addEmployee(answers);

    }
    console.log("testing", "line 59")

}).catch(error => {
    console.log(error);
})




function addEmployee(answers) {
    connection.connect(function (err) {
        
        if (err) {
            console.error("No Go my guy, failure connecting to database " + err.stack)
            return;
        }
        console.log("EUERKA!!! " + connection.threadId)
        connection.query("INSERT INTO employee (first_name) VALUES (?)", [answers.firstName], function (err, res) {
            console.log("is it here line77")
            if (err) throw err;
            console.log("maybe here line79")
            console.table(res)
            // connection.end();
            console.log(answers.firstName,"line79")
        })
    });

}


