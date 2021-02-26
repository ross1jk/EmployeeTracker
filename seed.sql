
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
      manager_id INT 


