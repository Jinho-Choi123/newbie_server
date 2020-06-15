const mysql = require('mysql')

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

connection.connect(err =>{
    if (err){
        console.log("MYSQL Connection failed");
    }
    else{
        console.log("MYSQL connected...")
    }
})

module.exports = connection;