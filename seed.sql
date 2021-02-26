
/* table one: department 
   table two: role
   table three: employee 

  1.Department 
   Columns:
        id INT PRIMARY KEY 
        NAME VAR CHAR 30 - departmenat name 
    
   2.Role
    Columns:
        id INT PRIMARY KEY
        title VARCHAR(30) - role title 
        salary DECIMAL 
        department_id INT 

   3. Employee
      Columns: 
      id INT PRIMARY KEY
      first_name VARCHAR(30)
      last_name VARCHAR(30)
      role_id INT
      manager_id INT */

DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Fiance"), ("Engineering"), ("Sales"), ("Legal");
-- 1. finance roles: 1 Accountant, 2 Account Manager
-- 2. engineering roles: 3 Software Engineer, 4 Hardware Engineer
-- 3. sales roles: 5 Sales Lead , 6 Sales Associate
-- 4. legal roles: 7 Lawyer, 8 Paralegal 
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 1), ("Account Manager", 75000, 1), ("Software Engineer", 80000, 2), ("Hardware Engineer", 82000, 2), ("Sales Lead", 62000, 3), ("Sales Associate", 55000, 3), ("Lawyer", 73000, 4), ("Paralegal", 50000, 4); 

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jessica", "Clark", 2);
