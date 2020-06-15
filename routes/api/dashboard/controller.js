/*==================================
        GET /dashboard
        using JWT, load the FIND list and WANT list that user is connected to.
====================================*/
const connection = require('../../../database/connect')

const jwt = require('jsonwebtoken')

/*=========================================
        GET HISTORY
        IT gets response of all of my post that i made at want
=========================================*/
exports.history = (req, res) => {
    const userStudentId = req.token.studentId 
    connection.query(`SELECT id, sports, date_format(date,'%Y-%m-%d') as date, place, group_limit, group_member, comment, start_time, end_time, accompany FROM find WHERE post_studentId='${userStudentId}'`, (err, result, field) => {
        if(err) {
            return res.status(403).json({
                message: err
            })
        }
        if(result.length === 0){
            return res.status(403).json({
                message: "No Data Found"
            })
        }
        else{
            return res.status(200).json({result})
        }
    })
}


exports.modify = (req, res) => {
    res.send("in modify")
}


//deleting POST
exports.delete = (req, res) => {
    const {id} = req.body
    connection.query(`DELETE FROM find WHERE id='${id}'`, (err, result, field) => {
        if(err){
            return res.status(403).json({
                message: "Error. Please Do it again"
            })
        } else {
            res.status(200).json({
                message: "Delete success"
            })
        }

    })
}