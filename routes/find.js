var express = require('express');
var router = express.Router();
const connection = require('../database/connect');
const moment = require('moment');
router.post('/data', async (req, res, next)=>{
    console.log("in router")
    const input_sports = await req.body.sport;
    const input_date = await req.body.date;
    console.log(`sports: ${input_sports}, date: ${input_date}`)
    // connection.query(`SELECT (sports, date) FROM find WHERE sports = ${input_sports} AND DATE(date) LIKE ${input_date}%`, (err, result, fields)=>{
    //     if(err){
    //         res.status(400);
    //         res.send(JSON.stringify(err));
    //     }
    //     else{
    //         res.status(200);
    //         res.send(JSON.stringify(result))
    //     }
    // })
    connection.query(`SELECT sports, date_format(date,'%Y-%m-%d') FROM find WHERE sports='${input_sports}' AND date_format(date,'%Y-%m-%d') = '${input_date}'`, (err, result, fields) =>{
        if(err){
            res.status(400);
            res.send(JSON.stringify(err));
        }
        else{
            res.status(200);
            res.send(JSON.stringify(result))
        }
    })
    
})

module.exports = router;