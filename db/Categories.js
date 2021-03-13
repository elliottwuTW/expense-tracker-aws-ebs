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

exports.getCategoryByTitle = (categoryTitle) => {
  const params = {
    TableName: process.env.CATEGORY_TABLE_NAME,
    FilterExpression: '#title = :title',
    ExpressionAttributeNames: { '#title': 'title' },
    ExpressionAttributeValues: { ':title': categoryTitle }
  }
  return dynamodb.scan(params).promise()
}

exports.getCategoriesExclusiveType = (exclusiveType) => {
  if (exclusiveType) {
    const params = {
      TableName: process.env.CATEGORY_TABLE_NAME,
      FilterExpression: '#type <> :type',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: { ':type': exclusiveType }
    }
    return dynamodb.scan(params).promise()
  } else {
    // get all categories
    const params = {
      TableName: process.env.CATEGORY_TABLE_NAME,
      IndexName: 'label-createdAt-index',
      KeyConditionExpression: '#label = :label',
      ExpressionAttributeNames: { '#label': 'label' },
      ExpressionAttributeValues: { ':label': 'category' }
    }
    return dynamodb.query(params).promise()
  }
}
