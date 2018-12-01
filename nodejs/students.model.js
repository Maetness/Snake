import mongoose from 'mongoose';
//const mongoose = require('mongoose');


const { Schema } = mongoose;

// is id out added?
const studentSchema = new Schema({
  id: {
    type: String,
    required: [true, 'User must have ID'],
  },
  name: {
    type: String,
    required: [true, 'User must have Name'],
  },
});
export default mongoose.model('Student', studentSchema);