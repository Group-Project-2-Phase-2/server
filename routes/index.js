const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController.js')
const RoomController = require('../controllers/roomController.js')
const {authenticate} = require('../middlewares/authMiddleware.js')

router.post('/register',AuthController.index)
router.post('/login',AuthController.login)
router.use(authenticate)
router.post('/matchmake',RoomController.matchmake)
router.delete('/:id',RoomController.destroyRoom)
module.exports = router
