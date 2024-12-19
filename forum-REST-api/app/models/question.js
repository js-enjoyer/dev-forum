// models/Question.js
import mongoose, { Types } from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String
  },
  tags: [
    {
      type: Types.ObjectId,
      ref: 'Tag',
      required: true
    }

  ],
  owner_id: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      type: Types.ObjectId,
      ref: 'Answer',
    }
  ],
  downvotes: {
    type: Number,
    default: 0,
  },
  views: {
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

const Question = mongoose.model('Question', questionSchema);

export default Question;
