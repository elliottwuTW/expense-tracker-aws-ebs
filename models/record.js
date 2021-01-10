/**
 * Create a record model
 */
const mongoose = require('mongoose')

// schema
const Schema = mongoose.Schema
const recordSchema = new Schema({
  // define data
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  isIncome: {
    type: Boolean,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// model
module.exports = mongoose.model('Record', recordSchema)
