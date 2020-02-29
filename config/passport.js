const passport = require('passport')
const SteamStrategy = require('passport-steam')
const Player = require('../models/player')

passport.serializeUser(function(player, done) {
    done(null, player.id)
})
  
passport.deserializeUser(function(id, done) {
    Player.findById(id, (err, player)=>{
        done(null, player)
    })    
})

passport.use(new SteamStrategy({
        returnURL: process.env.BASE_URL + ':' + process.env.PORT + '/auth/steam/return',
        realm: process.env.BASE_URL + ':'+process.env.PORT,
        apiKey: process.env.STEAM_API_KEY
    },
    function(identifier, profile, done) {
        Player.findOne().bySteamId(profile.id).exec((err, player)=>{
            if(player){
                console.log('Player found')
                done(null, player)
            }else{
                new Player({
                    name: profile.displayName,
                    steamId: profile.id,
                    steamInfo: profile._json,
                    openidIdentifier:identifier
                }).save((err,player)=>{
                    console.log('Player created')
                    done(null, player)        
                })
            }
        })
    }
))

module.exports = passport