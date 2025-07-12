// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import questionRoutes from './routes/Question.js';  // Note the .js extension
import authRoutes from './routes/auth.js';          // Also add this import
import notificationRoutes from './routes/notifications.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/notifications', notificationRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});
