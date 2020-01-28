const { db } = require('../database')

module.exports = {
    sendMessage: (req, res) => {
        var sql = `INSERT INTO chats SET ?`

        db.query(sql, req.body, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }

            req.app.io.emit('get-chats' , { m : 'sukses' }) // untuk emit
            res.status(200).send(results)
        })       
    },
    getListFriends: (req, res) => {
        var sql =   `SELECT id_followed_user, username, photo FROM follows f
                    JOIN users u
                    ON f.id_followed_user = u.id
                    WHERE f.id_user_follows = ${req.params.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getChatsFromMe: (req, res) => {
        var sql = `SELECT chats, status FROM chats WHERE id_receiver = ${req.body.idReceiver} AND id_sender = ${req.body.idSender};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err, req.body)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    },
    getUsername: (req, res) => {
        var sql = `SELECT username, photo FROM users WHERE id = ${req.body.idSender}`
        
        var sql2 = `UPDATE chats
                    SET status = 'R'
                    WHERE id_sender = ${req.body.idSender} AND id_receiver = ${req.body.idReceiver};
                    `

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } else {
                db.query(sql2, (err, results2) => {
                    if(err){
                        console.log(err)
                    return res.status(500).send(err)
                    } else {
                        req.app.io.emit('change-status' , { m : 'sukses' }) // untuk ubah D ke R
                        res.status(200).send(results)
                    }
                })
            }
        })       
    },
    getJumlahPesanNotif: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahPesan FROM chats WHERE status = 'D' AND id_receiver = ${req.params.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            // console.log(req.params.idUser)
            res.status(200).send(results)
        })       
    }
}