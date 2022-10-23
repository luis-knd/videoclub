const jwt = require('jsonwebtoken')
require('dotenv')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader
    if (token === null) {
        return res.status(401).json({message: 'Authorization token not found.'})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({message: 'Authorization token is invalid.'})
        }
        req.email = decoded.email
        next()
    })
}

module.exports = {verifyToken}
