import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const NotificationSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  message: String,
  link: String,
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default model('Notification', NotificationSchema);