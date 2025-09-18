const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/requireRole');
const router = express.Router();

// GET /users - Get all users (Admin only)
router.get('/', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const query = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [users, count] = await Promise.all([
      User.find(query)
        .select('id username email role is_active createdAt last_login')
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:id - Get single user by ID
router.get('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('id username email role is_active createdAt last_login');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /users/:id - Update user info
router.put('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['username', 'email', 'role', 'is_active'];

    allowedFields.forEach(field => {
      if (field in req.body) updates[field] = req.body[field];
    });

    updates.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      select: 'id username email role is_active createdAt last_login'
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /users/:id/password - Change user password
router.patch('/:id/password', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword, updatedAt: new Date() },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /users/:id/deactivate - Deactivate user
router.patch('/:id/deactivate', requireRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { is_active: false, updatedAt: new Date() },
      { new: true, select: 'id username email role is_active' }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deactivated successfully', user });
  } catch (err) {
    console.error('Deactivate user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /users/:id - Delete user
router.delete('/:id', requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
