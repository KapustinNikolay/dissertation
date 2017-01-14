/**
 * Created by nik on 12.01.17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const model = mongoose.model('Company', userSchema);

export default model;