const { v4: uuidv4 } = require('uuid')

const dynamodb = require('./dynamodb')

exports.getRecordsByUserIdDateIndex = (params) => {
  params.TableName = process.env.RECORD_TABLE_NAME
  params.IndexName = 'UserId-date-index'
  // sort by date in the reverse order
  params.ScanIndexForward = false
  return dynamodb.query(params).promise()
}

exports.createRecord = (recordInfo) => {
  return dynamodb.put({
    TableName: process.env.RECORD_TABLE_NAME,
    Item: {
      id: uuidv4(),
      ...recordInfo
    }
  }).promise()
}

exports.getRecordById = (id) => {
  return dynamodb.get({
    TableName: process.env.RECORD_TABLE_NAME,
    Key: { id }
  }).promise()
}

exports.updateRecordById = (id, body, isCategoryChanged, category) => {
  const { name, date, amount, merchant } = body
  const params = {
    TableName: process.env.RECORD_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name, #date = :date, amount = :amount, merchant = :merchant',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#date': 'date'
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':date': (new Date(date)).toISOString(),
      ':amount': Number(amount),
      ':merchant': merchant
    },
    ReturnValues: 'ALL_NEW'
  }
  // update category
  if (isCategoryChanged) {
    params.UpdateExpression += ', CategoryId = :CategoryId, category = :category'
    params.ExpressionAttributeValues[':CategoryId'] = category.id
    params.ExpressionAttributeValues[':category'] = category
  }

  return dynamodb.update(params).promise()
}

exports.deleteRecordById = (id) => {
  return dynamodb.delete({
    TableName: process.env.RECORD_TABLE_NAME,
    Key: { id }
  }).promise()
}
