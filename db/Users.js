const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const dynamodb = require('./dynamodb')

// Get user by id
exports.getUserById = (id) => {
  const params = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { id }
  }
  return dynamodb.get(params).promise()
}

// Get user by email
exports.getUserByEmail = (email) => {
  const params = {
    TableName: process.env.USER_TABLE_NAME,
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: { ':email': email },
    Limit: 1
  }
  return dynamodb.scan(params).promise()
}

// Create a new user
exports.createUser = (userInfo) => {
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
