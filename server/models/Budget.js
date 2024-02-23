const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = require('./Category')

const budgetSchema = new Schema({
  month: {
    type: String,
    required: true,
    trim: true
  },
  total: {
    type: Number,
    required: true,
    trim: true
  },
  category : [Category.schema]

});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
