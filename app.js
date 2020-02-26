const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const api = require('./routes/api')
const models = require('./models/models')

const port = 3000

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const query = models.Player.find({})
query.exec(function(err,docs){
  console.log(docs)
})
app.get('/', (req, res) => res.send('Hello Worldss'))

app.use('/api', api)

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(async() => {
  app.listen(port, () => console.log('App listening on port ' + port + ': Go to http://localhost:' + port))
})

module.exports = {
  app
}
