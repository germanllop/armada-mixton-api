const express = require('express')
const router = express.Router()
const lobbyController = require('../controllers/lobbyController')

router.get('/getconfig/:id',async(req,res)=>{
    const lobby = await lobbyController.getLobby(req.params.id)
    if(!lobby){res.status(404).send()}
    let matchConfig = {
        matchid:lobby.matchId,
        players_per_team:5,
        num_maps:lobby.bestOf,
        min_players_to_ready:10,
        in_spectators_to_ready:0,
        skip_veto:true,
        side_type:"always_knife",
        maplist:[],
        spectators:{
            players:{}
        },
        team1:{
            name:'Equipo de '+lobby.tSide[0].name,
            tag:"",
            flag:"PE",
            logo:"nipta",
            players:{}
        },
        team2:{
            name:'Equipo de '+lobby.ctSide[0].name,
            tag:"",
            flag:"PE",
            logo:"niptb",
            players:{}
        },
        cvars:{
            "get5_mysql_force_matchid":lobby.matchId
        }
    }

    lobby.spectators.forEach(spectator=>{
        matchConfig.spectators.players[spectator.steamId] = spectator.name
    })
    lobby.tSide.forEach(t=>{
        matchConfig.team1.players[t.steamId] = t.name
    })
    lobby.ctSide.forEach(ct=>{
        matchConfig.team2.players[ct.steamId] = ct.name
    })

    switch (lobby.bestOf) {
        case 1:
            matchConfig.maplist.push(lobby.mapSelected)        
            break
        case 3:
            matchConfig.maplist.length?matchConfig.maplist = lobby.maps:matchConfig.maplist.push(lobby.mapSelected) // It shouldn't come to this
            break
        default:
            res.status(404).send() // It shouldn't come to this
            break
    }
        res.send(matchConfig)
    
})

module.exports = router