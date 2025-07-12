import express from 'express';
import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import Notification from '../models/notification.js';
const router = express.Router();

router.post('/:qid', async (req, res) => {
  const { content } = req.body;
  const author = req.user.uid;
  const question = await Question.findById(req.params.qid);

  const answer = await Answer.create({ question: question._id, author, content });

  if (question.author.toString() !== author) {
    await Notification.create({
      user: question.author,
      message: 'Your question got a new answer',
      link: `/question/${question._id}`,
    });
  }

  res.json(answer);
});

router.put('/:id/upvote', async (req, res) => {
  const uid = req.user.uid;
  const answer = await Answer.findById(req.params.id);
  if (!answer.upvoters.includes(uid)) {
    answer.upvoters.push(uid);
    answer.downvoters = answer.downvoters.filter((id) => id.toString() !== uid);
  }
  await answer.save();
  res.json(answer);
});

router.put('/:id/accept', async (req, res) => {
  const answer = await Answer.findById(req.params.id).populate('question');
  if (answer.question.author.toString() !== req.user.uid) return res.status(403).send('Not allowed');

  answer.isAccepted = true;
  answer.question.acceptedAnswer = answer._id;
  await answer.save();
  await answer.question.save();
  res.json({ message: 'Answer accepted' });
});

export default router;