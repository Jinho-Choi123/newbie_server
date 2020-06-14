const router = require('express').Router()
const controller = require('./controller')

/*=================================
        POST find to /findwant/find
        POST want to /findwant/want
====================================*/
router.post('/find', controller.find)

router.post('/want', controller.want)

module.exports = router