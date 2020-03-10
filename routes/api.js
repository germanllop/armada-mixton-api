const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const lobbyController = require('../controllers/lobbyController')
const checkAuth = require('../helpers/checkAuth')

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
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = await lobbyController.getMyLobby(me)
    res.send(lobby)
})

router.post('/updateLobby', async function(req, res){
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    const lobby = req.body.lobby
    if(me.id == lobby.leader){
        res.send(lobbyController.updateLobby(lobby))
    }else{
        res.status(403).send('No way Jose!')
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

router.get('/getPlayer',async(req,res)=>{
    const me = req.user // use await playerController.getFirstPlayer() on Dev it should change to req.user
    res.send(me)
})

// Player as user specific Routes
router.post('/setName',async (req,res)=>{
    const me = req.user
    const newMe = await playerController.setName(me,req.body.name)
    res.send(newMe)
})

module.exports = router