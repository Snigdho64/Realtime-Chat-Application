const { getAllMessages, sendMessage } = require('../controllers/message')
const { authenticateUser } = require('../controllers/user')

const router = require('express').Router()

router.get('/allMessages/:to', authenticateUser, getAllMessages)

router.post('/sendMessage', authenticateUser, sendMessage)

module.exports = router
