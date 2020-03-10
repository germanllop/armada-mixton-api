const Player = require('../models/player')

// Dev Function so we can use the first user
async function getFirstPlayer(){
    const player = await Player.findOne().exec()   
    return player
}

async function getAllPlayers(me){
    const allPlayers = await Player.find({ _id: { "$ne": me.id } }).exec()
    return allPlayers
}

async function getFriendsList(me){
    const meWithFriends = await me.populate('friends').execPopulate()
    return meWithFriends.friends
}

async function addFriend(me, player){
    me.friends.push(player)
    const newMe = await me.save()
    return newMe
}

async function setName(me,name){
    me.name = name
    const newMe = await me.save()
    return newMe
}

module.exports = {
    getFirstPlayer,
    getFriendsList,
    getAllPlayers,
    addFriend,
    setName
}