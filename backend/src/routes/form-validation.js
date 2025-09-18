const express = require('express');
const Release = require('../models/releaseModel');
const Artist = require('../models/artistModel');
const Label = require('../models/labelModel');

const router = express.Router();

/**
 * ✅ Validate UPC Code Uniqueness
 */
router.post('/validate-upc', async (req, res) => {
  try {
    const { upc } = req.body;

    if (!upc) {
      return res.status(400).json({ error: 'UPC code is required' });
    }

    const existingRelease = await Release.findOne({ upc }).select('id title');

    if (existingRelease) {
      return res.json({
        valid: false,
        message: `UPC code already exists for release: ${existingRelease.title}`
      });
    }

    res.json({ valid: true, message: 'UPC code is available' });
  } catch (error) {
    console.error('UPC validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * ✅ Get Available Artists (for dropdown)
 */
router.get('/artists', async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const artists = await Artist.find(query)
      .select('id name')
      .sort({ name: 1 })
      .limit(50);

    res.json({ artists });
  } catch (error) {
    console.error('Get artists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * ✅ Get Available Labels (for dropdown)
 */
router.get('/labels', async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const labels = await Label.find(query)
      .select('id name')
      .sort({ name: 1 })
      .limit(50);

    res.json({ labels });
  } catch (error) {
    console.error('Get labels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * ✅ Static Genres List
 */
router.get('/genres', (req, res) => {
  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical',
    'Folk', 'Blues', 'Reggae', 'Punk', 'Metal', 'Alternative', 'Indie', 'Dance',
    'House', 'Techno', 'Trance', 'Dubstep', 'Ambient', 'World', 'Latin', 'Gospel',
    'Soundtrack', 'Comedy', 'Spoken Word', 'Children', 'Holiday', 'Other'
  ];

  res.json({ genres });
});

/**
 * ✅ Static Languages List
 */
router.get('/languages', (req, res) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'other', name: 'Other' }
  ];

  res.json({ languages });
});

module.exports = router;
