const express = require('express');
const mysql = require('mysql');
const app = express();
const db = require('./myConnection/db');
//  Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type'
  );
  console.info('HELLO : ', req.method);
  console.info('HELLO : ', req.body);
  next();
});
//routes
const todoRoute = require('./routes/todos');

app.use('/api/todos', todoRoute);
app.get('/', (req, res) => {
  res.send('welcome to the hoempage');
});

// CREATE CONNECTION
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'nodemysql'
// });

//  CONNECT TO DB
db.getConnection(error => {
  if (error) {
    throw error;
  }
  console.log('Mysql Connected!!');
});

// CREATE TABLE
app.get('/createtodotable', (req, res) => {
  let sql =
    'CREATE TABLE todoList(id int auto_increment, text VARCHAR(225),  completed BOOLEAN, PRIMARY KEY (id))';
  db.query(sql, (error, result) => {
    if (error) throw error;
    console.log(result);
    res.send('Table created');
  });
});

const port = process.env.PORT || 57602;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
