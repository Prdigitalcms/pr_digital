const express = require('express');
const { supabase } = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Upload single file
router.post('/single', 
  authenticateToken,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileData = {
        original_name: req.file.originalname,
        filename: req.file.filename,
        file_path: req.file.path,
        file_url: `/uploads/${req.file.filename}`,
        mime_type: req.file.mimetype,
        file_size: req.file.size,
        uploaded_by: req.user.id
      };

      // Save file info to database
      const { data: uploadRecord, error } = await supabase
        .from('uploads')
        .insert([fileData])
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: 'Failed to save upload record' });
      }

      res.json({
        message: 'File uploaded successfully',
        file: uploadRecord
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Upload multiple files
router.post('/multiple',
  authenticateToken,
  upload.array('files', 5), // Max 5 files
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const uploadPromises = req.files.map(file => {
        const fileData = {
          original_name: file.originalname,
          filename: file.filename,
          file_path: file.path,
          file_url: `/uploads/${file.filename}`,
          mime_type: file.mimetype,
          file_size: file.size,
          uploaded_by: req.user.id
        };

        return supabase
          .from('uploads')
          .insert([fileData])
          .select()
          .single();
      });

      const results = await Promise.all(uploadPromises);
      const uploadedFiles = results.map(result => result.data);

      res.json({
        message: 'Files uploaded successfully',
        files: uploadedFiles
      });
    } catch (error) {
      console.error('Multiple upload error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Get user's uploads
router.get('/my-uploads', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { data: uploads, error, count } = await supabase
      .from('uploads')
      .select('*', { count: 'exact' })
      .eq('uploaded_by', req.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(400).json({ error: 'Failed to fetch uploads' });
    }

    res.json({
      uploads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete upload
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user owns the upload or is admin
    const { data: upload, error: fetchError } = await supabase
      .from('uploads')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !upload) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    if (upload.uploaded_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Delete from database
    const { error } = await supabase
      .from('uploads')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: 'Failed to delete upload' });
    }

    // TODO: Delete physical file from storage
    // This would depend on your storage solution (local, S3, etc.)

    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;