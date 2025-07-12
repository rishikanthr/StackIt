import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const AnswerSchema = new Schema(
  {
    question: {
      type: Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true, // stored as HTML
    },
    upvoters: [{ type: Types.ObjectId, ref: 'User' }],
    downvoters: [{ type: Types.ObjectId, ref: 'User' }],
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-increment answer count on Question
AnswerSchema.post('save', async function () {
  await model('Question').findByIdAndUpdate(
    this.question,
    { $inc: { answersCount: 1 } },
    { new: true }
  );
});

export default model('Answers', AnswerSchema);
