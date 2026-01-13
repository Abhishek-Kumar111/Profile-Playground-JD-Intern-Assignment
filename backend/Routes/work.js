const express = require('express');
const router = express.Router();
const WorkController = require('../Controllers/work');
const Authentication = require('../Authentication/auth');

router.post('/work', Authentication.studentAuth, WorkController.createWork);
router.get('/work', WorkController.listWork);
router.put('/work/:id', Authentication.studentAuth, WorkController.updateWork);
router.delete('/work/:id', Authentication.studentAuth, WorkController.deleteWork);

module.exports = router;

