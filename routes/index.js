const auth = require('./api/auth')
const users = require('./api/users')
const findwant = require('./api/findwant')
const authMiddleware = require('../middlewares/auth')
const router = require('express').Router()

//main page router 
router.use('/main', (req, res) => {res.send("Hello")})

//Register, Login router
router.use('/auth', auth)

//Admin router
router.use('/users', authMiddleware)
router.use('/users', users)

//Find want router
router.use('/findwant', authMiddleware)
router.use('/findwant', findwant)

module.exports = router