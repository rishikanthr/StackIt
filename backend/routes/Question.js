import express from 'express';
import Question from '../models/Questions.js';
import Answer from '../models/Answers.js';

const router = express.Router();

// GET all questions with answers
router.get('/all', async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate('author', 'name')
      .populate({
        path: 'acceptedAnswer',
        populate: { path: 'author', select: 'name' },
      })
      .lean();

    for (let q of questions) {
      const answers = await Answer.find({ question: q._id })
        .populate('author', 'name')
        .lean();
      q.answers = answers;
    }

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
