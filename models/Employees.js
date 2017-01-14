/**
 * Created by nik on 12.01.17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  position: {
    type: String,
    required: true
  },
  process: {
    type: String
  },
  function: {
    type: String
  },
  subFunction: {
    type: String
  },
  operation: {
    type: String
  }
});

const model = mongoose.model('Employee', userSchema);

export default model;