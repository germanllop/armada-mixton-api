const Lobby = require('../models/lobby')

const listPublicLobbies = (req, res) => {
    Lobby.find({
        closed: false,
        public: true 
    },(err, lobbies)=>{
        if(err){
            console.log(err)
            res.send('Error, check logs')
        }else{
            res.send(lobbies)
        }
        
    })
}

const setMyLobby = (req, res) => {
    res.send('Setear Lobby')
}

const getMyLobby = (req, res) => {
    res.send('traer info del lobby')
}

module.exports = {
    listPublicLobbies,
}