const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { default: validator } = require('validator')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body

        if (!validator.isStrongPassword(password)) {
            return next(new Error('Password is not strong'))
        }

        if (password !== confirmPassword) {
            return next(new Error('Passwords do not match'))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ username, email, password: hashedPassword })

        await user.save()
        const token = user.generateAuthToken()
        return res
            .cookie('token', token, {
                expire: 3600 * 1000 + Date.now(),
                httpOnly: true,
            })
            .status(201)
            .json({ success: true, message: 'User created successfully', user })
    } catch (e) {
        // console.log({ e: e.errors })
        next(e)
    }
}

exports.loginUser = async (req, res, next) => {
    const { usernameOrEmail, password } = req.body
    let user
    if (validator.isAlphanumeric(usernameOrEmail, 'en-US', { ignore: '_.' })) {
        user = await User.findOne({ username: usernameOrEmail }).select(
            '+password'
        )
    } else {
        user = await User.findOne({ email: usernameOrEmail }).select(
            '+password'
        )
    }
    if (!user) return next(new Error('User not found'))

    const passwordMatched = await user.comparePassword(password)

    if (!passwordMatched) return next(new Error('Invalid Credentials'))

    const token = user.generateAuthToken()

    res.cookie('token', token, {
        expire: 3600 * 1000 + Date.now(),
        httpOnly: true,
    })
        .status(200)
        .json({ success: true, message: 'User logged in successfully', user })
}

exports.authenticateUser = async (req, res, next) => {
    // Read the token from the cookie
    const token = req.cookies.token

    if (!token)
        return res.status(401).send('Access denied...No token provided...')
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(_id)
        if (!user) return next(new Error('User not found'))
        req.user = user
        next()
    } catch (er) {
        // console.log("err", er);
        // Incase of expired jwt or invalid token kill the token and clear the cookie
        res.clearCookie('token')
        return res.status(400).send(er.message)
    }
}

exports.loadUser = async (req, res, next) => {
    const { user } = req
    if (!user || Object.keys(user).length === 0)
        return next(new Error('User not found'))
    return res
        .status(200)
        .send({ success: true, message: 'Loaded user successfully', user })
}

exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).send({
        success: true,
        message: 'User logged out succesfully',
    })
}

exports.setAvatar = async (req, res, next) => {
    const { avatar } = req.body
    if (!validator.isBase64(avatar)) {
        next(new Error('Invalid avatar'))
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true }
        )
        if (!user) return next(new Error('User not found'))
        return res.status(201).json({ success: true, user })
    } catch (e) {
        next(e)
    }
}

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find()
    return res.status(200).json({
        success: true,
        users: users.filter(
            (user) => user._id.toString() !== req.user._id.toString()
        ),
    })
}
