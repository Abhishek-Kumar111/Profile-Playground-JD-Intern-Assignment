const express = require('express');
const router = express.Router();
const ProjectController = require('../Controllers/project');
const Authentication = require('../Authentication/auth');

// Core CRUD and query APIs
router.post('/projects', Authentication.studentAuth, ProjectController.createProject);
router.get('/projects', ProjectController.listProjects); // supports ?skill=x
router.put('/projects/:id', Authentication.studentAuth, ProjectController.updateProject);
router.delete('/projects/:id', Authentication.studentAuth, ProjectController.deleteProject);

module.exports = router;

