const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.get('/getcekregister/:username', userController.getCekRegister)
router.post('/register', userController.userRegister)
router.get('/login/:username', userController.loginUser)
router.get('/keeplogin/:username', userController.keepLogin)
router.post('/getdatauser', userController.getDataUser)
router.post('/followinguser', userController.followingUser)
router.post('/checkfollowed', userController.checkFollowed)
router.post('/unfollow', userController.unFollow)
router.post('/countposts', userController.countPosts)
router.post('/countfollowers', userController.countFollowers)
router.post('/countfollowings', userController.countFollowings)
router.post('/editusername/:idUser', userController.editUsername)

module.exports = router