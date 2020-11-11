/**
 * Create a user model
 */
const mongoose = require('mongoose')

// schema
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// model
module.exports = mongoose.model('User', userSchema)
