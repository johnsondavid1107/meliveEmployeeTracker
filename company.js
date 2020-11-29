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
            'Add?',
            'Update Employee Roles',
            'EXIT'
        ],
    })
        .then(function (answers) {
            if (answers.what === "View?") {
                viewEmployee();

            } else if (answers.what === "Add?") {
                addEmployee();
            } else if (answers.what === "Update Employee Roles") {
                updateEmployee();
            } else {
                connection.end()
            }
        })

}



function viewEmployee() {
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

    ])
        .then(function (answers) {
            connection.connect(function (err) {
                if (answers.optionsAll === "View all employees") {
                    console.log(answers.optionsAll)
                    connection.query(`SELECT * FROM employee`, function (err, res) {
                        if (err) throw err;
                        console.table(res)
                        commenceSequence();
                    })


                } else {
                    let choice = answers.options
                    connection.query(`SELECT * FROM ${choice} ;`, function (err, res) {
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



}





//










// {
//     type: "input",
//     name: "departmentName",
//     message: "Please enter the Department Name",
//     when: function (answers) {
//         return answers.options === 'department';

//     }
// }










// {
//     type: "rawlist",
//         name: "departmentType",
//             message: "Which Dept do they work for?",
//                 choices: [
//                     'Front Desk',
//                     'Housekeeping',
//                     'Sales',
//                     "Engineering",
//                     "Administration"
//                 ]
// }



// ]).then(answers => {
//     if (answers.what === "Add?") {
//         addEmployee(answers);

//     } else if (answers.what === "View?") {
//         viewEmployee(answers);
//     }

// }).catch(error => {
//     console.log(error);
// })




function addEmployee(answers) {
    connection.query("SELECT * FROM department", function (err, res) {
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
                message: "Which Dept do they work for?",
                choices: function () {
                    let selectionArray = [];
                    for (let i = 0; i < res.length; i++) {
                        selectionArray.push(res[i].dept_name)
                    }
                    return selectionArray;
                }
            }

        ]).then(function (answers) {
            console.log(answers.select)
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


            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", [answers.firstName, answers.lastName, pick], function (err, res) {
                if (err) throw err;
                // connection.end();
                console.log(answers.firstName, "line87")
                console.log("Input received!");
            });



            commenceSequence();
        })
    })



}


function updateEmployee() {
    console.log("updateEmployee")
}


