const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController.js')

router.post('/register',AuthController.index)
router.post('/login',AuthController.login)
module.exports = router