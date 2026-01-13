const express = require('express');
const router = express.Router();
const ProfileController = require('../Controllers/profile');
const Authentication = require('../Authentication/auth');

router.post('/profile', Authentication.studentAuth, ProfileController.createProfile);
router.get('/profile', ProfileController.getProfile);
router.put('/profile', Authentication.studentAuth, ProfileController.updateProfile);

module.exports = router;

