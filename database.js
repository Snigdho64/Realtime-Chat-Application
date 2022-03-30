const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const Mongoose = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const { host, port, name } = Mongoose.connection
        console.log(`${'*'.repeat(10)} Connected to Database ${'*'.repeat(10)}`)
        // console.log(`Post : ${port}\nHost : ${host}\nName : ${name} `)
        return Promise.resolve(Mongoose)
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = connectDB
