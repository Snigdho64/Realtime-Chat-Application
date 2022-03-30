const mongoose = require('mongoose')
const { default: validator } = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
        trim: true,
        required: true,
        unique: true,
        minlength: [3, 'username must be at least 3 charaters'],
        maxlength: [25, , 'username must be atmost 25 charaters'],
        validate: {
            validator: (v) =>
                validator.isAlphanumeric(v, 'en-US', {
                    ignore: '_.',
                }),
            message: 'username is invalid',
        },
    },
    email: {
        type: 'String',
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'email is invalid',
        },
    },
    password: {
        type: 'String',
        required: true,
        select: false,
    },
    avatar: {
        type: 'String',
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
