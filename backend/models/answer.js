import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  content:  { type: String, required: true }, // rich text
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vote: { type: Number, enum: [1, -1] }
  }]
}, { timestamps: true });

export default mongoose.model('Answer', answerSchema);
