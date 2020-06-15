const router = require('express').Router()
const controller = require('./controller')

/*=====================================
        Dash board shows POSTED STUFF that I made.
        USER can delete, modify itself.
=======================================*/

router.get('/history', controller.history)

router.post('/modify', controller.modify)

router.post('/delete', controller.delete)

module.exports = router