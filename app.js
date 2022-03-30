const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

const corsConfig = {
    origin: true,
    credentials: true,
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
const { errorHandler } = require('./error/error')
const path = require('path')

app.use('/auth', userRoute)
app.use('/message', messageRoute)

app.use(errorHandler)

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, './client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
    })
}

module.exports = app
