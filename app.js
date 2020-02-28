const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')

const app = express()
const api = require('./routes/api')
const auth = require('./routes/auth')
// const models = require('./models/models')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => res.send('Hello Worldss'))

app.use('/api', api)
app.use('/auth', auth)

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(async() => {
  app.listen(port, () => console.log('App listening on port ' + port + ': Go to http://localhost:' + port))
})

module.exports = {
  app
}
