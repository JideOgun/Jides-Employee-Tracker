const inquirer = require('inquirer');
const server = require('./server');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const cTable = require('console.table');


const promptStart = () => {

return inquirer.prompt([
    
    {     
        type: 'list',
        name: 'startlist',
        message: 'What would you like to do? (Select one of the following)',
        choices: ['View all departments', 'View all roles', 'View all Employees', 'Add Departments', 'Add a role', 'Add an Employee', 'Update Employee Role']
    }
]).then((answers) => {
  // VIEW ALL DEPARTMENTS
if(answers.startlist === 'View all departments') {
     displayDept();    
  } // VIEW ALL ROLES
  else if (answers.startlist === 'View all roles') {
    displayRole();
  } // VIEW ALL EMPLOYEES
  else if(answers.startlist === 'View all Employees') {
   displayEmployees();
  } // ADD A DEPARTMENT
  else if (answers.startlist === 'Add Departments') {
    addDept();
  } // ADD  A NEW ROLE
  else if (answers.startlist === 'Add a role') {
    addRole();
  } // ADD AN EMPLOYEE
  else if (answers.startlist === 'Add an Employee') {
    addEmployee();
  }
});
};

const displayRole = () => {
  const sql = `SELECT role.role_id, role.title, role.salary, department.name from role INNER JOIN department on role.department_id = department.dept_id;`;
    db.query(sql, (err, rows) => {
      if(err) {
        console.log(err);
        return;
      }
    console.table(rows);
    restart();
  }); 
};

 const restart = () => {
 inquirer.prompt([
      {
        type: 'list',
        name: 'restart',
        message: 'select an option',
        choices: ['menu', 'quit']
      }
    ]).then(e => {
      if(e.restart === 'menu') {
        promptStart();
      } else {Quit();}
    });
  
  };


const displayDept = () => {
 const sql = `SELECT * from department`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return;
    }
  console.table(rows);
  restart();
});
};

const displayEmployees = () => {
  const sql = `SELECT *, role.salary, role.title FROM employee 
  INNER JOIN role ON employee.role_id = role.role_id; `;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return;
    }
  console.table(rows);
  restart();
}); 
};


// ADD DEPARTMENT FUNCTION
const addDept = () => {
  
 let sql_query1 = `SELECT * FROM department;`;
 db.query(sql_query1, async (err, rows) => {
if(err) {
  console.log(err);
  return;
}

   const deptAnswers = await inquirer.prompt([
     {
       type: 'Input',
       name: 'DeptId',
       message: 'Add a new department id'
     },
     {
       type: 'Input',
       name: 'DeptName',
       message: 'Add a new department name'
     }
   ]);
   let sql_query2 = 'INSERT INTO department VALUES(?, ?)';
   let params = [deptAnswers.DeptId, deptAnswers.DeptName];
   db.query(sql_query2, params, (err_1, rows_1) => {
     if (err_1) {
       console.log(err_1);
     }
     console.log(`${params[1]} has been added to the department!`);
   });
   restart();
 });
};

// ADD A ROLE FUNCTION
const addRole = () => {
let sql_query1 = `SELECT * FROM role`;
db.query(sql_query1, (err, rows) => {
if(err) {
  console.log(err);
  return;
}

inquirer.prompt([
  {
    type: 'Input',
    name: 'roleId',
    message: 'What is the Id of the role ?'
  },
  {
    type: 'Input',
    name: 'roleTitle',
    message: 'What is the title of the role?'
  },
  {
    type: 'Input',
    name: 'roleSalary',
    message: 'What is the salary for this role?'
  },
  {
    type: 'Input',
    name: 'roleManager',
    message: 'Who is the manager for this role?'
  },
  {
    type: 'Input',
    name: 'roleDeptId',
    message: 'What is the deptId for this role?'
  }
]).then(roleAnswers => {
  let sql_query2 = `INSERT INTO role VALUES(?, ?, ?, ?, ?)`;
  let params = [roleAnswers.roleId, roleAnswers.roleTitle, roleAnswers.roleSalary, roleAnswers.roleManager, roleAnswers.roleDeptId];
  db.query(sql_query2, params, (err, rows) => {
    if(err) {console.log(err);}
    console.log(`${roleAnswers.roleTitle} has been added to roles`);
  });
  restart();
});
});
};

// ADD AN EMPLOYEE FUNCTION
const addEmployee = () => {
  let sql_query1 = `SELECT * FROM employee`;
  db.query(sql_query1, (err, rows) => {
  if(err) {
    console.log(err);
    return;
  }
  
  inquirer.prompt([
    {
      type: 'Input',
      name: 'employeeId',
      message: 'What is the employee Id ?'
    },
    {
      type: 'Input',
      name: 'fname',
      message: 'What is the employee first name ?'
    },
    {
      type: 'Input',
      name: 'lname',
      message: 'What is the employee last name?'
    },
    {
      type: 'Input',
      name: 'roleId',
      message: 'What is the employee role id?'
    },
    {
      type: 'Input',
      name: 'managerId',
      message: 'What is the manager id?'
    },
    {
      type: 'Input',
      name: 'deptId',
      message: 'What is the employee deptId?'
    }
  ]).then(empAnswers => {
    let sql_query2 = `INSERT INTO employee VALUES(?, ?, ?, ?, ?, ?)`;
    let params = [empAnswers.employeeId, empAnswers.fname, empAnswers.lname, empAnswers.roleId, empAnswers.managerId, empAnswers.deptId];
    db.query(sql_query2, params, (err, rows) => {
      if(err) {console.log(err);}
      console.log(`${empAnswers.fname} ${empAnswers.lname} has been added to the employees`);
    });
    restart();
  });
  });
  };






const Quit = () => {
console.log('Goodbye!');
process.exit();
};
promptStart();
