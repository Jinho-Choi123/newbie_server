/*===========================================
        GET api/user/list
=============================================*/
const connection = require('../../../database/connect')

exports.list = (req, res) => {
    //case if it's not admin
    if(!req.token.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    else{
        connection.query(`SELECT username, studentId from users`, (err, result, field) =>{
            res.json(result)
        })
    }
}

/*=========================================
        POST /api/user/assign-admin/:username : make user to admin
===========================================*/

exports.assignAdmin = (req, res) => {
    //if user is not admin, then refuse
    if(!req.token.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    connection.query(`UPDATE users SET admin = 1 WHERE username = '${req.params.username}'`, (err, result, field) => {
        if(err) {
            res.status(403).json({
                message: 'there are no such user'
            })
        } else{
            res.json({
                success: true
            })
        }
    })
}