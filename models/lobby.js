const mongoose = require('mongoose')

const lobbySchema = new mongoose.Schema({
  code: {
    type: String
  },
  active:{
    type: Boolean,
    default: true
  },
  public: {
    type: Boolean,
    default: true
  },
  playersQty: {
    type: Number,
    default:1,
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
    type: String,
    default:'open'
  },
  mapSelection: {
    type: String,
    default:'fixed'
  },
  teamSelection: {
    type: String,
    default: 'fixed'
  },
  players:[{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }],
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  },
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