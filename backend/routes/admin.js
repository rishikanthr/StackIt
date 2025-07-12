import express from 'express';
import { banUser } from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.put('/ban/:id', authenticate, isAdmin, banUser);

export default router;
