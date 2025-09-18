const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    artist_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Artist', 
      required: true 
    },

    label_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Label' 
    },

    upc: { type: String, required: true, unique: true },

    genre: String,
    release_date: Date,
    description: String,

    cover_art_url: String,
    audio_file_url: String,

    status: {
      type: String,
      enum: ['pending', 'approved', 'delivered', 'takedown', 'rejected'],
      default: 'pending'
    },

    approved_at: Date,
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    created_by: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },

    metadata: {
      featuring: String,
      lyricist: String,
      composer: String,
      arranger: String,
      producer: String,
      trackLanguage: String,
      pLine: String,
      cLine: String,
      releaseLanguage: String,
      productionYear: Number, // number instead of string
      instrumental: { type: Boolean, default: false },
      remixOf: String,
      explicitContent: { type: Boolean, default: false },
      otherLsp: { type: Boolean, default: false },
      mood: String,
      tags: [String]
    }
  },
  { timestamps: true }
);

// Indexes for better search & filtering
releaseSchema.index({ upc: 1 }, { unique: true });
releaseSchema.index({ title: "text", description: "text", "metadata.tags": 1 });

module.exports = mongoose.model('Release', releaseSchema);
