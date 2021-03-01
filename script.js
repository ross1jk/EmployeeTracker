const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { start } = require('repl');
const { resourceLimits } = require('worker_threads');
const { listenerCount } = require('events');

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
    console.log(`
     __________________________________
    |                                  |
    |                                  |
    | Welcome to the Employee Tracker! |
    |                                  |
    |__________________________________|
    
    `);

    // These functions are retuurning a list of the current names with their values to be used throughout the applicaiton
    connection.query("SELECT * FROM department", function (err, res) {
        displayCurrentDepartments = res.map(department => ({ name: department.name, value: department.id }))
    });

    connection.query("SELECT * FROM role", function (err, res) {
        displayCurrentRoles = res.map(role => ({ name: role.title, value: role.id }))
    });

    connection.query("SELECT * FROM employee", function (err, res) {
        displayCurrentEmployees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
    });

    // connection.query("SELECT * FROM employee", function (err, res){
    //     displayManagers = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.manager_id }))
    // }); 

    startEmployeeTracker();
});

const startEmployeeTracker = () => {
    inquirer.prompt({
        name: 'initChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            `Add a new department, role, or an employee`,
            'View complete lists of departments, roles, or employees',
            `Update a Current Employee's Role`,
            `Update an Employee's Manager`,
            'Delete a department, role, or an employee',
            `View each department's total utilized budget`,
            `View departments by Manager`,
            'Quit Employee Tracker Application'
        ]
    }).then((answer) => {
        switch (answer.initChoice) {
            case `Add a new department, role, or an employee`:
                add();
                break;
            case 'View complete lists of departments, roles, or employees':
                viewComplete();
                break;
            case `Update a Current Employee's Role`:
                updateRole();
                break;
            case `Update an Employee's Manager`:
                updateManger();
                break;
            case `Delete a department, role, or an employee`:
                deleteEntry();
                break;
            case `View each department's total utilized budget`:
                utilizedBudget();
                break;
            case `View departments by Manager`:
                managerView();
                break;
            case 'Quit Employee Tracker Application':
                console.log(`
                 _________________________________
                |                                 |
                |       Thank you for using       |
                |        Employee Tracker!        |
                |_________________________________| 

                `)
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
            inquirer.prompt([
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
                    type: 'list',
                    choices: displayCurrentDepartments,
                    message: 'What department is this role in?'
                }
            ]).then((answer) => {
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
                startEmployeeTracker();
            });
        }
        if (answer.add === 'Employee') {
            inquirer.prompt([
                {
                    name: 'first',
                    type: 'input',
                    message: `What is the employee's frist name?`
                },
                {
                    name: 'last',
                    type: 'input',
                    message: `What is the employee's last name?`
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: displayCurrentRoles,
                    message: `What is the employee's role?`
                },
                {
                    name: 'manager',
                    type: 'list',
                    choices: displayCurrentEmployees,
                    message: `What is the employee's Manager's ID?`
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
                    console.table(`

                    Current Departments`, res);
                }
            );
        }
        if (answer.view === 'Roles') {
            connection.query(
                'SELECT * FROM role', (err, res) => {
                    if (err) throw err;
                    console.table(`
                    
                    Current Roles`, res);
                }
            );
        }
        if (answer.view === 'Employees') {
            connection.query(
                'SELECT * FROM employee', (err, res) => {
                    if (err) throw err;
                    console.table(`
                    
                    Current Employees`, res);
                }
            );
        }
        if (answer.view === 'All') {
            connection.query(
                `
                SELECT first_name, last_name, salary, title, name, manager_id FROM employee_trackerDB.employee
                INNER JOIN employee_trackerDB.role
                ON employee.role_id = role.id
                INNER JOIN employee_trackerDB.department
                ON role.department_id = department.id;
                `, (err, res) => {
                if (err) throw err;
                console.table(`
                    
                Complete Department Chart`, res);
            });
        }
        startEmployeeTracker();
    });

};

const updateRole = () => {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            choices: displayCurrentEmployees,
            message: 'Which Employee would you like to update?',
        },
        {
            name: 'role',
            type: 'list',
            choices: displayCurrentRoles,
            message: 'What is their updated role?',
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    role_id: answer.role
                },
                {
                    id: answer.employee
                }
            ]);

        console.log(`The employee's current role has been updated`);
        startEmployeeTracker();
    });
};

const updateManger = () => {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            choices: displayCurrentEmployees,
            message: `Which employee's manager needs to be updated?`

        },
        {
            name: 'manager',
            type: 'list',
            choices: displayCurrentEmployees,
            message: `Who is their new manager?`
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    manager_id: answer.manager
                },
                {
                    id: answer.employee
                }
            ]);

        console.log(`Your Employee's manager has been updated`);
        startEmployeeTracker();
    })
}

const deleteEntry = () => {
    inquirer.prompt([
        {
            name: 'deleteChoice',
            type: 'list',
            message: 'What would you like to delete?',
            choices: [
                "Department",
                "Role",
                "Employee"
            ]
        }
    ]).then((answer) => {
        if (answer.deleteChoice === "Department") {
            inquirer.prompt([
                {
                    name: 'deleteDepart',
                    type: 'list',
                    message: 'Which Department would you like to delete?',
                    choices: displayCurrentDepartments
                }
            ]).then((answer) => {
                connection.query('DELETE FROM department WHERE ?',
                    {
                        id: answer.deleteDepart
                    },
                );
                console.log(`Department has been deleted`);
                startEmployeeTracker();
            });
        }
        if (answer.deleteChoice === "Role") {
            inquirer.prompt([
                {
                    name: 'deleteRole',
                    type: 'list',
                    message: 'Which role would you like to delete?',
                    choices: displayCurrentRoles
                }
            ]).then((answer) => {
                connection.query('DELETE FROM role WHERE ?',
                    {
                        id: answer.deleteRole
                    },
                );
                console.log("Role has been deleted");
                startEmployeeTracker();
            });
        }
        if (answer.deleteChoice === "Employee") {
            inquirer.prompt([
                {
                    name: 'deleteEmployee',
                    type: 'list',
                    message: 'Which Employee would you like to delete?',
                    choices: displayCurrentEmployees
                }
            ]).then((answer) => {
                connection.query('DELETE FROM employee WHERE ?',
                    {
                        id: answer.deleteEmployee
                    },
                );
                console.log("Employee has been deleted");
                startEmployeeTracker();
            });
        }
    });

};

const utilizedBudget = () => {
    connection.query(`SELECT name, SUM(salary)
    FROM employee_trackerDB.employee
    INNER JOIN employee_trackerDB.role ON employee.role_id = role.id
    INNER JOIN employee_trackerDB.department ON role.department_id = department.id
    GROUP BY department.id;`, (err, res) => {
        if (err) throw err;
        console.table(`
        
        Utilized Budget per Department`, res);
    });
    startEmployeeTracker();
}

const managerView = () => {
    // inquirer.prompt([
    //     {
    //         name: 'managerview',
    //         type: 'list', 
    //         message: `Which manager's department would you like to view?`,
    //         choices: 
    //     }
    // ]).then((answer) => {
    connection.query(`SELECT id, first_name, last_name, manager_id FROM employee_trackerDB.employee
      ORDER BY manager_id;`, (err, res) => {
        if (err) throw err;
        console.table(`
          
          Manager's Department View`, res);
    });
    startEmployeeTracker();
    //  })
}