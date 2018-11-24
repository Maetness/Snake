import mongoose from 'mongoose';
//const mongoose = require('mongoose');


const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User must have Name'],
  },
  password: {
    type: String,
    required: [true, 'User must have Passwort'],
  },
  highscore: {
    type: Number,
    default: 0
  },
});
export default mongoose.model('User', userSchema);