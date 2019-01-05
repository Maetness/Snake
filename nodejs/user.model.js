import mongoose from 'mongoose';
//const mongoose = require('mongoose');


const { Schema } = mongoose;

// is id out added?
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User must have Name'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have Passwort'],
  },
  highscores: [{
    highscore: Number,
  }],
  usersaves: [{
    usersave: String,
  }],
  playedgames: {
    type: Number,
  },
  membersinze: {
    type: String,
  }
});
export default mongoose.model('User', userSchema);