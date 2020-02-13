const mysql = require('mysql')

const myDatabase = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'f6e4VUHJ1n', 
    password: 'wEFf7nmgss',
    database: 'f6e4VUHJ1n'
})

module.exports = {
    db: myDatabase
}