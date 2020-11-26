const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql')
let connection;



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
    console.log(answers.what, "line40")

    // if (answers.what === 'View?') {
    //     connection.query("SELECT * FROM employee;", function (err, data) {
    //         if (err) {
    //             return res.status(500).end();
    //         }
    //         console.table(data)
    //         // res.json({ plans: data });
    //     });
    // } else if (answers.what === 'Add?') {
    //     viewPrompt()
    // } else {
    //     console.log("Hello!!!")
    // }


}).catch(error => {
    console.log(error);
})



// function viewPrompt() {
//     inquirer.prompt([



//     ]).then(answers => {
//         console.log(answers);
//         console.log(connection);
//         connection.query("SELECT * FROM employee;", function (err, data) {
//             if (err) {
//                 return res.status(500).end();
//             }
//             console.table(data)
//             // res.json({ plans: data });
//         });

//     }).catch(error => {
//         console.log(error);
//     })

// }

// function initApp(connection) {
//     // console.log(connection);
//     connection = connection;
//     startApp();
// }

module.exports = {
     bacon: console.log("I love bacon")
}