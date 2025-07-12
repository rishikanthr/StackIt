import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register (user/admin)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).send('Invalid role');

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).send('User already exists');

  const user = new User({ name, email, passwordHash: password, role });
  await user.save();
  const token = jwt.sign({ uid: user._id, role }, process.env.JWT_SECRET);
  res.json({ token });
});

// Guest creation
router.post('/guest', async (req, res) => {
  const user = new User({ role: 'guest' });
  await user.save();
  const token = jwt.sign({ uid: user._id, role: 'guest' }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
