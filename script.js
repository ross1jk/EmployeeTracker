const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { start } = require('repl');
const { resourceLimits } = require('worker_threads');
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
    console.log("You Connected!"); // turn into welcome message 
    startEmployeeTracker();
});

const startEmployeeTracker = () => {
    inquirer.prompt({
        name: 'initChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department, role, or an employee',
            'View complete lists of departments, roles, or employees',
            'Update a current employee roles',
            'Quit Employee Tracker Application'
        ]
    }).then((answer) => {
        if (answer.initChoice === 'Add a department, role, or an employee') {
            console.log('Add a department, role, or an employee');
            add();
        }
        if (answer.initChoice === 'View complete lists of departments, roles, or employees') {
            console.log('View departments, roles, or employees');
            viewComplete();
        }
        if (answer.initChoice === 'Update a current employee roles') {
            console.log('Update a current employee roles');
            update()
        }
        if (answer.initChoice === 'Quit Employee Tracker Application') {
            console.log('Thank you for using Employee Tracker');
            connection.end();
        }
    });
};

const add = () => {
    inquirer.prompt({
        name: 'add',
        type: 'list',
        message: 'Would you like to add a department, role, or employee?',
        choices: [
            'Department',
            'Role',
            'Employee'
        ]
    }).then((answer) => {
        if (answer.add === 'Department') {
            inquirer.prompt({
                name: 'departAdd',
                type: 'input',
                message: 'What is the department name you would like to add?'
            }).then((answer) => {
                connection.query('INSERT INTO department SET ?',
                    {
                        name: answer.departAdd
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`${answer.departAdd} added to departments`);
                        startEmployeeTracker();
                    }
                );
            });
        }
        if (answer.add === 'Role') {
            inquirer.prompt(
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the Role title?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary?'
                },
                {
                    name: 'department',
                    type: 'input',
                    message: 'What is the department ID for this role?'
                }
            ).then((answer) => {
                connection.query('INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`${answer.title} added to roles`);
                    }
                );
            });
        }
        if (answer.add == 'Employee') {
            inquirer.prompt([
                {
                    name: 'first',
                    type: 'input',
                    message: 'What is the employees frist name?'
                }, 
                {
                    name: 'last',
                    type: 'input',
                    message: 'What is the employees last name?'
                },
                {
                    name: 'role',
                    type: 'input',
                    message: 'What is the employees role id'
                },
                {
                    name: 'manager',
                    type: 'input',
                    message: 'What is the employees Managers ID?'
                }
            ]).then((answer) => {
                connection.query('INSERT INTO employee SET ?',
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                (err) => {
                    if (err) throw err;
                    console.log(`${answer.first} ${answer.last} added to employees`);
                }
                );
                startEmployeeTracker(); 
           }); 
        }
    });
};





// working
const viewComplete = () => {
    inquirer.prompt({
        name: 'view',
        type: 'list',
        message: 'What would you like to view?',
        choices: [
            'Departments',
            'Roles',
            'Employees',
            'All',
        ]
    }).then((answer) => {
        if (answer.view === 'Departments') {
            connection.query(
                'SELECT * FROM department', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                }
            );
        }
        if (answer.view === 'Roles') {
            connection.query(
                'SELECT * FROM role', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                }
            );
        }
        if (answer.view === 'Employees') {
            connection.query(
                'SELECT * FROM employee', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                }
            );
        }
        if (answer.view === 'All') {
            connection.query(
            `SELECT * FROM employee_trackerDB.role
            INNER JOIN employee_trackerDB.employee
            ON role.id = employee.role_id
            INNER JOIN employee_trackerDB.department
            ON role.department_id = department.id;`, (err, res) => {
                if (err) throw err;
                console.table(res);
            });
        }
        startEmployeeTracker();
    });

};


const update = () => {
    console.log("fill")
}

// bonus come back 
    // Update employee managers

    // View employees by manager

    // Delete departments, roles, and employees

    // View the total utilized budget of a department -- combined salaries of all employees in that department