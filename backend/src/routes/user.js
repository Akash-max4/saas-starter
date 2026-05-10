const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const supabase = require('../db');

// Get current user (protected)
router.get('/me', protect, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, tenant_id, created_at')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;