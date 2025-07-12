import User from '../models/user.js';

export const banUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.banned = true;
  await user.save();

  res.json({ message: `User ${user.username} banned.` });
};
