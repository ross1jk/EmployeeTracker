# Employee Tracker

![badge](https://img.shields.io/static/v1?label=License&message=MIT%20License&color=blue)
  
## Description

Through this application a business owner will be able to view and manage departments, roles and employees in their companies so they can organise and plan their business.

Developers are often tasked with creating interfaces that make it easy for non-developers to View and interact with information stored in databases easily using this **C**ontent **M**anagement **S**ystems application. This application utilizes node, [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3), and [MySQL](https://www.npmjs.com/package/mysql) to manage a company’s employees.

## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [Schema](#Schema)
* [Mockup](#Mock-Up)
* [License](#License)
* [Tests](#Tests)
* [Questions](#Questions)
  
## Installation

First, ensure that that you have [node.js](https://nodejs.org/en/) installed.
Once this is application is cloned down to your Visual Studio, you will first need to run the following commands to initialize your repository and install inquirer:

* npm init -y
* npm install inquirer
* npm install mysql

## Usage

This application uses npm inquirer to gather information from a user and dynamically adds that information to an employee database in MySQL.

To run this application on your own device locally you will need to download this repository and run the following commands in your terminal:

**node script.js**

Then answer the questions that appear accordingly.

Please view the following tutorial to see the full functionality of the Employee Application:

[Application Tutorial](https://drive.google.com/file/d/1jmObDP7NoCBfWrvpvdc9kLSZKozkqxc1/view)

[MySQL Workbench and Application Link](https://drive.google.com/file/d/1vlTOmWNkxQvWlCItFKA0-V6iLT1nqz5T/view)

## Employee Database Schema

![Database Schema](Assets/schema.png)

```
* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
```

## Mock-Up

Below is a look into one of many possibilities that is provided through the Employee Tracker Application. 

### Application Possibilities

* Add departments, roles, employees

* View departments, roles, employees

* Update employee roles

* Update employee managers

* View employees by manager

* Delete departments, roles, and employees

* View the total utilized budget of a department

## License

This application has a MIT License type. Please read more about permissions at [Choose A License](https://choosealicense.com/licenses/)

## Questions

Please reach out to me with any additional questions by contacting me.

* GitHub Profile: https://github.com/ross1jk
* My Email Address: Jacqueline.ross09@gmail.com
