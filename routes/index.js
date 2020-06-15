const auth = require('./api/auth')
const users = require('./api/users')
const findwant = require('./api/findwant')
const authMiddleware = require('../middlewares/auth')
const me = require('./api/dashboard')
const router = require('express').Router()

//main page router 
router.get('/main', (req, res) => {res.json({
    msg: "Welcome to KAISPORTS"
})})

//Register, Login router
router.use('/auth', auth)

//Admin router
router.use('/users', authMiddleware)
router.use('/users', users)

//Find want router
router.use('/findwant', authMiddleware)
router.use('/findwant', findwant)

//dashboard router
router.use('/me', authMiddleware)
router.use('/me', me)

module.exports = router