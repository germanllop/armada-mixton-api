const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const lobbyController = require('../controllers/lobbyController')

router.get('/',function(req, res){
    res.send('API Route is Working')
})

router.get('/getPublicLobbies',async(req,res)=>{
    const publicLobbies = await lobbyController.listPublicLobbies()
    res.send(publicLobbies)
})

router.get('/getLobby',function(req,res){
    res.send(lobbyController.getMyLobby(req.user))
})

router.get('/createLobby',async(req,res)=>{
       const player = await playerController.getFirstPlayer()
       const newLobby = await lobbyController.createLobby(player)

       res.send(newLobby)
})

router.post('/setLobby', function(req, res){
    res.send(lobbyController.setMyLobby(req.user, req.lobby))
})
 
module.exports = router