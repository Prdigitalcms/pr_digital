const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  original_name: { type: String, required: true },
  filename:      { type: String, required: true },
  file_path:     { type: String, required: true },
  file_url:      { type: String, required: true },
  mime_type:     String,
  file_size:     Number,
  uploaded_by:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Upload', uploadSchema);
