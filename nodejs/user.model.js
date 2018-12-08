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
  /*
  highscores: [{
    highscore: Number,
  }],
  saves: [{
    save: String,
  }],
  */
});
export default mongoose.model('User', userSchema);