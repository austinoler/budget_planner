const mongoose = require('mongoose');

const { Schema } = mongoose;
const Expense = require('./Expense')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
  },
  expenses : [Expense.schema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
