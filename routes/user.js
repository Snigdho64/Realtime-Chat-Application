const {
    registerUser,
    loginUser,
    loadUser,
    authenticateUser,
    logoutUser,
    setAvatar,
    getAllUsers,
} = require('../controllers/user')

const router = require('express').Router()

router.post('/register', registerUser)

router.route('/login').post(loginUser).get(authenticateUser, loadUser)

router.post('/setAvatar', authenticateUser, setAvatar)

router.get('/allUsers', authenticateUser, getAllUsers)

router.get('/logout', logoutUser)

module.exports = router
