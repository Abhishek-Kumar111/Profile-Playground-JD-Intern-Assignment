const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Work', workSchema);

