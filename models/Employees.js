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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['department', 'employee'],
    required: true
  },
  actions: [
    {
      type: {
        type: String,
        required: true,
        enum: [
          'process',
          'function',
          'subFunction',
          'operation']
      },
      name: {
        type: String,
        required: true,
      },
      v: {
        type: Number,
        required: true,
      },
      t: {
        type: Number
      }
    }
  ]
});

const model = mongoose.model('Employee', userSchema);

export default model;