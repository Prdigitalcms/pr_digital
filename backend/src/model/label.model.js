const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Label name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  contact_email: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

module.exports = mongoose.model('Label', labelSchema);
