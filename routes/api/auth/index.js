const router = require('express').Router()
const controller = require('./controller')
const authMiddlewares = require('../../../middlewares/auth')
/*============================
    POST register to /auth/register
    POST login to /auth/login
    POST use, get check to /auth/check
==============================*/
router.post('/register', controller.register)

router.post('/login', controller.login)

router.use('/check', authMiddlewares)

router.get('/check', controller.check)

router.get('/authenticate', authMiddlewares)

router.get('/authenticate', controller.authenticate)

module.exports = router