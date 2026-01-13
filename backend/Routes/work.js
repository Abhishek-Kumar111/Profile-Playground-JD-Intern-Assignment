const express = require('express');
const router = express.Router();
const WorkController = require('../Controllers/work');

router.post('/work', WorkController.createWork);
router.get('/work', WorkController.listWork);
router.put('/work/:id', WorkController.updateWork);
router.delete('/work/:id', WorkController.deleteWork);

module.exports = router;

