import Answer from '../models/answer.js';
import Question from '../models/question.js';
import Notification from '../models/notification.js';

export const postAnswer = async (req, res) => {
  const { qid } = req.params;
  const { content } = req.body;

  const answer = await Answer.create({
    content,
    author: req.user._id,
    question: qid
  });

  await Question.findByIdAndUpdate(qid, { $push: { answers: answer._id } });

  // Notify question author
  const question = await Question.findById(qid).populate('author');
  if (!question.author._id.equals(req.user._id)) {
    await Notification.create({
      recipient: question.author._id,
      message: `${req.user.username} answered your question`,
      url: `/questions/${qid}`
    });
  }

  res.status(201).json(answer);
};

export const voteAnswer = async (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;

  const answer = await Answer.findById(id);
  const existingVote = answer.votes.find(v => v.user.toString() === req.user._id.toString());

  if (existingVote) existingVote.vote = vote;
  else answer.votes.push({ user: req.user._id, vote });

  await answer.save();
  res.json({ votes: answer.votes });
};
