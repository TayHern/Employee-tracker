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

	
function viewAllDepartments() {
    let query = "SELECT * FROM  departments";
    connection.query(query, function(err, res) {
        console.log(`                              ` + chalk.bgYellow.bold(`All Departments:`));

        console.table(res);
        mainMenu();
    });
};


function viewAllEmployees() {
    let query = "SELECT e.id, e.first_name, e.last_name, roles.title, departments.department_name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY id ASC";
    connection.query(query, function(err, res) {
        console.log(`                              ` + chalk.bgGreen.bold(`Current Employees:`));

        console.table(res);
        mainMenu();
    });
};


function viewRoles() {
    let query = `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
              FROM roles
              INNER JOIN departments ON roles.department_id = departments.id`;

    connection.query(query, function(err, res) {
        console.log(`                              ` + chalk.bgBlue.bold(`Current Employee Roles:`));

        console.table(res);
        mainMenu();
    });
};

function viewEmployeesByDepartment() {
    console.log("Viewing employees by department\n");
  

    var query =
      `SELECT d.id, d.name
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  

    connection.query(query, function (err, res) {
      if (err) throw err;
  

      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  

      console.table(res);
      console.log("Department view succeed!\n");
  

      promptDepartment(departmentChoices);
    });
  };

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "deptID",
                type: "input",
                message: "What is the ID of the new department?",
            },
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the new department?",
            }
        ])

        .then(function(response) {
            connection.query("INSERT INTO departments SET ?", {
                    id: response.deptID,
                    department_name: response.deptName,
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    mainMenu();
                }
            );
        });
};

function addRole() {
    inquirer
        .prompt([
            {
             name: 'roleID',
             type: "input",
             message: "what is the role's Id?"   
            },
            {
             name: 'roleTitle',
             type: "input",
             message: "what is the name for the role?"   
            },
            {
             name: 'roleSalary',
             type: "input",
             message: "what is the role's salary?"   
            },
        ])

        .then(function(response) {
            connection.query("INSERT INTO roles SET ?", {
                id: response.roleID,
                title: response.roleTtile,
                salary: response.roleSalary,
                department_id: response.roleDepartment,
            },
            function(err) {
                if (err) throw err;
                console.log("Your new role was created successfully!");
                mainMenu();
            }
        );
    });
};


function addEmployee() {
inquirer
    .prompt([
        {
            name: "employeeID",
            type: "input",
            message: "What is the ID of the new employee?",
        },
        {
            name: "empFirstName",
            type: "input",
            message: "What is the first name of the new employee?",
        },
        {
            name: "empLastName",
            type: "input",
            message: "What is the last name of the new employee?",
        },
        {
            name: "empRole",
            type: "input",
            message: "What is the role ID for the new employee?",
        },
        {
            name: "empManager",
            type: "input",
            message: "What is id of the new employee's manager?",
        }
    ])


    .then(function(response) {
        connection.query("INSERT INTO employee SET ?", {
                id: response.employeeID,
                first_name: response.empFirstName,
                last_name: response.empLastName,
                role_id: response.empRole,
                manager_id: response.empManager,
            },
            function(err) {
                if (err) throw err;
                console.log("Your new employee was created successfully!");
                mainMenu();
            }
        );
    });
};





