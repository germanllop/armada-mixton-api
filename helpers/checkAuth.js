const checkAuth = function(req, res, next) {
    if (req.isAuthenticated()) { 
        return next() 
    }
    res.status(403).send('No way Jose!')
}

module.exports = checkAuth