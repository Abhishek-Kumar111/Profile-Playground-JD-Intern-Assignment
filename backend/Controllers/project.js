const Project = require('../Models/project');

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
   res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project', detail: err.message });
  }
};

exports.listProjects = async (req, res) => {
  try {
    const { skill } = req.query;
    const filter = skill ? { skills: skill } : {};
    const projects = await Project.find(filter);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list projects', detail: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project', detail: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', detail: err.message });
  }
};

