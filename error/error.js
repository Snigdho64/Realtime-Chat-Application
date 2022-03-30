const e = require('express')

exports.errorHandler = async (err, req, res, next) => {
    // MONGOOSE UNIQUE KEY ERROR
    if (err.code === 11000) {
        key = Object.keys(err.keyValue)[0]
        err.message = `${key} already exist`
    }
    // MONGOOSE VALIDATION ERROR
    if (err.name === 'ValidationError') {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })

        return res.status(400).send({ errors })
    }
    res.status(400).send({ message: err.message })
}
