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
    type: String
  },
  status: {
    type: String
  }
},
{
  timestamps: true
})

const server = mongoose.model('Server', serverSchema)

module.exports = server