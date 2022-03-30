const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: { type: String, required: [true] },
        },
        image: { url: { type: String } },
        users: Array,
        sender: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
