// routes/protected.js
import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.sub;
    const user = await User.findById(userId).select('email phone address role created_at');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/orders', authenticate, async (req, res) => {
  try {
    // replace with real order lookup
    return res.json({ orders: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/admin/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('email role is_active created_at');
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
