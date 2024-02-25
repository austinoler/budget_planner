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

});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
