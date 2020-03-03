const mongoose = require('mongoose')

const mixtonSchema = new mongoose.Schema({
  name: {
    type: String
  },
  mysql: {
    type: Number
  }
},
{
  timestamps: true
})

const mixton = mongoose.model('Mixton', mixtonSchema)

module.exports = mixton