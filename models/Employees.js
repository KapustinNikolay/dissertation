/**
 * Created by nik on 12.01.17.
 */
import mongoose from 'mongoose';

const subOperation = new mongoose.Schema({
    rate: Number,
    name: {
        type: String,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            v: {
                type: Number,
                required: true,
                default: 1
            },
            t: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
});

const operationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number,
        required: true,
        default: 1
    },
    t: {
        type: Number,
        required: true,
        default: 1
    },
    subOperations: [
        subOperation
    ]
});

const actionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number,
        required: true,
        default: 1
    },
    t: {
        type: Number,
        required: true,
        default: 1
    },
    type: {
        type: String,
        enum: ['operation', 'subFunction'],
        required: true
    },
    operations: [
        operationSchema
    ],
    subOperations: [
        subOperation
    ]
});

const functionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    v: {
        type: Number,
        required: true,
        default: 1
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
        type: Number,
        required: true,
        default: 1
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