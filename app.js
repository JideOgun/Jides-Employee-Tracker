const inquirer = require('inquirer');
const server = require('./server');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const cTable = require('console.table');
const { commit } = require('./db/connection');



const promptStart = async () => {

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'startlist',
      message: 'What would you like to do? (Select one of the following)',
      choices: ['View all departments', 'View all roles', 'View all Employees', 'Add Departments', 'Add a role', 'Add an Employee', 'Update Employee Role', 'Delete role', 'View by Manager', 'Delete Employee', 'Delete Department']
    }
  ]);
  // VIEW ALL DEPARTMENTS
  if (answers.startlist === 'View all departments') {
    displayDept();
  } // VIEW ALL ROLES
  else if (answers.startlist === 'View all roles') {
    displayRole();
  } // VIEW ALL EMPLOYEES
  else if (answers.startlist === 'View all Employees') {
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
  } else if (answers.startlist === 'Update Employee Role') {
    updateEmp();
  } else if (answers.startlist === 'Delete role') {
    deleteRole();
  } else if (answers.startlist === 'View by Manager') {
    displayByManager();
  }  else if (answers.startlist === 'Delete Employee') {
    deleteEmployee();
  } else if (answers.startlist === 'Delete Department') {
    deleteDept();
  } 
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

// DISPLAY EMPLOYEES BY MANAGER
const displayByManager = () => {
const sql = `SELECT employee.first_name, employee.last_name, role.manager
 from employee INNER JOIN role ON employee.role_id = role.role_id`;
db.query(sql, (err, rows) => {
  if(err) {
    console.log(err);
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

//DELETE DEPARTMENT FUNCTION
const deleteDept = () => {
let sql1 = `SELECT * FROM department`;
db.query(sql1, (err, row) => {
  if(err) {
    console.log(err);
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'deptId',
      message: 'Select the department to delete',
      choices: row.map(dept => {
        return { name: `${dept.name}`, value: dept.dept_id};
      })
    }
  ]).then(answer => {
    let sql2 = `DELETE FROM department WHERE ?`;
    params = [{ dept_id: answer.deptId}];
    db.query(sql2, params, (err, res) => {
      if(err) {
        console.log(err);
      }
      console.log('Department has been deleted!');
      restart();
    });
  });
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

  // UPDATE EMPLOYEE FUNCTION
  const updateEmp = () => {
let sql_query = `SELECT * FROM employee`;
db.query(sql_query, (err, rows) => {
  const employees = rows.map(element => {
    return {
      name: `${element.first_name} ${element.last_name}`,
      value: element.employee_id
    };
  });

  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee would you like to update?',
      choices: employees
    }
  ]).then(updateInput1 => {
    db.query('SELECT * FROM role', (err, res) => {
      const roles = res.map(function (role) {
        return {
          name: role.title,
          value: role.role_id
        };
      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the employees new role?',
          choices: roles
        }
      ]).then(updateInput2 => {
        const sql_query1 = `UPDATE employee SET employee.role_id = ? WHERE employee.employee_id = ?`;
        params = [updateInput2.roleId, updateInput1.employeeId];
        
        db.query(sql_query1, params, (err, rows) => {
          let placeholderPos;
          for (let i = 0; i < roles.length; i++) {
            if(roles[i].value == updateInput2.roleId) {
              placeholderPos = roles[i].name;
            }          
          }
          let placeholderName;
          for (let j = 0; j < employees.length; j++) {
            if(employees[j].value == updateInput1.employeeId) {
            placeholderName = employees[j].name;
            }
          }
          if(rows.changedRows === 1) {
            console.log(`You have updated ${placeholderName} to ${placeholderPos}`);
          } else {
            console.log(`Error: ${placeholderName} is still ${placeholderPos}`);
        }
        restart();
        });
      });
    });
  });
});
};

// DELETE EMPLOYEE FUNCTION 
const deleteEmployee = () => {
let sql1 = `SELECT * FROM employee`;
db.query(sql1, (err, rows) => {
  if(err) {
    console.log(err);
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select employee to delete',
      choices: rows.map(emp => {
        return { name: `${emp.first_name} ${emp.last_name}`,
         value: emp.employee_id};
      })
    }
  ])
  .then(answer => {
  let sql2 = `DELETE FROM employee WHERE ?`;
  let params = [{ employee_id: answer.employeeId}];
  db.query(sql2, params, (err, res) => {
    if(err) {
      console.log(err);
    }
    console.log("Employee has been deleted");
    restart();
  });
});
});

};

//FUNCTION TO REMOVE ROLE
const deleteRole = () => {
let sql1 = `SELECT * FROM role`;
db.query(sql1, (err,rows) => {
  if(err) {
    console.log(err);
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete',
      choices: rows.map(roles => {
        return { name: `${roles.title}`, value: roles.role_id};
      })
    }
  ])
  .then(answer => {
    let sql2 = `DELETE FROM role WHERE ?`;
    params = [{role_id: answer.roleId}];
    db.query(sql2, params,  (err, res) => {
      if(err) {
        console.log(err);
      }
      console.log("Role has been deleted!");
      restart();
    });
  });
});
};


const Quit = () => {
console.log('Goodbye!');
process.exit();
};
promptStart();
