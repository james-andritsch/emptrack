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
            "Update role",
            "Delete department",
            "Delete employee",
            "Delete role",
            "Exit"
        ]
    }])
    
}