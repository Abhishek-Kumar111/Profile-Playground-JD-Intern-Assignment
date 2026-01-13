const Profile = require('../Models/profile');

exports.createProfile = async (req, res) => {
  try {
    const data = req.body;

    // For simplicity, keep only a single profile document; upsert by email if provided 
    // bec i want only one profile per email.
    let profile;
    if (data.email) {
      profile = await Profile.findOneAndUpdate({ email: data.email }, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });
    } else {
      profile = await Profile.create(data);
    }

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create profile', detail: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email } : {};
    const profile = await Profile.findOne(query);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get profile', detail: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const filter = email ? { email } : {};

    let profile = await Profile.findOne(filter);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    Object.assign(profile, req.body);
    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile', detail: err.message });
  }
};

