const Work = require('../Models/work');

exports.createWork = async (req, res) => {
  try {
    const work = await Work.create(req.body);
    res.status(201).json(work);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create work item', detail: err.message });
  }
};

// GET all work
exports.listWork = async (req, res) => {
  try {
    const items = await Work.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list work items', detail: err.message });
  }
};

exports.updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!work) {
      return res.status(404).json({ error: 'Work item not found' });
    }
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update work item', detail: err.message });
  }
};


exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findByIdAndDelete(id);
    if (!work) {
      return res.status(404).json({ error: 'Work item not found' });
    }
    res.json({ message: 'Work item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete work item', detail: err.message });
  }
};

