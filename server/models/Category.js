const mongoose = require('mongoose');

const { Schema } = mongoose;
const Expense = require('./Expense')

const categorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
  },
  expenses : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
