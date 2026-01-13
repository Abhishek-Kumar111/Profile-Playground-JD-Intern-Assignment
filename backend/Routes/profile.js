const express = require('express');
const router = express.Router();
const ProfileController = require('../Controllers/profile');

router.post('/profile', ProfileController.createProfile);
router.get('/profile', ProfileController.getProfile);
router.put('/profile', ProfileController.updateProfile);

module.exports = router;

