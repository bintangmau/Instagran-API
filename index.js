const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 2001
const server = require('http').Server(app);
const io = require('socket.io')(server)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

io.on('connection' , socket=>{
    return null
})

app.io = io

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome To our API jampot</h1>')
})

const { userRouter, photoRouter , chatsRouter, notificationRouter } = require('./router')

app.use('/user', userRouter)
app.use('/photo', photoRouter)
app.use('/chats', chatsRouter)
app.use('/notification', notificationRouter)

// app.listen(port, () => console.log('API aktif di port ' + port))
server.listen(port , ()=>{
    console.log('lol')
})