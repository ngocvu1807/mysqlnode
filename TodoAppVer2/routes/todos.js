const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../myConnection/db');
// CREATE CONNECTION
// const db = mysql.createConnection({
// host: 'localhost',
// user: 'root',
// password: '',
// database: 'nodemysql'
// });

// ADD TODO
router.post('/', (req, res) => {
  let todo = {
    text: req.body.text,
    completed: false
  };
  let sql = 'INSERT INTO todolist SET ?';
  let query = db.query(sql, todo, (error, results) => {
    if (error) throw error;
    console.log(todo);
    console.log(results);
    console.log('----------added');
    res.json(todo);
  });
});

//  GET TODO LIST
router.get('/', (req, res) => {
  let list = [];
  let sql = 'SELECT * FROM todolist';
  let query = db.query(sql, (err, rows) => {
    if (err) {
      console.log('failed to query for uses: ' + err);
      res.sendStatus(500);
      return;
    }
    for (let i = 0; i < rows.length; i++) {
      list.push({
        id: rows[i].id,
        text: rows[i].text,
        completed: rows[i].completed
      });
    }
    res.json(list);
  });
});

// UPDATE TODO TEXT
router.patch('/:id', (req, res) => {
  console.log('-----------this is update func');

  let newText = req.body.text;
  let sql =
    'UPDATE todolist SET text = ' +
    db.escape(newText) +
    ' WHERE id = ' +
    db.escape(req.params.id);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.end();
  });
});

// Toggle a todo
router.patch('/toggle/:id', (req, res) => {
  console.log('-----------this is toggle func');
  let completed = req.body.completed;
  let sql =
    'UPDATE todolist SET completed = ' +
    db.escape(completed) +
    ' WHERE id = ' +
    db.escape(req.params.id);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.end();
  });
});

// TOGGLE ALL
router.patch('/', (req, res) => {
  console.log('-----------this is toggle ALL func');
  let completed = req.body.completed;
  let sql = 'UPDATE todolist SET completed = ' + db.escape(completed);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.end();
  });
});

// DELETE A TODO
router.delete('/:id', (req, res) => {
  let sql = `DELETE FROM todolist WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('------------DELETED');
  });
});

//  CLEAR ALL COMPLETED TODOS
router.delete('/', (req, res) => {
  let completed = true;
  let sql = `DELETE FROM todolist WHERE completed = ${completed}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('------------DELETED');
  });
});

module.exports = router;
