const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
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
});

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