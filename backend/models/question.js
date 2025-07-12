import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true }, // rich text (HTML)
  tags:        [String],
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vote: { type: Number, enum: [1, -1] } // upvote = 1, downvote = -1
  }],
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
