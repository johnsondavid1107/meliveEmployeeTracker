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
        message: "What is the first name?",
        when: function (answers){
            return answers.what === 'Update Employee Roles' || 
            answers.what ==="Add?";
        }
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the last name?",
        when: function (answers) {
            return answers.what === 'Update Employee Roles' || 
            answers.what === "Add?";
        }
    }



]).then(answers => {
    if (answers.what === "Add?") {
        addEmployee(answers);

    }else if (answers.what === "View?"){
        viewEmployee(answers);
    }
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
        connection.query("INSERT INTO employee (first_name, last_name) VALUES (?,?)", [answers.firstName, answers.lastName], function (err, res) {
            if (err) throw err;
            // connection.end();
            console.log(answers.firstName,"line87")
            console.log("Input received!");
        });
    
        


    });

}

function viewEmployee(answers) {
    connection.connect(function (err) {

        if (err) {
            console.error("The viewEmployee didnt work" + err.stack)
            return;
        }
        console.log("yay! " + connection.threadId)
        connection.query("SELECT * FROM employee;", function(err,res) {
            if(err) {
                return;
            }
            console.table(res)
        })
    })
}


