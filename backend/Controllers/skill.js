const Skill = require('../Models/skill');
const Project = require('../Models/project');


exports.createSkill = async (req, res) => {
  try {
    const skills = await Skill.insertMany(req.body);
    res.status(201).json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create skill', detail: err.message });
  }
};

exports.listSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list skills', detail: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill', detail: err.message });
  }
};

// GET /skills/top -> computed top skills based on how many projects use them
exports.topSkills = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;

    const agg = await Project.aggregate([
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { _id: 0, name: '$_id', count: 1 } },
    ]);

    res.json(agg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get top skills', detail: err.message });
  }
};

