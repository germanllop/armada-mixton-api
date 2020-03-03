const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const lobbyController = require('../controllers/lobbyController')

router.get('/',function(req, res){
    res.send('API Route is Working')
})

router.post('/',function(req,res){
    res.send(req.body)
})

// Lobby Routes
router.get('/getPublicLobbies',async(req,res)=>{
    const publicLobbies = await lobbyController.listPublicLobbies()
    res.send(publicLobbies)
})

router.get('/getLobby',async function(req,res){
    const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    const lobby = await lobbyController.getMyLobby(me)
    res.send(lobby)
})

router.post('/updateLobby', async function(req, res){
    const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    const lobby = req.body.lobby
    if(me.id == lobby.leader){
        res.send(lobbyController.updateLobby(lobby))
    }else{
        res.send('No way Jose!')
    }
    
})

// Players Routes
router.get('/getPlayers',async(req,res)=>{
    const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    const players = await playerController.getAllPlayers(me)
    res.send(players)
})

router.get('/getFriends',async(req,res)=>{
    const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    const friends = await playerController.getFriendsList(me)
    res.send(friends)
})

module.exports = router