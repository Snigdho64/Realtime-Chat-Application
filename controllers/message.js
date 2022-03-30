const { default: mongoose } = require('mongoose')
const Message = require('../models/Message')

exports.sendMessage = async (req, res, next) => {
    const sender = req.user._id
    const { to, message } = req.body
    const receiver = mongoose.Types.ObjectId(to)
    try {
        await Message.create({
            message: { text: message },
            sender,
            users: [sender, receiver],
        })
        return res
            .status(201)
            .json({ success: true, message: 'Message sent successfully' })
    } catch (error) {
        next(error)
    }
}

exports.getAllMessages = async (req, res, next) => {
    const sender = req.user._id
    const { to } = req.params
    const receiver = mongoose.Types.ObjectId(to)

    try {
        const messages = await Message.find({
            users: {
                $all: [sender, receiver],
            },
        }).sort({ updatedAt: 1 })

        return res.status(200).json({ success: true, messages })
    } catch (error) {
        next(error)
    }
}
