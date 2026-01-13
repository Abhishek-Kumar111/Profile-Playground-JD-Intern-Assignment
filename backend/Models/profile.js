const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String },
    college: { type: String },
    year: { type: String },
    grade: { type: String },
  },
  { _id: false }
);

const linksSchema = new mongoose.Schema(
  {
    github: { type: String },
    linkedin: { type: String },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    bio: { type: String },
    education: [educationSchema],
    location: { type: String },
    links: linksSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);

