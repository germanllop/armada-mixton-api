const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const lobbyController = require('../controllers/lobbyController')
const io = require('../config/socketio')

router.get('/',function(req, res){
    res.send('API Route is Working')
})

// Lobby Routes
router.get('/getPublicLobbies',async(req,res)=>{
    const publicLobbies = await lobbyController.listPublicLobbies()
    res.send(publicLobbies)
})

router.get('/getLobby',async function(req,res){
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = await lobbyController.getMyLobby(me)
    res.send(lobby)
})

router.get('/createLobby',async function(req,res){
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = await lobbyController.createLobby(me)  
    res.send(lobby)
})

router.get('/leaveLobby',async function(req,res){
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = await lobbyController.leaveLobby(me)  
    res.send(lobby)
})

router.post('/updateLobby', async function(req, res){
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = req.body
    
    if(me.id == lobby.leader._id){
        const newLobby = await lobbyController.updateLobby(lobby)
        res.send(newLobby)
    }else{
        res.status(403).send('No way Jose!')
    }
})

router.get('/joinLobby/:id',async function(req,res){
    const me = req.user 
    const lobby = await lobbyController.joinLobby(me,req.params.id)
    if(lobby){
        res.send(lobby)
    }else{
        res.status(404).send('No hay!') 
    }
    
})

// Players Routes
router.get('/getPlayers',async(req,res)=>{
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const players = await playerController.getAllPlayers(me)
    res.send(players)
})

router.get('/getFriends',async(req,res)=>{
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const friends = await playerController.getFriendsList(me)
    res.send(friends)
})

// Player as user specific Routes
router.post('/setName',async (req,res)=>{
    const me = req.user
    const newMe = await playerController.setName(me,req.body.name)
    res.send(newMe)
})

module.exports = router