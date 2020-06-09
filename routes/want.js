var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const connection = require('../database/connect');

router.post('/data', async (req, res, next)=>{
    const sql = 'INSERT INTO find (sports, date, playtime, group_limit, group_member, comment, start_time, end_time, register_user_id, place) VALUES (?,?,?,?,?,?,?,?,?,?) '
    const reqbody = await req.body
    const params = []
    console.log(reqbody)
    for(key in reqbody){
        let value = reqbody[key]
        params.push(`${value}`)
    }
    console.log(params)
    connection.query(sql, params, (err, data, fields)=>{
        if(err){
            console.log(err)
            res.status(404)
        }
        else{res.status(200)
        console.log(data)
        console.log("entered connection")
        res.send("hello")
        }
    })

})

module.exports = router;