const express = require('express')
const { chatsController } = require('../controller')

const router = express.Router()

router.post('/sendmessage', chatsController.sendMessage)
router.get('/getlistfriends/:idUser', chatsController.getListFriends)
router.post('/getchatsfromme' ,chatsController.getChatsFromMe)
router.post('/getusername', chatsController.getUsername)
router.get('/getjumlahpesannotif/:idUser', chatsController.getJumlahPesanNotif)
router.post('/searchuser', chatsController.searchUsers)

module.exports = router