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
  processes: [
    {
      name: {
        type: String,
        required: true
      },
      v: {
        type: Number
      },
      functions: [
        {
          name: {
            type: String,
            required: true
          },
          v: {
            type: Number
          },
          actions: [
            {
              name: {
                type: String,
                required: true
              },
              v: {
                type: Number
              },
              t: {
                type: Number
              },
              type: {
                type: String,
                enum: ['operation', 'subFunction'],
                required: true
              },
              operations: [
                {
                  name: {
                    type: String,
                    required: true
                  },
                  t: {
                    type: Number
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

const model = mongoose.model('Employee', userSchema);

export default model;