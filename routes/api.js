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

router.post('/setLobby', function(req, res){
    res.send(lobbyController.setMyLobby(req.user, req.lobby))
})

// Players Routes
router.get('/getPlayers',async(req,res)=>{
    const me = await playerController.getFirstPlayer() //Dev ir should change to req.user
    const players = await playerController.getAllPlayers(me)
    res.send(players)
})

router.get('/getFriends',async(req,res)=>{
    const me = await playerController.getFirstPlayer() //Dev ir should change to req.user
    const friends = await playerController.getFriendsList(me)
    res.send(friends)
})

module.exports = router