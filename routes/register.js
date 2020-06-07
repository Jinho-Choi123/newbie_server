var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = require('../data/userDB_API');

db.connect((error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MYSQL CONNECTED...")
    }
});
/* GET home page. */
router.get('/', function(req, res, next) {

    res.status(200);
    res.render('main')
});



module.exports = router;
