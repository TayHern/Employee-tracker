const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const chalk = require('chalk');

connection.connect(err =>{
    if(err){
        return console.error('error:' + err.message);
    }

    console.log(chalk.bold.bgcyan('Employee Tracker'))
});

function mainMenu() {
    inquirer
        .prompt({
            name: "employer",
            type: "list",
            choices: [
                "View all departments",
                "View all employees",
                "View all roles",
                "View all employees by manager",
                "View all employees by department",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete department",
                "Delete role",
                "View department budget",
                "Exit"
            ]
        })
        
        .then(response => {
            switch(response.employer) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees by manager":
                    viewEmployeesByManager();
                    break;
                case "View all employees by department":
                    viewEmployeesByDepartment();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "Delete employee":
                    deleteEmployee();
                    break;
                case "Delete department":
                    deleteDepartment();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "View department budget":
                    viewDeptBudget();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        })
};

function viewDepartments() {
    
}