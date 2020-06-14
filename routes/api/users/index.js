const router = require('express').Router()
const controller = require('../users/controller')

router.get('/list', controller.list)

router.post('/assign-admin/:username', controller.assignAdmin)

module.exports = router