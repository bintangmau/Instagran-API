const express = require('express')
const { photoController } = require('../controller')

const router = express.Router()

router.post('/postphoto', photoController.postingPhoto)
router.get('/getuserphoto/:idUser', photoController.getUserPhoto)
router.get('/getphotodetails/:idPhoto', photoController.getPhotoDetails)
router.post('/editcaption', photoController.editCaption)
router.delete('/deletephoto/:idPhoto', photoController.deletePhoto)
router.get('/getdatamainpage/:idUser', photoController.getDataMainPage)
router.post('/likephoto', photoController.likePhoto)
router.post('/checklikephoto', photoController.checkLikePhoto)
router.get('/getcountlikes/:idPhoto', photoController.getCountLikes)
router.post('/getcommentmainpage', photoController.getCommentMainPage)
router.post('/commentphoto', photoController.commentPhoto)
router.get('/countlike/:idPhoto', photoController.countLike)
router.get('/getmainfollowedonly/:idUser', photoController.getMainPageFollowedOnly)

module.exports = router