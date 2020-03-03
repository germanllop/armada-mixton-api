require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')

const app = express()
const api = require('./routes/api')
const auth = require('./routes/auth')
const passport = require('./config/passport')
const socketio = require('./config/socketio')
const checkAuth = require('./helpers/checkAuth')
const port = process.env.PORT || 3000

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

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   if(req.isAuthenticated()){
//     res.redirect('/account')
//   }else{
//     res.send('<a href="auth/steam">Logueate Aqui</a>')
//   }
// })

// app.get('/account', checkAuth,function(req, res) {
//   res.send(req.user)
// })

// app.get('/logout',(req,res)=>{
//   req.logout()
//   res.redirect('/')
// })

app.use('/api', api)
app.use('/auth', auth)

mongoose.connect(process.env.DATABASE_URL,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
})
const server = app.listen(port, () => console.log('Server running: Go to http://localhost:' + port))
socketio.listen(server)

module.exports = {
  app
}
