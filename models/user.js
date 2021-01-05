/**
 * Create a user model
 */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// hash the password
userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
  next()
})

// model
module.exports = mongoose.model('User', userSchema)
