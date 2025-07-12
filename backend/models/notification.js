import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message:    { type: String, required: true },
  url:        { type: String }, // e.g., /questions/123#answer-456
  read:       { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
