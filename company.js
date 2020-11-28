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

    inquirer.prompt(


        {
            type: 'list',
            name: 'options',
            message: 'Which would you like to view?',
            choices: [
                'department',
                'role',
                'employee'
            ],


        },

    ).then(function(answers) {
        connection.connect(function (err) {
            let choice = answers.options   
    
            connection.query(`SELECT * FROM ${choice} ;`, function (err, res) {
                if (err) {
                    console.error(err.stack)
                    return;
                }
                console.table(res)
                commenceSequence();
    
            })
        })


    })


    
}









// {
//     type: "input",
//         name: "firstName",
//             message: "What is the first name?",
//                 when: function (answers) {
//                     return answers.what === 'Update Employee Roles' ||
//                         answers.what === "Add?";
//                 }
// },
// {
//     type: "input",
//         name: "lastName",
//             message: "What is the last name?",
//                 when: function (answers) {
//                     return answers.what === 'Update Employee Roles' ||
//                         answers.what === "Add?";
//                 }
// },











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
    console.log("addEmployee")

    // connection.connect(function (err) {

    //     if (err) {
    //         console.error("No Go my guy, failure connecting to database " + err.stack)
    //         return;
    //     }
    //     console.log("EUERKA!!! " + connection.threadId)
    //     connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", [answers.firstName, answers.lastName, x], function (err, res) {
    //         if (err) throw err;
    //         // connection.end();
    //         console.log(answers.firstName, "line87")
    //         console.log("Input received!");
    //     });


    // });

}


function updateEmployee(){
    console.log("updateEmployee")
}


