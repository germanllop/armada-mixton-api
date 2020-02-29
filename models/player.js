const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  steamId: {
    type: String
  },
  steamInfo: {
    type: Object
  },
  admin: {
    type: Boolean,
    default: false
  },
  openidIdentifier: {
    type: String
  },
  friends: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }]
},
{
  timestamps: true
})

playerSchema.query.bySteamId = function(steamId) {
  return this.where({steamId: steamId})
}

const Player = mongoose.model('Player', playerSchema)

module.exports = Player