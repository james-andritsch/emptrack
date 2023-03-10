const consoleTable = require('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');
const { createConnection } = require('net');
const { workerData } = require('worker_threads');

createConnection.connect(function (err) {
    if (err) throw (err);
    console.log("connected as id " + createConnection.threadId);
    job();
})

const job = () => {
    inquirer.createPromptModule([{
        name: "choice",
        type: "list",
        message: "What?",
        choices: [
            "View all departments",
            "View all employees",
            "view all roles",
            "Add new department",
            "Add new employee",
            "Add new role",
            "Update a role",
            "Delete a department",
            "Delete an employee",
            "Delete role",
            "Exit"
        ]
    }])
    .then(function (answer) {
        switch (answer.choice) {
            case "View all departments":
                vAllDepts();
                break;
            case "View all employees":
                vAllEmps();
                break;
            case "View all roles":
                vAllRoles();
                break;
            case "Add new department":
                addDept();
                break;
            case "Add new employee":
                addEmp();
                break;
            case "Add new role":
                addRole();
                break;
            case "Update role":
                updateRole();
                break;
            case "Delete a department":
                delDepts();
                break;
            case "Delete an employee":
                delEmp();
                break;
            case "Delete a role":
                delRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
};

const vAllDepts = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        job();
    })
};

const vAllEmps = () => {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        job();
    })
};

const vAllRoles = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        job();
    })
}

const addDept = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        
        inquirer.createPromptModule([
            {
                name: "department",
                type: "input",
                message: "What is the name of the new department?"
            },

        ]).then (function (answer) {
            connection.query('INSERT INTO departments SET ?', {
                name: answer.department
            }, function (err) {
                if (err) throw err;
                console.log("You added a department!");
                job();
            }
            )
        })
    })
}

const addEmp = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        
        inquirer.createPromptModule([
            {
                name: "first_name",
                type: "input",
                message: "What is their first name?"
            },

            {
                name: "last_name",
                type: "input",
                message: "What is their last name?"
            },

            {
                name: "role_id",
                type: "input",
                message: "What is their role?",
                choices: res.map(role => role.title)
            }

        ]).then (function (answer) {

            const roleId = res.find(role => role.title === answer.role_id).id;
            connection.query('INSERT INTO employees SET ?', {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: roleId
            }, function (err) {
                if (err) throw err;
                console.log("You added a department!");
                job();
            }
            )
        })
    })
}