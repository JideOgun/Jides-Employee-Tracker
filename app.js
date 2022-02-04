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
        choices: ['View all Employees', 'View all Employees by department', 'View all Employees by manager', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Departments']
    },
]);
};


promptStart().then((answers) => {
        
        if(answers.startlist === 'View all Employees') {
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, rows) => {
              if(err) {
                console.log(err);
                return;
              }
              console.table(rows);
            });
        } else if (answers.startlist === 'View all Employees by department') {
          const sql = `SELECT * FROM department`;
          db.query(sql, (err,rows) => {
            if(err) {
              console.log(err);
            }
          }) ;
        }
return;
});
