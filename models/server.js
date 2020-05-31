const mongoose = require('mongoose')

const serverSchema = new mongoose.Schema({
  name: {
    type: String
  },
  ip: {
    type: String
  },
  port: {
    type: String
  },
  rcon: {
    type: String,
    select: false 
  },
  status: {
    type: String,
    default:'unavailable'
  }
},
{
  timestamps: true
})

const server = mongoose.model('Server', serverSchema)

module.exports = server