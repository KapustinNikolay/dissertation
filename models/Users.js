/**
 * Created by nik on 11.01.17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const model = mongoose.model('User', userSchema);

export default model;