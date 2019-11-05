const mysql = require('mysql');
const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
};

const db = mysql.createPool(dbconfig, err => {
  if (err) throw err;
  
});

module.exports = db;
