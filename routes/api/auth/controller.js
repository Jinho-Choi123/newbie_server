/*
    POST /api/auth/register 
    {
        username,
        password
    }
*/
//connection to the database
const connection = require('../../../database/connect')

//importing JWT
const jwt = require('jsonwebtoken')

//importing bcrypt
const bcrypt = require('bcrypt')

exports.register = (req, res) =>{
    const {username, studentId, userId} = req.body 
    bcrypt.hash(req.body.password, 10, (err, password) =>{
    let newUser = null 
    const create = (user) => {
        if(!user) {
            throw new Error('You already registered exists')
        }
        else{
            return new Promise(function(resolve, reject) {
                connection.query(`INSERT INTO users (username, studentId, userId, password) VALUES ('${username}', '${studentId}', '${userId}', '${password}')`,
                (err, result, field) =>{
                    resolve(result)
                })
        })}
    }

    //count numbers of users
    const count = (user) => {
        newUser = user 
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT COUNT(*) AS cnt FROM users`,
            (err, result, field) =>{
                resolve(result[0].cnt)
            })
    })
    }

    //assign admin if count is 1
    const assign = (count) =>{
        if(count ===1){
            return new Promise(function(resolve, reject) {
                connection.query(`UPDATE users SET admin = 1 WHERE studentId = '${studentId}' AND userId = '${userId}'`,
                (err, result, field) =>{
                    resolve(true)
                })
        })
        }else{
            //if not, return a promise that returns false 
            return Promise.resolve(false)
        }
    }

    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true: false 
        })
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
    function Search(callback){
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT EXISTS (SELECT username, studentId, userId FROM users WHERE username = '${username}' OR studentId = '${studentId}' OR userId = '${userId}') AS success`,
            async (err, result, field) =>{
                if(!result[0].success){
                    //there are no such userdata that matches with input username, studentId, userId
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
        })
    }
    Search()
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)
    })
}

/*================================
        POST /api/auth/login
===================================*/
exports.login = (req, res) => {
    const {userId, password} = req.body 
    const secret = req.app.get('jwt-secret')

    //check the user info and generate the jwt
    const check = (user) => {
        if(!user) {
            throw new Error('login failed')
        }
        else{
            //user exists, check the password
            return new Promise((resolve, reject) => {
                connection.query(`SELECT username, userId, password, admin FROM users WHERE userId='${userId}'`, (err, result, field) =>{
                    bcrypt.compare(password, result[0].password, (err, data) =>{
                        if(err){
                            throw new Error('login failed')
                        }
                        else{
                            if(data){
                                jwt.sign(
                                            {
                                                userId: result[0].userId,
                                                username: result[0].username,
                                                admin: result[0].admin
                                            },
                                            secret,
                                            {
                                                expiresIn: '7d',
                                                issuer: 'choijinho.com',
                                                subject: 'userInfo'
                                            },(err, token) =>{
                                                if(err) {
                                                    reject(err)
                                                }
                                                else {
                                                    resolve(token)
                                                }
                                            }
                                        )
                            } else{
                                throw new Error('login failed')
                            }
                        }
                    })
                })
            })
        }
    }

    const respond = (tokens) =>{
        res.json({
            message: 'login in successfully',
            tokens
        })
    }

    const onError = (error) =>{
        res.status(403).json({
            message: error.message
        })
    }

    function findByUserId (callback) {
        return new Promise((resolve, reject) =>{
        connection.query(`SELECT EXISTS (SELECT userId FROM users WHERE userId = '${userId}') AS success`, (err, result, field)=>{
                if(result[0].success){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
        })
    }

    findByUserId()
        .then(check)
        .then(respond)
        .catch(onError)
}

/*======================================
        GET /api/auth/check
========================================*/

exports.check = (req, res) => {
    //Thanks to middlewareAuth, we dont have to care that there are no token in url or req.headers
    res.json({
        success: true,
        info: req.token
    })

}