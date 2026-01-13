const express = require('express');
const router = express.Router();
const ProjectController = require('../Controllers/project');

// Core CRUD and query APIs
router.post('/projects', ProjectController.createProject);
router.get('/projects', ProjectController.listProjects); // supports ?skill=x
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);

module.exports = router;

