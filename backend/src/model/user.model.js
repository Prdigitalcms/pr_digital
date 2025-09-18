const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'manager', 'artist'], default: 'artist' },
  is_active: { type: Boolean, default: true },
  last_login: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
