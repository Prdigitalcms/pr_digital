const express = require('express');
const router = express.Router();
const Artist = require('../model/artist.model');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/requireRole');


// Get all artists with pagination & search
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const artists = await Artist.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Artist.countDocuments(query);

    res.json({
      artists,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Get artists error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single artist by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json({ artist });
  } catch (err) {
    console.error('Get artist error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new artist
router.post('/', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { name, bio, email, phone, social_links } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Artist name is required' });
    }

    // Check for duplicates
    const existing = await Artist.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Artist with this name already exists' });
    }

    const artist = await Artist.create({
      name,
      bio,
      email,
      phone,
      social_links,
      created_by: req.user.id
    });

    res.status(201).json({ message: 'Artist created successfully', artist });
  } catch (err) {
    console.error('Create artist error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update artist
router.put('/:id', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { name, bio, email, phone, social_links } = req.body;

    const updateData = {
      updatedAt: new Date(),
    };

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (social_links) updateData.social_links = social_links;

    const artist = await Artist.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json({ message: 'Artist updated successfully', artist });
  } catch (err) {
    console.error('Update artist error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete artist
router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    // Optional: check if artist has related releases before deleting
    // If you have a Release model:
    // const hasReleases = await Release.exists({ artist_id: req.params.id });
    // if (hasReleases) return res.status(400).json({ error: 'Cannot delete artist with existing releases' });

    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json({ message: 'Artist deleted successfully' });
  } catch (err) {
    console.error('Delete artist error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
