const express = require('express')


const router = express.Router()

router.get('/',function(req, res){
    res.send('API Route is Working')
})
 
module.exports = router