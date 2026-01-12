const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
