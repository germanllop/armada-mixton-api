const Lobby = require('../models/lobby')
const Sever = require('../models/server')
const io = require('../config/socketio')
const Rcon = require('srcds-rcon')

async function listPublicLobbies(){
    const publicLobbies = Lobby.find({
        public: true,
        status:'open',
        active: true
    })
    .populate('players')
    .populate('leader')
    .populate('spectators')
    .populate('ctSide')
    .populate('tSide')
    await publicLobbies.exec()   
    return publicLobbies
}

async function createLobby(player){
    const newLobby = new Lobby({
        code: Math.random().toString(36).substr(2, 7).toUpperCase(),
        leader: player,
        players: [player],
        spectators: [player]
    })
    await newLobby.save()
    io.emit('update-lobbies-list')
    return newLobby
}

async function getMyLobby(player){
    const myLobby = Lobby.findOne({
        active: true,
        status:'open',
        players:{
            _id:player.id
        }
    })
    .populate('leader')
    .populate('players')
    .populate('spectators')
    .populate('ctSide')
    .populate('tSide')
    await myLobby.exec()
    return myLobby
}

async function getLobby(id){
    const lobby = Lobby.findById(id)
    .populate('leader')
    .populate('players')
    .populate('spectators')
    .populate('ctSide')
    .populate('tSide')
    await lobby.exec()
    return lobby
}

async function launchLobby(id){
    
    let query = Server.findOneAndUpdate({status:'available'},{status:'unavailable'},{new:true})
    const server = await query.exec()

    let rcon = Rcon({
        address: server.ip+':'+server.port,
        password: server.rcon
    })

    rcon.connect().then(() => {
        console.log('connected')
    }).catch(console.error)

    rcon.disconnect()
    const lastMatch = await Lobby.findOne({}).sort({"matchId":-1}).select({ matchId: 1}).exec()
    query = Lobby.findByIdAndUpdate(id, {
        server: server,
        matchId: lastMatch.matchId + 1,
        status: 'closed'       
    },{
        new:true
    })
    const newLobby = await query.exec()
}

async function updateLobby(lobby){
    let query = Lobby.findByIdAndUpdate(lobby._id, {
        //active:         lobby.active,
        //public:         lobby.public, // Future tech
        //playersQty:     lobby.playersQty,
        //bestOf:         lobby.bestOf, // Future tech
        //maps:           lobby.maps, // Future tech for bestOf
        //status:         lobby.status, // This is controlled by the backend
        //mapSelection:   lobby.mapSelection, // Future tech for bestOf
        mapSelected:   lobby.mapSelected,
        //teamSelection:  lobby.teamSelection,
        //players:        lobby.players, // This is controlled by the backend
        spectators:     lobby.spectators,
        ctSide:         lobby.ctSide,
        tSide:          lobby.tSide,
        leader:         lobby.leader,
    },{
        new:true
    })
    .populate('leader')
    .populate('players')
    .populate('spectators')
    .populate('ctSide')
    .populate('tSide')
    let newLobby = await query.exec()   
    newLobby.players.forEach(player => {
        if(player._id != newLobby.leader._id){
            io.in(player._id).emit('update-lobby',newLobby._id)
        }
    })  
    return newLobby
}

async function joinLobby(player,code){
    let lobby = await Lobby.findOne({
        active:true,
        status:'open',
        code:code
    }).exec()
    let currentLobby = await Lobby.findOne({
        active:true,
        status:'open',
        players:{
            _id:player.id
        }
    }).exec()
    if(lobby){        
        if(currentLobby && (lobby.id != currentLobby.id)){ // Check if player is in another lobby
            await leaveLobby(player) // Exits the other lobby so he can join this one
        }
        if(lobby.players.includes(player.id)){
            return lobby
        }else{
            lobby.players.push(player)
            lobby.spectators.push(player)
            lobby.playersQty++
            const newLobby = await lobby.save()
            newLobby.players.forEach(player => {
                io.in(player._id).emit('update-lobby',newLobby._id) //Todo, change with lobby code room, for now its for everyone
            })
            return newLobby 
        }
    }else{
        return false
    }
    
}

async function leaveLobby(player){
    let lobby = await Lobby.findOne({
        active:true,
        status:'open',
        players:{
            _id:player.id
        }
    }).exec()
    if(!lobby.players.includes(player.id)){
        return false
    }else{
        lobby.ctSide.pull(player)
        lobby.tSide.pull(player)
        lobby.spectators.pull(player)
        lobby.players.pull(player)
        lobby.playersQty--
        if(!lobby.players.length){
            lobby.active = false
            lobby.status = 'empty'
            const newLobby = await lobby.save()
            io.emit('update-lobbies-list')
            return newLobby 
        }else{
            if(lobby.leader == player.id){
                lobby.leader = lobby.players[0]
            }
            const newLobby = await lobby.save()
            newLobby.players.forEach(player => {
                io.in(player._id).emit('update-lobby',newLobby._id)
            })
            return newLobby 
        }
        
        
    }
}

module.exports = {
    listPublicLobbies,
    getMyLobby,
    createLobby,
    updateLobby,
    joinLobby,
    leaveLobby,
    getLobby,
    launchLobby
}