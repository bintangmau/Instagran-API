const express = require('express')
const { notificationController } = require('../controller')

const router = express.Router()

router.post('/notiffollows', notificationController.notifFollows)
router.get('/getnotif/:idUser', notificationController.getNotification)
router.post('/notiflikephoto', notificationController.notifLikePhoto)

module.exports = router