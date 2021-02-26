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
            'Update a current employee roles',
            'Quit Employee Tracker Application'
        ]
    }).then((answer) => {
        if (answer.initChoice === 'Add a department, role, or an employee'){
            console.log('Add a department, role, or an employee');
            add(); 
        } 
        if (answer.initChoice === 'View departments, roles, or employees'){
            console.log('View departments, roles, or employees'); 
            view(); 
        }
        if (answer.initChoice === 'Update a current employee roles'){
            console.log('Update a current employee roles'); 
            update()
        }
        if (answer.initChoice === 'Quit Employee Tracker Application'){
            console.log('Thank you for using Employee Tracker'); 
            connection.end();
        }
   }); 
};

const add = () => {
    console.log("function add is being read"); 
    startEmployeeTracker(); 
    // Add departments, roles, employees
    // inquirer.prompt > input 
}; 

const view = () => {
    console.log("function view is being read"); 
    startEmployeeTracker(); 
    // View departments, roles, employees
    // inquirer.prompt > choices

}; 

const update = () => {
    console.log("function update is being read"); 
    startEmployeeTracker(); 
    // Update employee roles
    // inquirer.prompt > choices > then input 
}


// bonus come back 
    // Update employee managers

    // View employees by manager

    // Delete departments, roles, and employees

    // View the total utilized budget of a department -- combined salaries of all employees in that department