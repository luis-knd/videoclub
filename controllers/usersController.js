const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

/**
 * List all users in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const index = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        })
        res.json(users)
    } catch (error) {
        console.error('has error occurred to obtain the users.')
        console.error(error)
    }
}

/**
 * Create a new user account
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const register = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    const user = await Users.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        return res.status(200).json({message: 'User already registered'})
    }
    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Password and Confirm Password are different.'})
    }
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({message: 'Registration successful.'})
    } catch (error) {
        console.error('has error occurred to register the user.')
        console.error(error)
    }
}

/**
 * Login a user in the application
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(400).json({message: 'Email or password invalid.'})
        }
        const userId = user.id
        const name = user.name
        const email = user.email
        const accessToken = jwt.sign(
            {userId, name, email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_SECRET_DURATION_TIME}
        )
        const refreshToken = jwt.sign(
            {userId, name, email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        await Users.update(
            {refresh_token: refreshToken},
            {where: {id: userId}}
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({accessToken})
    } catch (error) {
        console.error('has error occurred to login the user.')
        console.error(error)
    }
}

/**
 * Log out the user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.sendStatus(204)
    }
    const user = await Users.findOne({
        where: {refresh_token: refreshToken}
    })
    if (!user) {
        return res.sendStatus(204)
    }
    const userId = user.id
    await Users.update({refresh_token: null},
        {where: {id: userId}}
    )
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

module.exports = {index, login, register, logout}
