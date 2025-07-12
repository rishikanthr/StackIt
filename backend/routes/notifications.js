import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.put('/read', authenticate, markAsRead);

export default router;
