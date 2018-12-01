import mongoose from 'mongoose';
//const mongoose = require('mongoose');


const { Schema } = mongoose;

// is id out added?
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User must have Name'],
  },
  password: {
    type: String,
    required: [true, 'User must have Passwort'],
  },
});
export default mongoose.model('User', userSchema);