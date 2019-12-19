const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 2001

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome To our API jampot</h1>')
})

const { userRouter, photoRouter } = require('./router')

app.use('/user', userRouter)
app.use('/photo', photoRouter)

app.listen(port, () => console.log('API aktif di port ' + port))