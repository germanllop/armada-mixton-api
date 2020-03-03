const socket = require('socket.io')()

socket.on('connection',(socket)=>{
  console.log('Made socket connection',socket.id)
  socket.on('chat',function(data){
    console.log(data)
    io.sockets.emit('chat',data)
  })
})

module.exports = socket