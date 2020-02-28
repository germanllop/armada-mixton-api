const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log('You are not supposed to read this')
    res.redirect('/')
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // Aqui creamos el usuario de steam en nuestra base de datos en caso no existia   
    res.redirect('/')
  });

module.exports = router