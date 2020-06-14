const connection = require('../../../database/connect');

/*==============================
        Finding data from db
        POST /
==============================*/
exports.find =  async (req, res, next)=>{
    // const input_sports = await req.body.sport;
    // const input_date = await req.body.date;
    const {sport, date} = req.body
    connection.query(`SELECT id, sports, date_format(date,'%Y-%m-%d') date, place, group_member, group_limit, playtime , start_time, end_time, comment FROM find WHERE sports='${sport}' AND date_format(date,'%Y-%m-%d') = '${date}'`, (err, result, fields) =>{
        if(err){
            console.log(err)
            res.status(403).json(err)
        }
        else{
            console.log("received request")
            res.status(200);
            res.json(JSON.stringify(result))
        }
    })  
}

/*===================================
        POST want list
=====================================*/
exports.want = async (req, res, next)=>{
    //need to modify group member part. this part needs an login!!!!
    const sql = 'INSERT INTO find (sports, date, group_limit, comment, start_time, end_time, place, group_member, register_user_id) VALUES (?,?,?,?,?,?,?,?,0,?) '
    const reqbody = await req.body
    const params = []
    for(key in reqbody){
        let value = reqbody[key]
        params.push(`${value}`)
    }
    connection.query(sql, params, (err, data, fields)=>{
        if(err){
            console.log(err)
            res.status(404)
        }
        else{res.status(200)
        console.log(data)
        res.send("hello")
        }
    })

}