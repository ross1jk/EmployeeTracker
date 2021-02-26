const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { start } = require('repl');
// https://www.npmjs.com/package/console.table 

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // look into changing password 
    password: '',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("You Connected!"); 
    startEmployeeTracker(); 
});

const startEmployeeTracker = () => {
    inquirer.prompt({
        name: 'initChoice',
        type: 'list', 
        message: 'What would you like to do?',
        choices: [
            'Add a department, role, or an employee',
            'View departments, roles, or employees', 
            'Update a current employee roles'
        ]
    }).then((answer) => {
        if (answer.initChoice === 'Add a department, role, or an employee'){
            console.log('Add a department, role, or an employee');
            connection.end(); 
        } 
        if (answer.initChoice === 'View departments, roles, or employees'){
            console.log('View departments, roles, or employees'); 
            connection.end();
        }
        if (answer.initChoice === 'Update a current employee roles'){
            console.log('Update a current employee roles'); 
            connection.end();
        }
   }); 
};
// three tables common collumn = id 

// table one: department 
// table two: role
// table three: employee 

// need to be able to:
// Add departments, roles, employees
    // inquirer.prompt > input 
// View departments, roles, employees
    // inquirer.prompt > choices
// Update employee roles
    // inquirer.prompt > choices > then input 


// bonus come back 
    // Update employee managers

    // View employees by manager

    // Delete departments, roles, and employees

    // View the total utilized budget of a department -- combined salaries of all employees in that department