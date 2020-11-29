const inquirer = require("inquirer")
const mysql = require('mysql');



const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    commenceSequence();
})


function commenceSequence() {

    inquirer.prompt({
        type: 'list',
        name: 'what',
        message: 'Welcome to the Company Portal.  What would you like to do?',
        choices: [
            'View?',
            'Add Employee?',
            'Update Employee Roles',
            'Delete Employee Record',
            'EXIT'
        ],
    })
        .then(function (answers) {
            if (answers.what === "View?") {
                viewEmployee();

            } else if (answers.what === "Add Employee?") {
                addEmployee();
            } else if (answers.what === "Update Employee Roles") {
                updateEmployee();
            } else if(answers.what ==="Delete Employee Record") {
                deleteEmployee();
            }else {
                connection.end()
            }
        })

}

function viewEmployee() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        inquirer.prompt([

            {
                type: 'list',
                name: 'optionsAll',
                message: 'Which would you like?',
                choices: [
                    'View all employees',
                    'View All Employees by Department'
                ]
            },
            {
                type: "rawlist",
                name: "select",
                message: "Which Dept would you like to see?",
                choices: function () {
                    let selectionArray = [];
                    for (let i = 0; i < res.length; i++) {
                        selectionArray.push(res[i].dept_name)
                    }
                    return selectionArray;
                },
                when: function (answers) {
                    return answers.optionsAll !== "View all employees"
                }
            }
        ])
            .then(function (answers) {
                connection.connect(function (err) {
                    let pick = answers.select;
                    if (pick === "Front Desk") {
                        pick = 1
                    } else if (pick === "Housekeeping") {
                        pick = 2
                    } else if (pick === "Sales") {
                        pick = 3
                    } else if (pick === "Engineering") {
                        pick = 4
                    } else {
                        pick = 5
                    }

                    if (answers.optionsAll === "View all employees") {
                        console.log(answers.optionsAll)
                        connection.query(`
                        SELECT 
                        employee.id, first_name, last_name, title, salary, dept_name
                        FROM ((role
                            INNER JOIN department ON department_id = department.id)INNER JOIN employee ON role_id = role.id);
                        `, function (err, res) {
                            if (err) throw err;
                            console.table(res)
                            commenceSequence();
                        })

                    } else {
                        let choice = answers.options
                        connection.query(`SELECT first_name, last_name, dept_name
                    FROM employee
                    INNER JOIN department ON department.id = role_id
                    WHERE department.id = ${pick};`, function (err, res) {
                            if (err) {
                                console.error(err.stack)
                                return;
                            }
                            console.table(res)
                            commenceSequence();
                        })

                    }

                })

            })

    })

}

function addEmployee(answers) {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name?",
            },
            {
                type: "rawlist",
                name: "select",
                message: "Please select a role?",
                choices: function () {
                    let selectionArray = [];
                    for (let i = 0; i < res.length; i++) {
                        selectionArray.push(res[i].title)
                    }
                    return selectionArray;
                }
            }

        ]).then(function (answers) {


            console.log(answers.select)
            let pick = answers.select;
            if (pick === "Front Desk Agent") {
                pick = 1
            } else if (pick === "Bellman") {
                pick = 2
            } else if (pick === "Concierge") {
                pick = 4
            } else if (pick === "Engineer") {
                pick = 3
            } else if (pick === "Room Attendant") {
                pick = 5
            } else if (pick === "Sales Coordinator") {
                pick = 6
            } else {
                pick = 7
            }
            console.log(pick, "line255")

            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", [answers.firstName, answers.lastName, pick], function (err, res) {
                if (err) throw err;
                // connection.end();
                console.log(answers.firstName, answers.lastName, pick, "line260")
                console.log("Input received!");
                commenceSequence();
            });

        })
    })



}


function updateEmployee() {
    let firstName;
    let lastName
    connection.query("SELECT employee.id, first_name, last_name, title, salary, dept_name FROM ((role INNER JOIN department ON department_id = department.id) INNER JOIN employee ON role_id = role.id);", function (err, res) {
        if (err) throw err;
        console.table(res)

        inquirer.prompt([
            {
                type: "rawlist",
                name: "employees",
                message: "Please choose and Employee to Update",
                choices: function () {
                    let employeeArray = [];
                    for (let i = 0; i < res.length; i++) {
                        employeeArray.push(res[i].first_name + " " + res[i].last_name)
                    }
                    return employeeArray;
                },

            },


        ]).then(function (answers) {
            let x = answers.employees
            let y = x.split(" ", 2)
            console.log(y, "line221")
            console.log(y[0])
            console.log(y[1]);
            firstName = y[0];
            lastName = y[1];

            console.log(firstName, "line231")
            console.log(lastName, "232");

            connection.query("SELECT * FROM role;", function (err, res) {
                if (err) throw err;
                inquirer.prompt([

                    {
                        type: "rawlist",
                        name: "job",
                        message: "Please Update Job Role",
                        choices: function () {
                            let jobArray = [];
                            for (let i = 0; i < res.length; i++) {
                                jobArray.push(res[i].title)
                            }
                            return jobArray;
                        },
                    }
                ]).then(function (answers) {
                    console.log(answers.job, "line251")

                    let pick = answers.job;
                    if (pick === "Front Desk Agent") {
                        pick = 1
                    } else if (pick === "Bellman") {
                        pick = 2
                    } else if (pick === "Concierge") {
                        pick = 4
                    } else if (pick === "Engineer") {
                        pick = 3
                    } else if (pick === "Room Attendant") {
                        pick = 5
                    } else if (pick === "Sales Coordinator") {
                        pick = 6
                    } else {
                        pick = 7
                    }
                    connection.query(
                        `UPDATE employee 
                        SET role_id = ${pick} 
                        WHERE last_name = "${lastName}"`,
                        function (err) {
                            if (err) throw err;
                            console.log("Update Successfull!")
                            commenceSequence();
                        }

                    );



                })
            })
        })

    })
}

function deleteEmployee() {

    connection.query("SELECT employee.id, first_name, last_name, title, salary, dept_name FROM ((role INNER JOIN department ON department_id = department.id) INNER JOIN employee ON role_id = role.id);", function (err, res) {
        if (err) throw err;
        console.table(res)


        inquirer.prompt(
            {
                type: "rawlist",
                name: "ID",
                message: "Select Employee ID",
                choices: function () {
                    let idArray = [];
                    for (let i = 0; i < res.length; i++) {
                        idArray.push(res[i].id)
                    }
                    return idArray;
                },
            }

        ).then(function(answers){
            console.log(answers.ID)
            connection.query(
                `DELETE FROM employee WHERE employee.id = ${answers.ID}`, function(err) {
                    if (err) throw err;
                    console.log("Delete Successful!");
                    commenceSequence();
                }
            )


        })

    })

}

