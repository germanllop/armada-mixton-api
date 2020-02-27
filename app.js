const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const api = require('./routes/api')
const auth = require('./routes/auth')
// const models = require('./models/models')

const port = 3000

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// app.use(express.static(path.join(__dirname, 'public')))

// const query = models.Player.find({})
// query.exec(function(err,docs){
//   console.log(docs)
// })
app.get('/', (req, res) => res.send('Hello Worldss'))

app.use('/api', api)
app.use('/auth', auth)

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(async() => {
  app.listen(port, () => console.log('App listening on port ' + port + ': Go to http://localhost:' + port))
})

module.exports = {
  app
}
