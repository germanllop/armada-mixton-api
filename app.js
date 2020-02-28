const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('passport')
const SteamStrategy = require('passport-steam')

const app = express()
const api = require('./routes/api')
const auth = require('./routes/auth')
// const models = require('./models/models')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

// guarda el user completo en user
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Aca se deberia enviar el id, buscarlo en la base de datos de usurios y retornar el player supuestamente
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3000/auth/steam/return',
  realm: 'http://localhost:3000/',
  apiKey: process.env.STEAM_API_KEY
},
function(identifier, profile, done) {
  profile.identifier = identifier
  return done(null, profile)
}
))

app.use(passport.initialize())
app.use(passport.session())

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/')
}

app.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/account')
  }else{
    res.send('<a href="auth/steam">Logueate Aqui</a>')
  }
})

app.get('/account', checkAuth,function(req, res) {
  res.send(req.user)
})

app.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})

app.use('/api', api)
app.use('/auth', auth)

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(async() => {
  app.listen(port, () => console.log('App listening on port ' + port + ': Go to http://localhost:' + port))
})

module.exports = {
  app
}
