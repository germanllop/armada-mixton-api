const io = require('socket.io')()
const Player = require('../models/player')

io.on('connection',async(socket)=>{
  console.log('Made socket connection',socket.id)

  if(socket.request.session.passport){
    console.log('Client joins user room',socket.request.session.passport.user)
    socket.join(socket.request.session.passport.user)
    let player = await Player.findByIdAndUpdate(socket.request.session.passport.user,
      {
        status: 'Conectado'
      },{
        new:true
      }).exec()
  }else{
    socket.disconnect(true)
  }
    
  socket.on('disconnect',async(data)=>{
    if(socket.request.session.passport){
      if(!io.sockets.adapter.rooms['socket.request.session.passport.user']){
        let player = await Player.findByIdAndUpdate(socket.request.session.passport.user,
          {
            status: 'Desconectado'
          },{
            new:true
          }).exec()         
      }
      
    }
    console.log('Disconnected',socket.id,data)
  })  

})

module.exports = io