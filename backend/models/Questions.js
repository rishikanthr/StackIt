import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true, // stored as HTML (from rich text editor)
    },
    tags: {
      type: [String],
      validate: (tags) => tags.length > 0 && tags.length <= 5,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answersCount: {
      type: Number,
      default: 0,
    },
    upvoters: [{ type: Types.ObjectId, ref: 'User' }],
    downvoters: [{ type: Types.ObjectId, ref: 'User' }],
    acceptedAnswer: {
      type: Types.ObjectId,
      ref: 'Answer',
    },
  },
  { timestamps: true }
);

// Add a full-text search index
QuestionSchema.index({ title: 'text', description: 'text' });

export default model('Questions', QuestionSchema);
