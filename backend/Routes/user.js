const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/user')
const Authentication = require('../Authentication/auth')

router.post('/register',UserController.register)
router.post('/login',UserController.login)

router.post('/logout',Authentication.studentAuth,UserController.logout)

module.exports = router;