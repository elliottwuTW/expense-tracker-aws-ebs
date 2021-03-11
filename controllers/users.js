const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const dynamodb = require('../utils/dynamodb')
const isEmpty = require('../utils/isEmpty')

// Login Page
exports.getLoginPage = (req, res) => {
  return res.render('login')
}

// Logout
exports.logout = (req, res) => {
  req.logout()
  req.flash('logout_success', 'Logout successfully')
  return res.redirect('/users/login')
}

// Register Page
exports.getRegisterPage = (req, res) => {
  return res.render('register')
}

// Register
exports.register = (req, res, next) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  // check
  const registerErrors = []
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    registerErrors.push({ msg: 'Email not valid' })
  }
  if (password.length < 8) {
    registerErrors.push({
      msg: 'Password can not be shorter than 8 characters'
    })
  }
  if (password !== confirmPassword) {
    registerErrors.push({ msg: 'Please check the passwords' })
  }

  if (registerErrors.length > 0) {
    return res.render('register', { registerErrors, name, email })
  }

  getUserByEmail(email)
    .then((data) => {
      const users = data.Items
      if (!isEmpty(users)) {
        registerErrors.push({ msg: 'Email is already registered' })
        return res.render('register', { registerErrors, name, email })
      }

      createUser({ name, email, password })
        .then((_) => res.redirect('/users/login'))
        .catch(next)
    })
    .catch(next)
}

exports.getUserById = getUserById
exports.getUserByEmail = getUserByEmail
exports.createUser = createUser
exports.comparePassword = comparePassword

// Get user by id
function getUserById (id) {
  const params = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { id }
  }
  return dynamodb.query(params).promise()
}

// Get user by email
function getUserByEmail (email) {
  const params = {
    TableName: process.env.USER_TABLE_NAME,
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: { ':email': email },
    Limit: 1
  }
  return dynamodb.scan(params).promise()
}

// Create a new user
function createUser (userInfo) {
  const { name, email } = userInfo
  // password
  const password = userInfo.password ? userInfo.password : Math.random().toString(36).slice(-8)

  return dynamodb.put({
    TableName: process.env.USER_TABLE_NAME,
    Item: {
      id: uuidv4(),
      name: name || '',
      email: email || '',
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
  }).promise()
}

// Compare password
function comparePassword (password, hashPassword) {
  return bcrypt.compare(password, hashPassword)
}
