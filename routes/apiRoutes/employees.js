const express = require('express');







// get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log({rows});
  });
  });
  
  // get a single employee
  app.get('/api/employees/:id', (req, res) => {
    const sql = `SELECT * FROM employee where id = ?`;
    const params = [req.params.id];
     db.query(sql, params, (err, rows) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log({rows});
  });
  });
 
  
  // delete an employee
  app.delete('/api/employees/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    params = req.params.id;
    db.query(sql, 1, (err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
  });
  
  
  // create an employee route
  
  app.create(sql ,(req, res) => {
  const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
  const params = ['Romelu', 'Lukaku'];
  db.query(sql, params, (err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
  });
  