const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');





// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// get all employees
const getAllQuery = () => {
const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log({rows});
  });
};



const getSingleQuery = () => {
   // get a single employee
    const sql = `SELECT * FROM employee where id = ?`;
    const  params = [req.params.id];
    db.query(sql, params, (err, rows) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log({rows});
    });
};
   
const deleteQuery = () => {
  // delete an employee
 sql = `DELETE FROM employee WHERE id = ?`;
   params = req.params.id;
    db.query(sql, 1, (err, result) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
};
 

const createQuery = () => {
 // create an employee route
    sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
 params = ['Romelu', 'Lukaku'];
  db.query(sql, params, (err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};
 


























// testing connection
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//   });



// start server after db connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});  
});
