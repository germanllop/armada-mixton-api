const mongoose = require('mongoose')

const lobbySchema = new mongoose.Schema({
  code: {
    type: String
  },
  public: {
    type: Boolean
  },
  playersQty: {
    type: Number,
    min: 1,
    max: 12
  },
  bestOf: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  maps: [String],
  mapSelected: {
    type: String  
  },
  status: {
    type: String
  },
  closed: {
    type: Boolean
  },
  mapSelection: {
    type: String
  },
  teamSelection: {
    type: String
  },
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  },
  spectators: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }],
  ctSide: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }],
  tSide: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }]
},
{
  timestamps: true
})

const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby