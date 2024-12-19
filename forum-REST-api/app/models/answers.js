import mongoose, { Types } from 'mongoose';

const anwersSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String
  },
  owner_id: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  question_id: {
    type: Types.ObjectId,
    required: true,
    ref: 'Question'
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model('Answer', anwersSchema);

export default Answer;
