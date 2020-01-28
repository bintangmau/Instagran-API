const { db } = require('../database')
const { uploader }= require('../helper/uploader')

const crypto = require('crypto')
const secret = 'instagran'

module.exports = {
    getCekRegister: (req, res) => {
        var sql = `SELECT * FROM users WHERE username = "${req.params.username}"`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    userRegister: (req, res) => {
        const path = '/images/user'
        const upload = uploader(path, 'USER').fields([{name: 'image'}])

        upload(req, res, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Upload image failed !', error: err.message })
            }

            const { image } = req.files

            const data = JSON.parse(req.body.data)

            data.photo = `${path}/${image[0].filename}`           

            data.password = crypto.createHmac('sha256', secret)
            .update(data.password)
            .digest('hex');
          

            var sql = `INSERT INTO users SET ?`

            db.query(sql, data, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(results)
            })       
        })
    },
    loginUser: (req, res) => {
        var sql = `SELECT * FROM users WHERE username = "${req.params.username}"`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    keepLogin: (req, res) => {
        var sql = `SELECT * FROM users WHERE username = "${req.params.username}"`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getDataUser: (req, res) => {
        var sql = `SELECT * FROM users WHERE id = ${req.body.idUser}`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            req.app.io.emit('tes-socket' , { m : 'dari server <<<><><><><><>><' }) // tes doang
            res.status(200).send(results)
        })       
    },
    followingUser: (req, res) => {
        var sql = `INSERT INTO follows SET ?`

        db.query(sql, req.body, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    checkFollowed: (req, res) => {
        var sql = `SELECT * FROM follows WHERE id_user_follows = ${req.body.idUserFollows} AND id_followed_user = ${req.body.idFollowedUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    unFollow: (req, res) => {
        var sql = `DELETE FROM follows WHERE id_user_follows = ${req.body.idUserFollows} AND id_followed_user = ${req.body.idFollowedUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    countPosts: (req, res) => {
        var sql = ` SELECT COUNT(*) as jumlahPost FROM photos WHERE id_user = ${req.body.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    countFollowers: (req, res) => {
        var sql = `   SELECT COUNT(*) as jumlahFollowers FROM follows WHERE id_followed_user = ${req.body.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    countFollowings: (req, res) => {
        var sql = `	SELECT COUNT(*) as jumlahFollowing FROM follows WHERE id_user_follows = ${req.body.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    editUsername: (req, res) => {
        var sql = `UPDATE users SET ? WHERE id = ${req.params.idUser}`

        db.query(sql, req.body, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    deleteAll: (req, res) => {
        var sql = `truncate photos`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    }
}