const connection = require('../../../database/connect');
const jwt = require('jsonwebtoken');
const e = require('express');
/*==============================
        Finding data from db
        POST /
==============================*/
exports.find =  (req, res)=>{
    //one or more req.body value is required. ex) sport: "", date: "2020-06-15" is OK.
    const {sport, date} = req.body
    connection.query(`SELECT id, sports, date_format(date,'%Y-%m-%d') as date, place, group_limit, group_member, comment, start_time, end_time FROM find WHERE sports='${sport}' OR date_format(date,'%Y-%m-%d') = '${date}'`, (err, result, fields) =>{
        if(err){
            console.log(err)
            res.status(403).json({
                message: "Error finding data. Please try it again."
            })
        }
        else{
            res.status(200).json({
                data: result,
                message: "Searching success."
            })
        }
    })  
}

/*===================================
        POST /findwant/accompany
        : if we click accompany button, then user info. will be stored in finddatabase.
====================================*/

exports.accompany = async (req, res) => { 
    console.log("in accompany")
    const ID = await req.body.id // the id of table find.
    console.log(ID)
    const studentId = await req.token.studentId
    console.log(studentId)
    //See if user is already accompanied to the POST
    connection.query(`SELECT id, accompany FROM find WHERE JSON_CONTAINS(accompany, '"${studentId}"')`, (err, result, field)=>{
        if(err){
            console.log(err)
            return res.status(403).json({
                message: "Accompany Failed. Please try it again."
            })
        }
        if(result.length>0){
                for(let i = 0 ; i< result.length ; i++){
                    if(result[i].id == ID){
                        console.log(result[i].id)
                        return res.status(200).json({
                            message: "You already accompanied. Don't have to do it again"
                        })
                    }
                }}
                            //first time accomany the POST ADD studentId info to database
                console.log(ID)
                connection.query(`UPDATE find SET accompany=JSON_MERGE(accompany, JSON_ARRAY('${studentId}')), group_member=group_member+1 WHERE id = "${ID}"`,(err, data, field) =>{
                    if(err){
                        console.log(err)
                        return res.status(403).json({
                            message: "Accompany Failed. Please try it again."
                        })
                        }
                        console.log("hhh", data, "hhh")
                        res.status(200).json({
                            message: "Accompany Success!!"
                        })
                    })
                    })}
        

/*===================================
        POST want list
=====================================*/
exports.want = (req, res)=>{
    const {sports, date, group_limit, place, comment, start_time, end_time} = req.body 
    const post_userId = req.token.studentId
    //post_userId is the studentId of the users table.
    connection.query(`INSERT INTO find (sports, date, group_limit, comment, start_time, end_time, place, post_studentId) VALUES (?,?,?,?,?,?,?,?)`,
    [sports, date, group_limit, comment, start_time, end_time, place, post_userId], (err, result, field)=>{
        if(err){
            return res.status(202).json({
                message: "Failed to POST. Try it again"
            })
        }
            res.status(200).json({
                message: "Successfully POST."
            })
    })
}