var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');


router.post('/', (req, res, next)=>{
    const sports = req.body.sports;
    const date = req.body.date;
    fs.readFile('./data/WantList.json', async (err,data) => {
        if(err){
            console.error(err);
            return;
        }
        const wantDatas = JSON.parse(data);
        let responding_data = []
        wantDatas.forEach((wantdata) =>{
            if(wantdata.sports === sports && wantdata.date === date){
                console.log("Found the group that you want!!")
                responding_data.push(wantdata);
            }
        })
        console.log(responding_data);
        if(responding_data.length === 0){
            console.log("No data found")
            res.status(404);
            res.send("NO DATA FOUND");
        }
        else{
            res.status(200);
            res.send(responding_data)
        }

    })
})

module.exports = router;