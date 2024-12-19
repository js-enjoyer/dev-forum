import { model, Schema, Types } from 'mongoose';

import { SALT_ROUNDS } from '../config/constants.js';

import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  saves: {
    type: Types.ObjectId,
    ref: 'Question'
  },
  reputation: {
    type: Number,
    default: 1
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
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

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
})

const User = model('User', userSchema);

export default User;
