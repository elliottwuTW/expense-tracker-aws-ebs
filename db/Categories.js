const dynamodb = require('./dynamodb')

exports.getCategoryByValue = (categoryValue) => {
  const params = {
    TableName: process.env.CATEGORY_TABLE_NAME,
    FilterExpression: '#value = :value',
    ExpressionAttributeNames: { '#value': 'value' },
    ExpressionAttributeValues: { ':value': categoryValue }
  }
  return dynamodb.scan(params).promise()
}

exports.getCategoriesExclusiveType = (exclusiveType) => {
  const params = {
    TableName: process.env.CATEGORY_TABLE_NAME,
    FilterExpression: 'type <> :type',
    ExpressionAttributeValues: { ':type': exclusiveType }
  }
  return dynamodb.scan(params).promise()
}
