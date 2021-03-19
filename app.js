if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const cors = require("cors")
const express = require('express')
const router = require('./routes/index')
const errHandler = require('./helpers/errHandler.js')
const { verifyToken } = require('./helpers/jwtHelper')
const port = process.env.PORT || 3000
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);
global.io = io; 

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', router)

// listening
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('sendCard', (data) => {
        console.log(data);
        let {id, username} = verifyToken(data.access_token)
        io.emit('sendAll', {card: data.cardFromVue, userId: id, username, room: data.room});
    });
});

app.use(errHandler)

http.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})