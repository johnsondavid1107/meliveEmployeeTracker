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

    }

]).then(answers => {
    
    connection.connect(function (err) {
        if (err) {
            console.error("No Go my guy, failure connecting to database " + err.stack)
            return;
        }
        console.log("EUERKA!!! " + connection.threadId)
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.table(res)
            connection.end();
        })
    });
    


}).catch(error => {
    console.log(error);
})




