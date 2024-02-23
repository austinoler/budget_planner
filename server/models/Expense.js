const mongoose = require('mongoose');

const { Schema } = mongoose;


const expenseSchema = new Schema({
  date: {
    type: Date,
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
  }

});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
