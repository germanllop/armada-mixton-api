const Player = require('../models/player')

async function getFirstPlayer(){
    const player = await Player.findOne().exec()   
    return player
}

async function getFriendsList(player){
    return ["Amigo1", "Amigo2", "Amigo3"]
}

module.exports = {
    getFirstPlayer,
    getFriendsList
}