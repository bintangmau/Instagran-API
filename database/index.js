const mysql = require('mysql')

const myDatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'instagran'
})

module.exports = {
    db: myDatabase
}