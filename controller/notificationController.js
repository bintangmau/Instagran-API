const { db } = require('../database')

module.exports = {
    notifFollows: (req, res) => {
        var sql = `INSERT INTO notification SET ?`

        db.query(sql, req.body, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            req.app.io.emit('change-notif' , { m : 'sukses' }) // untuk kirim notif
            res.status(200).send(results)
        })       
    },
    getNotification: (req, res) => {

        var sql = ` SELECT message, username FROM notification n
                    JOIN users u
                    ON n.id_fail = u.id
                    WHERE id_maful = ${req.params.idUser};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })       
    }
}