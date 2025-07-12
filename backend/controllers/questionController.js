import Question from '../models/question.js';
import Answer  from '../models/answer.js';

export const createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = await Question.create({
      title,
      description,
      tags,
      author: req.user._id
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(questions);
};

export const voteQuestion = async (req, res) => {
  const { id } = req.params;
  const { vote } = req.body; // 1 or -1

  const question = await Question.findById(id);
  const existingVote = question.votes.find(v => v.user.toString() === req.user._id.toString());

  if (existingVote) existingVote.vote = vote;
  else question.votes.push({ user: req.user._id, vote });

  await question.save();
  res.json({ votes: question.votes });
};

export const acceptAnswer = async (req, res) => {
  const { qid, aid } = req.params;
  const question = await Question.findById(qid);

  if (!question.author.equals(req.user._id))
    return res.status(403).json({ message: 'Only question author can accept an answer' });

  question.acceptedAnswer = aid;
  await question.save();

  res.json({ message: 'Answer accepted' });
};
