const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000;


http.listen(PORT, ()=>{
  console.log(`Listening in port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))


app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})
//socket

const io= require('socket.io')(http)//have passed the server http so that socket server knows which server to work on

io.on('connection',(socket)=>{
  console.log('connected...')
  socket.on('message',(msg)=>{
    //console.log(msg) //this msg is to be sent to all the clients
    socket.broadcast.emit('message',msg) //broadcast sends to all except the sender
  })
})

