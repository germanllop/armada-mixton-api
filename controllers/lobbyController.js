const Lobby = require('../models/lobby')

async function listPublicLobbies(){
    const publicLobbies = await Lobby.find({
        public: true,
        active: true
    })
    .populate('players')
    .exec()   
    return publicLobbies
}

async function createLobby(player){
    const newLobby = await new Lobby({
        code: Math.random().toString(36).substr(2, 7).toUpperCase(),
        leader: player,
        players: [player]
    }).save()
    
    return newLobby
}

async function getMyLobby(player){
    const myLobby = await Lobby.findOne({
        active: true,
        players:{
            _id:player.id
        }
    },(err,lobby)=>{
        if(err){
            console.log(err)
            return 'Error, check logs'
            
        }else{
            return lobby
        }
    })
    .populate('players')
    .populate('ctSide')
    .populate('tSide')
    .exec()
    if(!myLobby){
        const newLobby =  await createLobby(player)
        return newLobby
    }
    return myLobby

}

async function updateLobby(lobby){
    let newLobby = await Lobby.findByIdAndUpdate(lobby.id, {
        active:         lobby.active,
        public:         lobby.public,
        playersQty:     lobby.playersQty,
        bestOf:         lobby.bestOf,
        maps:           lobby.maps,
        status:         lobby.status,
        mapSelection:   lobby.mapSelection,
        teamSelection:  lobby.teamSelection,
        players:        lobby.players,
        ctSide:         lobby.ctSide,
        tSide:          lobby.tSide,
        leader:         lobby.leader,
    }).exec()
    console.log(newLobby)
    
    return newLobby
}

module.exports = {
    listPublicLobbies,
    getMyLobby,
    createLobby,
    updateLobby
}