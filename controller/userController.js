const { db } = require('../database')
const { uploader }= require('../helper/uploader')

const crypto = require('crypto')
const secret = 'instagran'

module.exports = {
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

            var sql = `SELECT * FROM users WHERE username = "${data.username}"`

            var sql2 = `INSERT INTO users SET ?`

            db.query(sql, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                } else {
                    if(results.length > 0) {
                        res.status(500).send('Email sudah dipakai')
                    } else {
                        db.query(sql2, data, (err, results2) => {
                            if(err) {
                                return res.status(500).send(err)  
                            } 
                            res.status(200).send(results)
                        })
                    }
                }
    
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
    }
}