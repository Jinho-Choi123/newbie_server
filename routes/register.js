var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {

    res.status(200);
    res.render('main')
});



module.exports = router;
