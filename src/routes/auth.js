const express = require('express')
const router = express.Router();
const authRefreshToken = require('../middeleWare/authMiddleWare')

// const verifyToken = require('../middeleWare/authMiddleWare');
const jwt = require('../jwt/jwtUtills')
const loginController = require('../controller/loginController')

router.post('/register', loginController.register)
router.post('/login', loginController.login)
router.post('/refreshToken', authRefreshToken)
router.get('/', loginController.users)

module.exports = router

