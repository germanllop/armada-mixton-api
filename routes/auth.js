const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log('You are not supposed to read this')
    res.redirect('/')
  })

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

router.get('/check',(req,res)=>{
  if(req.user) {
    res.send(req.user)
  }else{
    res.send(false)
  }
})

router.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})

module.exports = router