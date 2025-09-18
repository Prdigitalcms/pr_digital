const express = require('express');
const Label = require('../models/labelModel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all labels
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    const [labels, total] = await Promise.all([
      Label.find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Label.countDocuments(query)
    ]);

    res.json({
      labels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get labels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single label by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const label = await Label.findById(req.params.id)
      .populate('created_by', 'name email') // populate user if needed
      .lean();

    if (!label) {
      return res.status(404).json({ error: 'Label not found' });
    }

    res.json({ label });
  } catch (error) {
    console.error('Get label error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new label
router.post('/', 
  authenticateToken, 
  requireRole(['admin', 'manager']), 
  async (req, res) => {
    try {
      const { name, description, contact_email, website } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Label name is required' });
      }

      const existingLabel = await Label.findOne({ name });
      if (existingLabel) {
        return res.status(400).json({ error: 'Label with this name already exists' });
      }

      const label = await Label.create({
        name,
        description,
        contact_email,
        website,
        created_by: req.user.id
      });

      res.status(201).json({
        message: 'Label created successfully',
        label
      });
    } catch (error) {
      console.error('Create label error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update label
router.put('/:id', 
  authenticateToken, 
  requireRole(['admin', 'manager']), 
  async (req, res) => {
    try {
      const { name, description, contact_email, website } = req.body;

      const updateData = {
        updated_at: new Date()
      };

      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (contact_email) updateData.contact_email = contact_email;
      if (website) updateData.website = website;

      const label = await Label.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!label) {
        return res.status(404).json({ error: 'Label not found' });
      }

      res.json({
        message: 'Label updated successfully',
        label
      });
    } catch (error) {
      console.error('Update label error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete label
router.delete('/:id', 
  authenticateToken, 
  requireRole(['admin']), 
  async (req, res) => {
    try {
      // Check if label has releases (assuming a Release model exists)
      const Release = require('../models/releaseModel'); // if you have one
      const hasReleases = await Release.exists({ label_id: req.params.id });

      if (hasReleases) {
        return res.status(400).json({ 
          error: 'Cannot delete label with existing releases' 
        });
      }

      const label = await Label.findByIdAndDelete(req.params.id);

      if (!label) {
        return res.status(404).json({ error: 'Label not found' });
      }

      res.json({ message: 'Label deleted successfully' });
    } catch (error) {
      console.error('Delete label error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
