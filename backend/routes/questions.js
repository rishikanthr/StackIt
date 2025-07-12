import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  voteQuestion,
  acceptAnswer,
} from '../controllers/questionController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', authenticate, createQuestion);
router.put('/:id/vote', authenticate, voteQuestion);
router.put('/:qid/accept/:aid', authenticate, acceptAnswer);

export default router;
