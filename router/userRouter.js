const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.post('/register', userController.userRegister)
router.get('/login/:username', userController.loginUser)
router.get('/keeplogin/:username', userController.keepLogin)

module.exports = router