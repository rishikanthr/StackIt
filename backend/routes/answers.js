import express from 'express';
import { postAnswer, voteAnswer } from '../controllers/answerController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:qid', authenticate, postAnswer);
router.put('/:id/vote', authenticate, voteAnswer);

export default router;
