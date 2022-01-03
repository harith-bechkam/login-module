const jwt = require('jsonwebtoken');
require('dotenv').config();



//we can also name this function as Authenticate - middleware 
//now it's anonymous function
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: "Access Denied!" })

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid Token!' })
    }
}