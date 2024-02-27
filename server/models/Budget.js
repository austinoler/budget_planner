const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = require('./Category')

const budgetSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  total: {
    type: Number,
    required: true,
    trim: true
  },
  categories : [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]

});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;