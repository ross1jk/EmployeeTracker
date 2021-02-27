USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Fiance"), ("Engineering"), ("Sales"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 1), ("Account Manager", 75000, 1), ("Software Engineer", 80000, 2), ("Hardware Engineer", 82000, 2), ("Sales Lead", 62000, 3), ("Sales Associate", 55000, 3), ("Lawyer", 73000, 4), ("Paralegal", 50000, 4); 

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jessica", "Clark", 2);
-- 1. finance roles: 1 Accountant, 2 Account Manager
-- 2. engineering roles: 3 Software Engineer, 4 Hardware Engineer
-- 3. sales roles: 5 Sales Lead , 6 Sales Associate
-- 4. legal roles: 7 Lawyer, 8 Paralegal 