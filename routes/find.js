var express = require('express');
var router = express.Router();
const connection = require('../database/connect');
router.post('/data', async (req, res, next)=>{
    console.log("in router")
    const input_sports = await req.body.sport;
    const input_date = await req.body.date;
    console.log(`sports: ${input_sports}, date: ${input_date}`)
    connection.query(`SELECT id, sports, date_format(date,'%Y-%m-%d') date, place, group_member, group_limit, playtime , start_time, end_time, comment FROM find WHERE sports='${input_sports}' AND date_format(date,'%Y-%m-%d') = '${input_date}'`, (err, result, fields) =>{
        if(err){
            console.log("error")
            res.status(400);
            res.json(JSON.stringify(err));
        }
        else{
            console.log("received request")
            res.status(200);
            res.json(JSON.stringify(result))
        }
    })
    
})

module.exports = router;