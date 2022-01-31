const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');





// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });



// start server after db connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});  
});
