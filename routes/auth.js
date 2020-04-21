const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log('You are not supposed to read this. Something went wrong.')
    res.redirect('/')
  })

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: process.env.BASE_URL }),
  function(req, res) {
    res.redirect(process.env.BASE_URL) //Dev mode with 8080 port frontend, change with / for production
  })

router.get('/check',(req,res)=>{
  if(req.isAuthenticated()) {
    res.send(req.user)
  }else{
    res.send(null)
  }
})

router.get('/logout',(req,res)=>{
  req.logout()
  res.status(200).send('Bye bye!')
})

module.exports = router