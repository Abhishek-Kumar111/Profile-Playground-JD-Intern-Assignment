const express = require('express');
const router = express.Router();
const SkillController = require('../Controllers/skill');
const Authentication = require('../Authentication/auth');

router.post('/skills', Authentication.studentAuth, SkillController.createSkill);
router.get('/skills', SkillController.listSkills);
router.delete('/skills/:id', Authentication.studentAuth, SkillController.deleteSkill);

// Query API: GET /skills/top
router.get('/skills/top', SkillController.topSkills);

module.exports = router;

