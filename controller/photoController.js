const { db } = require('../database')
const { uploader }= require('../helper/uploader')

module.exports = {
    postingPhoto: (req, res) => {
        const path = '/images/photos'
        const upload = uploader(path, 'USER').fields([{name: 'image'}])

        upload(req, res, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Upload image failed !', error: err.message })
            }

            const { image } = req.files

            const data = JSON.parse(req.body.data)

            data.path_photo = `${path}/${image[0].filename}`

            var sql = `INSERT INTO photos SET ?`

            
            db.query(sql, data, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                } else {
                    var sql2 = `INSERT INTO comments VALUES (null, '', ${data.id_user}, ${results.insertId}, '');`
                    db.query(sql2, (err, results) => {
                        if(err) {
                            return res.status(500).send(err)
                        }
                        req.app.io.emit('upload-photo' , { m : 'dari server <<<><><><><><>><' }) // untuk emit
                        res.status(200).send(results)
                    })       
                }
            })       
        })
    },
    getUserPhoto: (req, res) => {
        var sql = `SELECT * FROM photos WHERE id_user = ${req.params.idUser}`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getPhotoDetails: (req, res) => {
        var sql = ` select * from photos p
                    join users u
                    on p.id_user = u.id
                    where p.idphotos = ${req.params.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    editCaption: (req, res) => {
        var sql = `update photos SET caption = "${req.body.newCaption}" WHERE idphotos = ${req.body.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    deletePhoto: (req, res) => {
        var sql = `DELETE FROM photos WHERE idphotos = ${req.params.idPhoto}`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getDataMainPage: (req, res) => {
        var sql = `select * from photos p
                    join users u
                    on p.id_user = u.id
                    where u.id != ${req.params.idUser}
                    order by u.id asc;
                    `

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    likePhoto: (req, res) => {
        var sql = `INSERT INTO likes SET ?`

        
        db.query(sql, req.body, (err, results) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(results)
        })       
    },
    checkLikePhoto: (req, res) => {
        var sql = `SELECT * FROM likes WHERE id_user = ${req.body.idUser} AND id_photo = ${req.body.idPhoto}`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getCountLikes: (req, res) => {
        var sql = `SELECT count(*) FROM likes
                WHERE id_photo = ${req.params.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getCommentMainPage: (req, res) => {
        var sql = ` select * from comments c
                    join photos p
                    on c.id_photo_comment = p.idphotos
                    join users u
                    on p.id_user = u.id
                    where p.idphotos = ${req.body.idPhoto};`
       
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })          
    },
    commentPhoto: (req, res) => {
        var sql = `INSERT INTO comments SET ?`

        db.query(sql, req.body, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            req.app.io.emit('upload-photo' , { m : 'sukses' }) // untuk emit
            res.status(200).send(results)
        })       
    },
    countLike: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahLikes FROM likes WHERE id_photo = ${req.params.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })        
    },
    getMainPageFollowedOnly: (req, res) => {
        var sql = `select * from photos p
                join users u 
                on p.id_user = u.id
                join follows f
                on u.id = f.id_followed_user
                where f.id_user_follows = ${req.params.idUser}
                order by u.id asc;`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })        
    },
    getListComment: (req, res) => {
        var sql = `SELECT c.comment, u.id, u.username, u.photo
                    FROM comments c
                    JOIN users u
                    on c.id_user_comment = u.id
                    WHERE c.id_photo_comment = ${req.params.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })                  
    },
    searchPhoto: (req, res) => {
        var sql = `SELECT * FROM users WHERE username LIKE "%${req.body.username}%" AND username != "${req.body.namaUser}"`
        
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })                  
    },
    unLikePhoto: (req, res) => {
        var sql = `DELETE FROM likes WHERE id_user = ${req.body.idUser} AND id_photo = ${req.body.idPhoto}`

        db.query(sql, (err, results) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(results)
        })       
    },
    getSliderPhoto: (req, res) => {
        var sql = `SELECT path_photo FROM photos WHERE id_user = ${req.params.idUser}`

        db.query(sql, (err, results) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(results)
        })       
    },
    getListCommentinProfile: (req, res) => {
        var sql = `SELECT * FROM comments WHERE id_photo_comment = ${req.params.idPhoto}`

        db.query(sql, (err, results) => {
            if(err) { 
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getDataLikers: (req, res) => {
        var sql = `SELECT u.id, u.username, u.photo FROM likes l
                    JOIN users u
                    ON l.id_user = u.id
                    WHERE l.id_photo = ${req.params.idPhoto};`

        db.query(sql, (err, results) => {
            if(err) { 
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    }
}