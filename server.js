const app = require('./app')
const connectDB = require('./database')
const connectSocket = require('./socket.io')
const cloudinary = require('cloudinary')

require('dotenv').config({ path: './config/.env' })

connectDB()
    .then(() => {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })

        const server = app.listen(process.env.PORT, () => {
            console.log(
                `${'-'.repeat(10)} Listening on port : ${
                    process.env.PORT
                } ${'-'.repeat(10)}`
            )
        })

        connectSocket(server)
    })
    .catch((error) => {
        console.error(error.message)
        console.log('Server Disconnected')
        process.exit(1)
    })

process.on('uncaughtException', (err) =>
    console.log('uncaught exception', err.stack)
)
process.on('unhandledRejection', (err) => {
    console.log('unhandled rejection', err.stack)
})
