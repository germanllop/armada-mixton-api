const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  // avatar: {
  //   type: String
  // },
  // steamId: {
  //   type: String
  // },
  // steamInfo: {
  //   type: Object
  // },
  // admin: {
  //   type: Boolean
  // },
  // friends: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Player'
  // }]
},
{
  timestamps: true
})

playerSchema.query.bySteamId = function(steam_id) {
  return this.where({steam_id: steam_id})
}

const Player = mongoose.model('Player', playerSchema)

module.exports = Player