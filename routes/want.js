var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.post('/', (req, res, next)=>{
    console.log(req.body.playtime);
    const Want_Data = {
        "sports": req.body.sports,
        "date": req.body.date,
        "starttime": req.body.starttime,
        "playtime": req.body.playtime,
        "place": req.body.place,
        "comment": req.body.comment
    }
    //일단은 database를 사용하기 전이므로, 그냥 비효율적인 방식으로 json file에 data를 넣자.
    fs.readFile('./data/WantList.json', (err, data)=>{
        console.log("entered readfile method")
        if(err){
            console.error(err);
            return;
        }
        const wantlist = JSON.parse(data);
        console.log(wantlist);
    console.log(`datatype of wantlist is ${typeof wantlist}, datatype of Want_Data is ${typeof Want_Data}`);
    const newlist = wantlist.push(Want_Data);
    console.log("hello",newlist);
    res.status(200);
    res.send("successfuly added to the database!");// I didn't really added to the WantList.json. I will modify this part when 
    //we connect with the database.
    })


})

module.exports = router;