var path = require('path')
var express= require('express')
var http =require('http')
var socketIO = require('socket.io')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var publicPath = path.join(__dirname,'../public')
var port = process.env.PORT || 3000
app.use(express.static(publicPath))

io.on('connection',function (socket) {
    console.log("Client connected")

    setInterval(function () {
        socket.emit('newScore',{
            res : getRandomArbitrary(1,7)
        })
    },500)
})

function getRandomArbitrary(min, max)
{
    var res = Math.floor(Math.random() * (max - min) + min);
    if(res===5)
    {
        getRandomArbitrary(min,max)
    }
    return res;
}
server.listen(port,function () {
    console.log("Server up")
})