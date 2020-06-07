const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'root',
  password: "ball##jinho20190670",
  database: 'newbie'
})

module.exports = connection;