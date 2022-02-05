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
        choices: ['View all departments', 'View all roles', 'View all Employees', 'View all Employees by department', 'View all Employees by manager', 'Add Departments', 'Add a role', 'Add an Employee', 'Update Employee Role']
    }
]).then((answers) => {
  // VIEW ALL DEPARTMENTS
  if(answers.startlist === 'View all departments') {
    promptDept().then(deptchoice => {
      // VIEW ALL DEPARTMENTS BY FIELD PLAYERS
      if(deptchoice.dept === 'Field Players') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name, employee.role_id,
         role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.department_id = 1;`;
      db.query(sql, (err, rows) => {
        if(err) {
          console.log(err);
          return;
        }
        console.table(rows);
      }); // VIEW ALL DEPARTMENTS BY MEDICAL STAFF
      } else if (deptchoice.dept === 'Medical Staff') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name, employee.role_id,
         role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.department_id = 2;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        }); // VIEW ALL DEPARTMENTS BY COACHING STAFF
      } else if (deptchoice.dept === 'Coaching Staff') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name, employee.role_id,
         role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.department_id = 3;`;
      db.query(sql, (err, rows) => {
        if(err) {
          console.log(err);
          return;
        }
        console.table(rows);
      });
      }
      
    });
      
  } // VIEW ALL ROLES SECTIONS
  else if (answers.startlist === 'View all roles') {
    promptRole().then(roleChoices => {
      // VIEW ROLES BY CENTER FORWARDS
      if(roleChoices.roles === 'Center Forward') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
         role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 1;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      }  // VIEW ROLES BY MIDFIELDERS
      else if (roleChoices.roles === 'Midfielder') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 2;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY DEFENDERS
      else if (roleChoices.roles === 'Defender') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 3;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY GOAL KEEPERS
      else if (roleChoices.roles === 'Goal Keeper') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 4;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY FITNESS COACH
      else if (roleChoices.roles === 'Fitness Coach') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 5;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY TEAM DOCTOR
      else if (roleChoices.roles === 'Team Doctor') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 6;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY PLAYERS COACH
      else if (roleChoices.roles === 'Players Coach') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 7;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      } // VIEW ROLES BY FIRST TEAM COACH
      else if (roleChoices.roles === 'First Team Coach') {
        const sql = `SELECT employee.employee_id, role.role_id, employee.first_name, employee.last_name,
        role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id WHERE role.role_id = 8;`;
        db.query(sql, (err, rows) => {
          if(err) {
            console.log(err);
            return;
          }
          console.table(rows);
        });
      }
    });
  } else if // VIEW ALL EMPLOYEES
  (answers.startlist === 'View all Employees') {

    const sql = `select employee.employee_id, role.role_id, role.title, employee.first_name, employee.last_name, department.name, 
    role.manager, role.salary FROM role INNER JOIN employee ON role.role_id = employee.role_id INNER JOIN department ON role.department_id = department.dept_id;`;
    db.query(sql, (err, rows) => {
      if(err) {
        console.log(err);
        return;
      }
      console.table(rows);
      restart();
    });
    
  }
 
});
};

const promptRole = () => {
  return inquirer.prompt([
  {
    type: 'list',
    name: 'roles',
    message: 'Select a role from the following',
    choices: ['Center Forward','Midfielder', 'Defender','Goal Keeper','Fitness Coach','Team Doctor', 'Players Coach', 'First Team Coach']
  }
  ]
  ); 
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


const promptDept = () => {
return inquirer.prompt([
  {
    type: 'list',
    name: 'dept',
    message: 'Select one of the following departments',
    choices: ['Field Players', 'Medical Staff', 'Coaching Staff']
  },
]);
};

const promptAddDept = () => {
return inquirer.prompt([
  {
    type: 'confirm',
    name: 'addDept',
    message: 'Would you like to add a department?',
    default: false

  }
]);
};

const Quit = () => {
console.log('Goodbye!');
process.exit();
};
promptStart();
