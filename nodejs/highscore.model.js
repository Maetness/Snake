import mongoose from 'mongoose';
//const mongoose = require('mongoose');


const { Schema } = mongoose;

// is id out added?
const highscoreSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User must have Name'],
  },
  highscore1: {
    type: String,
  },
  highscore2: {
    type: String,
  },
  highscore3: {
    type: String,
  },
  highscore4: {
    type: String,
  },
  highscore5: {
    type: String,
  },
});
export default mongoose.model('User', userSchema);