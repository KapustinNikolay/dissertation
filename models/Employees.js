/**
 * Created by nik on 12.01.17.
 */
import mongoose from 'mongoose';

const operationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number
    },
    t: {
        type: Number
    }
});

const actionSchema = new mongoose.Schema({
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
        operationSchema
    ]
});

const functionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number
    },
    actions: [
        actionSchema
    ]
});

const processesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number
    },
    functions:[
        functionSchema
    ]
});

const employeeSchema = new mongoose.Schema({
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
      processesSchema
  ]
});

employeeSchema.pre('updateOne', function (next) {
    this.options.runValidators = true;
    next();
});

const model = mongoose.model('Employee', employeeSchema);

export default model;