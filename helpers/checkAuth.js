const checkAuth = function(req, res, next) {
    if (req.isAuthenticated()) { 
        return next() 
    }
    res.redirect('/')
}

module.exports = checkAuth