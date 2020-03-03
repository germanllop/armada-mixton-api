const Lobby = require('../models/lobby')

async function listPublicLobbies(){
    const publicLobbies = await Lobby.find({
        public: true 
    })
    .populate('players')
    .exec()
    console.log(publicLobbies)
    
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
        active: true
    },(err,lobby)=>{
        if(err){
            console.log(err)
            return 'Error, check logs'
            
        }else{
            return lobby
        }
    }).populate({
        path:'players',
        match: {id:player.id}
    })
    .exec()
    return myLobby

}

module.exports = {
    listPublicLobbies,
    getMyLobby,
    createLobby
}