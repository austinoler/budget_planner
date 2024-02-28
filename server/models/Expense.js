const mongoose = require('mongoose');

const { Schema } = mongoose;


const expenseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: Number,
    required: true,
    trim: true
  },
  month: {
    type: Number,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  recurring: {
    type: Boolean,
    required: false,
    default: false
  }

});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
