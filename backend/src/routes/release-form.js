const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

const Release = require('../model/release.model');
const Artist = require('../model/artist.model');
const User = require('../model/user.model');
const FormSubmission = require('../model/upload.model'); // form submissions

const router = express.Router();

// ---------------------- CREATE NEW RELEASE ----------------------
router.post(
  '/create',
  authenticateToken,
  upload.fields([
    { name: 'trackFile', maxCount: 1 },
    { name: 'coverArt', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        version,
        upcCode,
        primaryArtist,
        featuring,
        lyricist,
        composer,
        arranger,
        producer,
        genre,
        trackLanguage,
        pLine,
        cLine,
        releaseLanguage,
        productionYear,
        releaseDate,
        instrumental,
        remixOf,
        explicitContent,
        otherLsp,
        mood,
        tags,
      } = req.body;

      if (!title || !primaryArtist || !genre) {
        return res.status(400).json({
          error: 'Title, Primary Artist, and Genre are required',
        });
      }

      // File paths
      let trackFileUrl = null;
      let coverArtUrl = null;
      if (req.files?.trackFile?.[0]) {
        trackFileUrl = `/uploads/audio/${req.files.trackFile[0].filename}`;
      }
      if (req.files?.coverArt?.[0]) {
        coverArtUrl = `/uploads/covers/${req.files.coverArt[0].filename}`;
      }

      // Check/create Artist
      let artist = await Artist.findOne({ name: primaryArtist });
      if (!artist) {
        artist = new Artist({
          name: primaryArtist,
          created_by: req.user.id,
        });
        await artist.save();
      }

      // Create Release
      const release = new Release({
        title,
        version,
        artist_id: artist._id,
        upc: upcCode,
        genre,
        release_date: releaseDate,
        cover_art_url: coverArtUrl,
        audio_file_url: trackFileUrl,
        status: 'pending',
        created_by: req.user.id,
        metadata: {
          featuring,
          lyricist,
          composer,
          arranger,
          producer,
          trackLanguage,
          pLine,
          cLine,
          releaseLanguage,
          productionYear,
          instrumental: instrumental === 'true',
          remixOf,
          explicitContent: explicitContent === 'true',
          otherLsp: otherLsp === 'true',
          mood,
          tags: tags ? tags.split(',').map((t) => t.trim()) : [],
        },
      });
      await release.save();

      // Log form submission
      const submission = new FormSubmission({
        uploaded_by: req.user.id,
        release_id: release._id,
        form_type: 'release_creation',
        form_data: req.body,
        createdAt: new Date(),
      });
      await submission.save();

      res.status(201).json({
        message: 'Release created successfully',
        release,
        submissionId: submission._id,
      });
    } catch (error) {
      console.error('Create release form error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ---------------------- GET SINGLE SUBMISSION ----------------------
router.get('/submission/:id', authenticateToken, async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id)
      .populate({
        path: 'release_id',
        populate: { path: 'artist_id', select: 'name' },
      })
      .exec();

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (
      submission.uploaded_by.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------- USER'S SUBMISSIONS ----------------------
router.get('/my-submissions', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { uploaded_by: req.user.id };
    if (status) query['release_id.status'] = status;

    const submissions = await FormSubmission.find(query)
      .populate('release_id', 'title status createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FormSubmission.countDocuments(query);

    res.json({
      submissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------- ALL SUBMISSIONS (ADMIN) ----------------------
router.get(
  '/all-submissions',
  authenticateToken,
  requireRole(['admin', 'manager']),
  async (req, res) => {
    try {
      const { page = 1, limit = 10, status, user_id } = req.query;
      const skip = (page - 1) * limit;

      let query = {};
      if (user_id) query.uploaded_by = user_id;

      const submissions = await FormSubmission.find(query)
        .populate('release_id', 'title status createdAt')
        .populate('uploaded_by', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await FormSubmission.countDocuments(query);

      res.json({
        submissions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get all submissions error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ---------------------- UPDATE STATUS (ADMIN) ----------------------
router.patch(
  '/submission/:id/status',
  authenticateToken,
  requireRole(['admin', 'manager']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const validStatuses = [
        'pending',
        'approved',
        'rejected',
        'delivered',
        'takedown',
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error:
            'Invalid status. Must be one of: ' + validStatuses.join(', '),
        });
      }

      const release = await Release.findByIdAndUpdate(
        id,
        {
          status,
          updatedAt: new Date(),
          ...(status === 'approved' && {
            approved_at: new Date(),
            approved_by: req.user.id,
          }),
        },
        { new: true }
      );

      if (!release) {
        return res.status(404).json({ error: 'Release not found' });
      }

      await FormSubmission.updateMany(
        { release_id: id },
        {
          admin_notes: notes,
          reviewed_by: req.user.id,
          reviewed_at: new Date(),
        }
      );

      res.json({
        message: 'Submission status updated successfully',
        release,
      });
    } catch (error) {
      console.error('Update submission status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ---------------------- STATISTICS (ADMIN) ----------------------
router.get(
  '/statistics',
  authenticateToken,
  requireRole(['admin', 'manager']),
  async (req, res) => {
    try {
      const releases = await Release.find({}, 'status');
      const statusCounts = releases.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      }, {});

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentSubmissions = await FormSubmission.countDocuments({
        createdAt: { $gte: thirtyDaysAgo },
      });

      const totalUsers = await User.countDocuments();
      const totalArtists = await Artist.countDocuments();

      res.json({
        statusCounts,
        recentSubmissions,
        totalUsers,
        totalArtists,
      });
    } catch (error) {
      console.error('Get statistics error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
