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

router.get('/getLobby',async function(req,res){
    let mynewlobby = {
        "active": true,
        "public": false,
        "playersQty": 5,
        "bestOf": 3,
        "maps": [],
        "status": "open",
        "mapSelection": "fixed",
        "teamSelection": "fixed",
        "players": [
            {
                "admin": false,
                "friends": [
                    "5e5df635896e860424e136a8",
                    "5e5df64b896e860424e136a9"
                ],
                "_id": "5e59f28f697a551908d49220",
                "name": "liga",
                "steamId": "76561197977978350",
                "steamInfo": {
                    "steamid": "76561197977978350",
                    "communityvisibilitystate": 3,
                    "profilestate": 1,
                    "personaname": "liga",
                    "profileurl": "https://steamcommunity.com/id/ligadebatalla/",
                    "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/29/29a29834490b8061be1e194b19fe15654b465983.jpg",
                    "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/29/29a29834490b8061be1e194b19fe15654b465983_medium.jpg",
                    "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/29/29a29834490b8061be1e194b19fe15654b465983_full.jpg",
                    "lastlogoff": 1582943194,
                    "personastate": 0,
                    "primaryclanid": "103582791435687264",
                    "timecreated": 1126077323,
                    "personastateflags": 0,
                    "loccountrycode": "PE",
                    "locstatecode": "15",
                    "loccityid": 31371
                },
                "openidIdentifier": "https://steamcommunity.com/openid/id/76561197977978350",
                "createdAt": "2020-02-29T05:11:43.416Z",
                "updatedAt": "2020-03-03T07:58:07.827Z",
                "__v": 5
            }
        ],
        "ctSide": [],
        "tSide": [],
        "_id": "5e5e15d0e4daac20dcd07dc7",
        "code": "422DDJ9",
        "leader": "5e59f28f697a551908d49220"
    }
    //const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    //const lobby = await lobbyController.getMyLobby(me)
    const newlobby = await lobbyController.updateLobby(mynewlobby)
    res.send(newlobby)

})

router.post('/setLobby', async function(req, res){
    const me = await playerController.getFirstPlayer() //Dev it should change to req.user
    res.send(lobbyController.setMyLobby(me, req.lobby))
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