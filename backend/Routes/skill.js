const express = require('express');
const router = express.Router();
const SkillController = require('../Controllers/skill');

router.post('/skills', SkillController.createSkill);
router.get('/skills', SkillController.listSkills);
router.delete('/skills/:id', SkillController.deleteSkill);

// Query API: GET /skills/top
router.get('/skills/top', SkillController.topSkills);

module.exports = router;

