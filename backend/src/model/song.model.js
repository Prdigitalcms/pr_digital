const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  trackDetails: {
    title: { type: String, required: true },
    label: { type: String, required: true },
    upc_ean: { type: String } // optional
  },
  artistsCredits: {
    primaryArtist: { type: String, required: true },
    featuring: [{ type: String }], // array of featured artists
    lyricist: { type: String, required: true },
    composer: { type: String, required: true },
    arranger: { type: String },   // optional
    producer: { type: String }    // optional
  },
  trackInformation: {
    genre: { type: String, required: true },
    lyricsLanguage: { type: String, default: 'English' },
    phonogramLine: { type: String, required: true }, // ℗ line
    copyrightLine: { type: String, required: true }, // © line
    titleLanguage: { type: String, default: 'English' },
    productionYear: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    instrumental: { type: Boolean, default: false },
    parentalAdvisory: {
      type: String,
      enum: ['None', 'Explicit', 'Clean'],
      default: 'None'
    }
  },
  files: {
    audioFile: { type: String, required: true }, // file path or URI
    coverArt: { type: String, required: true }   // file path or URI
  },
  additionalOptions: {
    isrc: { type: String },   // auto-gen or provided
    crbtCut: { type: Boolean, default: false }
  }
}, { timestamps: true });

const songModel = mongoose.model('Track', TrackSchema);
module.exports = songModel;