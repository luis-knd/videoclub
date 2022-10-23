const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.sendStatus(401)
        }
        const user = await Users.findOne({
            where: {refresh_token: refreshToken}
        })
        if (!user) {
            return res.sendStatus(403)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error) => {
            if (error) {
                return res.sendStatus(403)
            }
            const userId = user.id
            const name = user.name
            const email = user.email
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_SECRET_DURATION_TIME
            })
            res.json({accessToken})
        })
    } catch (error) {
        console.error('has error occurred during refresh token')
        console.error(error)
    }
}

module.exports = {refreshToken}
