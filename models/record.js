/**
 * Create a record model
 */
const mongoose = require('mongoose')

// schema
const Schema = mongoose.Schema
const recordSchema = new Schema({
  // define data
  categoryTitle: {
    type: String,
    required: true
  },
  categoryValue: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  },
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// model
module.exports = mongoose.model('Record', recordSchema)
